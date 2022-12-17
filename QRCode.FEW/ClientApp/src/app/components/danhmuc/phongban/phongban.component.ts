import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { department, department_edit } from 'src/app/models/department';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { BranchService } from 'src/app/services/branch.service';
import { DepartmentService } from 'src/app/services/department.service';
import { InputControlService } from 'src/app/services/input-control.service';
import { MessageService } from 'src/app/services/message.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { EditdepartComponent } from './editdepart/editdepart.component';
@Component({
  selector: 'app-phongban',
  templateUrl: './phongban.component.html',
  styleUrls: ['./phongban.component.css']
})
export class PhongbanComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {

  }
  constructor(private dialog: MatDialog, private departmentSrv: DepartmentService, private messSrv: MessageService, private controlSrv: InputControlService,
    private branchSrv: BranchService) {

  }
  arr_department: department[] = [];
  arr_filter: Inputbase<string>[] = [];
  dataSource = new MatTableDataSource<department>(this.arr_department);
  loading$ = false;
  name_filter = '';
  displayedColumns: string[] = ['select', 'departmentcode', 'departmentname', 'branchid', 'description', 'isactive', 'action'];
  displayedColumns2: string[] = ['cot1', 'departmentcode_filter', 'departmentname_filter', 'branchid_filter', 'description_filter', 'isactive_filter', 'cotlast'];
  selection = new SelectionModel<department>(true, []);
  arr_temp: { key: string, value: string }[] = [];
  formfilter!: FormGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.get_data();
    this.departmentSrv.f5_service().subscribe(t => {
      this.get_data();
    });
  }
  get_data() {
    this.arr_department = [];
    this.departmentSrv.get_list().subscribe(t => {
      this.arr_department = t;
      this.branchSrv.get_list().subscribe(t1 => {
        this.arr_temp = t1.map(({ id, branchname }) => {
          let tmp: { key: string, value: string } = {
            key: '',
            value: ''
          };
          tmp.key = id.toString();
          tmp.value = branchname;
          return tmp;
        });
        this.set_filter();
        this.dataSource = new MatTableDataSource<department>(this.arr_department);
        this.dataSource.filterPredicate = this.createFilter();
        this.dataSource.paginator = this.paginator;
        this.onchange();
      });
    });
  }
  get_parent(id_parent: number) {
    let gt = '';
    let index = this.arr_temp.findIndex(t => t.key == id_parent.toString());
    if (index !== -1) {
      gt = this.arr_temp[index].value;
    }
    return gt;
  }
  set_filter() {
    this.set_data();
    this.formfilter = this.controlSrv.toFormGroup(this.arr_filter as Inputbase<string>[]);
  }
  onchange() {
    this.formfilter.valueChanges.subscribe(val => {
      this.dataSource.filter = JSON.stringify(val);
      this.dataSource.paginator = this.paginator;
    });
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
  showXoaDialog(id: string) {
    if (id == '') {
      let arr_select = this.selection.selected;
      if (arr_select.length == 0) {
        this.messSrv.error('Bạn chưa chọn bản ghi nào');
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
    this.departmentSrv.delete_obj(id).subscribe(t => {
      console.log(t);
      if (t.result == 'Success') {
        this.messSrv.success('Bạn đã thực hiện thành công!');
        this.selection.clear();
      } else {
        this.messSrv.error('Có lỗi trong quá trình lưu dữ liệu');
      }
    });
  }
  Xoa_arr() {
    let arrID = this.selection.selected.map(t => t.id);
    this.departmentSrv.delete_arr(arrID).subscribe(t => {
      console.log(t);
      if (t.result == 'Success') {
        this.messSrv.success('Bạn đã thực hiện thành công!');
        this.selection.clear();
      } else {
        this.messSrv.error('Có lỗi trong quá trình lưu dữ liệu');
      }
    });
  }
  showhide(gt: boolean) {
    if (this.selection.selected.length == 0) {
      this.messSrv.error('Bạn chưa chọn bản ghi nào');
      return;
    }
    this.selection.selected.forEach(element => {
      element.isactive = gt;
    });
    this.departmentSrv.update_status(this.selection.selected).subscribe(
      t => {
        if (t) {
          this.messSrv.success('Bạn đã thực hiện thành công!');
          this.selection.clear();
        } else {
          this.messSrv.error('Có lỗi trong quá trình lưu dữ liệu');
        }
      }
    );
  }
  sua_item(item: department) {
    let tmp: department = {
      id: item.id,
      branchid: item.branchid,
      departmentcode: item.departmentcode,
      departmentname: item.departmentname,
      description: item.description,
      isactive: item.isactive
    };
    this.showEditDialog(tmp);
  }
  showEditDialog(data: department) {
    let edit_value: department_edit = {
      obj_edit: data,
      list_branch: this.arr_temp
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "520px";
    dialogConfig.panelClass = "pd_dialog_none";
    dialogConfig.data = edit_value;
    dialogConfig.disableClose = true;
    this.dialog.open(EditdepartComponent, dialogConfig).afterClosed().subscribe(
      res => {
        if (res != null && res != '' && res != undefined) {
        }
      }
    );
  }
  applyFilter() {

  }
  reload_grid() {

  }
  them_moi() {
    let tmp: department = {
      id: 0,
      branchid: 0,
      departmentcode: '',
      departmentname: '',
      description: '',
      isactive: false
    };
    this.showEditDialog(tmp);
  }
  set_data() {
    console.log(this.arr_temp);
    let arr_status = [{ key: 'true', value: 'Kích hoạt' }, { key: 'false', value: 'Huỷ kích hoạt' }];
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'departmentcode',
        label: '',
        value: '',
        required: false,
        order: 1
      }),
      new InputText({
        key: 'departmentname',
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
      new InputDropdown({
        key: 'isactive',
        label: '',
        options: arr_status,
        value: '',
        order: 5
      }),
    ];
    this.arr_filter = dataIP;
  }
}
