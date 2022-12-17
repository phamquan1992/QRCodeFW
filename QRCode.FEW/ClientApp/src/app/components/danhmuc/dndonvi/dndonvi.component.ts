import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { branch, branch_edit } from 'src/app/models/branch';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { BranchService } from 'src/app/services/branch.service';
import { DataService } from 'src/app/services/data.service';
import { InputControlService } from 'src/app/services/input-control.service';
import { MessageService } from 'src/app/services/message.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { EditdonviComponent } from './editdonvi/editdonvi.component';

@Component({
  selector: 'app-dndonvi',
  templateUrl: './dndonvi.component.html',
  styleUrls: ['./dndonvi.component.css']
})
export class DndonviComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  arr_branch: branch[] = [];
  dataSource = new MatTableDataSource<branch>(this.arr_branch);
  loading$ = false;
  name_filter = '';
  arr_filter: Inputbase<string>[] = [];
  displayedColumns: string[] = ['select', 'branchcode', 'branchname', 'branchid', 'description', 'address', 'isactive', 'action'];
  displayedColumns2: string[] = ['cot1', 'branchcode_filter', 'branhname_filter', 'branchid_filter', 'description_filter', 'address_filter', 'isactive_filter', 'cot6'];
  selection = new SelectionModel<branch>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  formfilter!: FormGroup;
  arr_temp: { key: string, value: string }[] = [];
  filter_object = {
    branchcode: '',
    branchname: '',
    branchid: '',
    address: '',
    description: ''
  }
  constructor(private dialog: MatDialog, private branchSrv: BranchService, private controlSrv: InputControlService,
    private router: Router, private route: ActivatedRoute, private mesSrc: MessageService, private dataSrv: DataService) {

  }
  ngOnInit(): void {
    this.loading$ = true;
    // this.set_filter();
    this.branchSrv.get_list().subscribe(t => {
      this.arr_branch = t;
      this.arr_temp = t.map(({ id, branchname }) => {
        let tmp: { key: string, value: string } = {
          key: '',
          value: ''
        };
        tmp.key = id.toString();
        tmp.value = branchname;
        return tmp;
      });
      this.set_filter();
      this.get_data();
      this.loading$ = false;
      this.onchange();
    });
  }
  f5_grid() {
    this.branchSrv.get_list().subscribe(t => this.arr_branch = t);
    this.get_data();
  }
  set_filter() {
    this.set_data();
    this.formfilter = this.controlSrv.toFormGroup(this.arr_filter as Inputbase<string>[]);
  }
  get_data() {
    this.dataSource = new MatTableDataSource<branch>(this.arr_branch);
    this.dataSource.filterPredicate = this.createFilter();
    this.dataSource.paginator = this.paginator;
  }
  get_parent(id_parent: number) {
    let gt = '';
    let index = this.arr_branch.findIndex(t => t.id == id_parent);
    if (index !== -1) {
      gt = this.arr_branch[index].branchname;
    }
    return gt;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  showXoaDialog(id: string) {
    if (id == '') {
      let arr_select = this.selection.selected;
      if (arr_select.length == 0) {
        this.mesSrc.error('Bạn chưa chọn bản ghi nào');
        return;
      }
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "390px";
    dialogConfig.panelClass = "pd_dialog_none";
    dialogConfig.data = "Bạn chắc chắn muốn xoá bản ghi này?";
    this.dialog.open(AlertComponent, dialogConfig).afterClosed().subscribe(
      res => {
        if (res) {
          if (id != '') {
            this.xoa_obj(id);
          } else {
            this.Xoa_arr();
          }
        }
      }
    );
  }
  xoa_obj(id: string) {
    this.branchSrv.delete_obj(id).subscribe(t => {
      console.log(t);
      if (t.result == 'Success') {
        this.mesSrc.success('Bạn đã thực hiện thành công!');
        this.selection.clear();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = "reload";
        this.router.navigate(['./'], { relativeTo: this.route });
      } else {
        this.mesSrc.error('Có lỗi trong quá trình lưu dữ liệu');
      }
    });
  }
  Xoa_arr() {
    let arrID = this.selection.selected.map(t => t.id);
    this.branchSrv.delete_arr(arrID).subscribe(t => {
      console.log(t);
      if (t.result == 'Success') {
        this.mesSrc.success('Bạn đã thực hiện thành công!');
        this.selection.clear();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = "reload";
        this.router.navigate(['./'], { relativeTo: this.route });
      } else {
        this.mesSrc.error('Có lỗi trong quá trình lưu dữ liệu');
      }
    });
  }
  sua_item(gt: branch) {
    let data: branch = {
      id: gt.id,
      branchcode: gt.branchcode,
      branchname: gt.branchname,
      description: gt.description,
      address: gt.address,
      order: gt.order,
      branchid: gt.branchid,
      isparentNode: false,
      isactive: false,
      created_by: 0,
      created_date: new Date(),
      last_update_by: 0,
      last_update_date: new Date(),
    };
    this.showEditDialog(data);
  }
  showEditDialog(data: branch) {
    let edit_value: branch_edit = {
      branch_obj: data,
      list_branch: this.arr_temp
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "520px";
    dialogConfig.panelClass = "pd_dialog_none";
    dialogConfig.data = edit_value;
    dialogConfig.disableClose = true;
    this.dialog.open(EditdonviComponent, dialogConfig).afterClosed().subscribe(
      res => {
        if (res != null && res != '' && res != undefined) {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = "reload";
          this.router.navigate(['./'], { relativeTo: this.route });
        }
      }
    );
  }
  applyFilter(name_filter: string, gt: any) {
    let name_tmp = name_filter.split('_')[0];
    if (name_tmp === 'address') {
      this.filter_object.address = gt.value;
    }
    if (name_tmp === 'branchcode') {
      this.filter_object.branchcode = gt.value;
    }
    if (name_tmp === 'branchname') {
      this.filter_object.branchname = gt.value;
    }
    if (name_tmp === 'description') {
      this.filter_object.description = gt.value;
    }
    this.dataSource.filter = JSON.stringify(this.filter_object);
    this.dataSource.paginator = this.paginator;
  }
  reload_grid() {

  }
  them_moi() {
    let data: branch = {
      id: 0,
      branchcode: '',
      branchname: '',
      description: '',
      address: '',
      order: 0,
      branchid: 0,
      isparentNode: false,
      isactive: true
    };
    this.showEditDialog(data);
  }
  onchange() {
    this.formfilter.valueChanges.subscribe(val => {
      this.dataSource.filter = JSON.stringify(val);
      this.dataSource.paginator = this.paginator;
    });
  }
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (col !== 'branchid' && col !== 'isactive') {
          if (searchTerms[col].toString() !== '') {
            isFilterSet = true;
          } else {
            delete searchTerms[col];
          }
        } else {
          if (searchTerms[col]['key'] !== undefined) {
            if (searchTerms[col]['key'].toString() !== '') {
              isFilterSet = true;
            } else {
              delete searchTerms[col];
            }
          } else {
            delete searchTerms[col];
          }
        }
      }

      let nameSearch = () => {
        if (isFilterSet) {
          let arr: boolean[] = [];
          let found = false;
          for (const col in searchTerms) {
            if (col !== 'branchid' && col !== 'isactive') {
              let filter_str = data[col] || '';
              if (filter_str.toString().toLowerCase().indexOf(searchTerms[col].trim().toLowerCase()) != -1 && isFilterSet) {
                found = true
              } else {
                found = false;
              }
              arr.push(found);
            }
            else {
              let filter2 = data[col] == null ? '' : data[col].toString();
              if (searchTerms[col]['key'].toString() !== 'all' && isFilterSet) {
                if (filter2 == searchTerms[col]['key'].toString()) {
                  found = true
                } else {
                  found = false
                }
              }
              else {
                found = true;
              }
              arr.push(found);
            }
          }
          let count_array = arr.findIndex(t => t == false);
          arr = [];
          return count_array == -1 ? true : false;
        } else {
          return true;
        }
      }
      return nameSearch();
    }
    return filterFunction;
  }

  set_data() {
    console.log(this.arr_temp);
    let arr_status = [{ key: 'true', value: 'Kích hoạt' }, { key: 'false', value: 'Huỷ kích hoạt' }];
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'branchcode',
        label: '',
        value: '',
        required: false,
        order: 1
      }),
      new InputText({
        key: 'branchname',
        label: '',
        value: '',
        required: false,
        order: 2
      }),
      new InputDropdown({
        key: 'branchid',
        label: '',
        options: this.arr_temp,
        value: '',
        order: 3
      }),
      new InputText({
        key: 'description',
        label: '',
        value: '',
        required: false,
        order: 4
      }),
      new InputText({
        key: 'address',
        label: '',
        value: '',
        required: false,
        order: 5
      }),
      new InputDropdown({
        key: 'isactive',
        label: '',
        options: arr_status,
        value: '',
        order: 6
      }),
    ];
    this.arr_filter = dataIP;
  }
  showhide(gt: boolean) {
    if (this.selection.selected.length == 0) {
      this.mesSrc.error('Bạn chưa chọn bản ghi nào');
      return;
    }
    this.selection.selected.forEach(element => {
      element.isactive = gt;
    });
    this.branchSrv.update_status(this.selection.selected).subscribe(
      t => {
        if (t) {
          this.mesSrc.success('Bạn đã thực hiện thành công!');
          this.selection.clear();
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = "reload";
          this.router.navigate(['./'], { relativeTo: this.route });
        } else {
          this.mesSrc.error('Có lỗi trong quá trình lưu dữ liệu');
        }
      }
    );
  }

}
