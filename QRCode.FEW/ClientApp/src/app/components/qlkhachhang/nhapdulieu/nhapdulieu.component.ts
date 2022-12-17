import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { custormer_input } from 'src/app/models/custormer_input';
import { InputControlService } from 'src/app/services/input-control.service';
import { EditdataComponent } from './editdata/editdata.component';

@Component({
  selector: 'app-nhapdulieu',
  templateUrl: './nhapdulieu.component.html',
  styleUrls: ['./nhapdulieu.component.css']
})
export class NhapdulieuComponent implements OnInit, AfterViewInit {
  arr_mdmajors: custormer_input[] = [];
  dataSource = new MatTableDataSource<custormer_input>(this.arr_mdmajors);
  loading$ = false;
  name_filter = '';
  displayedColumns: string[] = ['select', 'custormercode', 'custormername','phone', 'taxcode', 'address','pldichvu','plkhachhang','salexyly','dtdannguon', 'action'];
  displayedColumns2: string[] = ['cot1', 'custormercode_filter', 'custormername_filter','phone_filter', 'taxcode_filter', 'address_filter','pldichvu_filter','plkhachhang_filter','salexyly_filter','dtdannguon_filter', 'cot6'];
  selection = new SelectionModel<custormer_input>(true, []);
  arr_filter: Inputbase<string>[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  formfilter!: FormGroup;
  filter_object = {
    code: '',
    name: '',
    status: '',
    levelion: 0
  }
  constructor(private dialog: MatDialog, private controlSrv: InputControlService) {

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.set_data();
    this.formfilter = this.controlSrv.toFormGroup(this.arr_filter as Inputbase<string>[]);
    this.get_data();
    this.dataSource.filterPredicate = this.createFilter();
    this.onchange();
  }
  get_data() {
    this.arr_mdmajors = [];
    for (let index = 0; index < 50; index++) {
      let item: custormer_input = {
        id: (index + 1),
        custormercode: 'KH' + (index + 1),
        custormername: 'Khách hàng ' + (index + 1),
        phone: this.addLeadingZeros(index + 1, 9),
        fax: this.addLeadingZeros(index + 1, 9),
        taxcode: this.addLeadingZeros(index + 1, 9),
        email: 'test' + (index + 1) + '@gmail.com',
        vatname: 'VAT' + (index + 1),
        vataddress: 'AD' + (index + 1),
        website: 'web' + (index + 1),
        description: 'Mô tả ' + (index + 1),
        dtdannguon: 'Nguồn dẫn ' + (index + 1),
        plkhachhang: 'Phân loại ' + (index + 1),
        pldichvu: 'Phân loại ' + (index + 1),
        salexyly: 'Sale ' + (index + 1),
        address: 'Địa chỉ ' + (index + 1),
        province: '',
        distinct: '',
        ward: '',
        img_url: ''
      };
      this.arr_mdmajors.push(item);
    }
    this.dataSource = new MatTableDataSource<custormer_input>(this.arr_mdmajors);
  }
  addLeadingZeros(num: number, totalLength: number) {
    return String(num).padStart(totalLength, '0');
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
  showXoaDialog(id: any) {

  }
  sua_item(gt: custormer_input) {
    let data: custormer_input = {
      id: gt.id,
      custormercode: gt.custormercode,
      custormername: gt.custormername,
      phone: gt.phone,
      fax: gt.fax,
      taxcode: gt.taxcode,
      email: gt.email,
      vatname: gt.vatname,
      vataddress: gt.vataddress,
      website: gt.website,
      description: gt.description,
      dtdannguon: gt.dtdannguon,
      plkhachhang: gt.plkhachhang,
      pldichvu: gt.pldichvu,
      salexyly: gt.salexyly,
      address: gt.address,
      province: gt.province,
      distinct: gt.distinct,
      ward: gt.ward,
      img_url: gt.img_url
    };
    this.showEditDialog(data);
  }
  showEditDialog(data: custormer_input) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = "100%";
    dialogConfig.panelClass = ['md:w-3/4', 'md:h-auto', 'w-[95%]', 'h-[95%]', 'magrin_pane'];
    dialogConfig.data = data;
    dialogConfig.disableClose = true;
    this.dialog.open(EditdataComponent, dialogConfig).afterClosed().subscribe(
      res => {
        if (res != null && res != '' && res != undefined) {

        }
      }
    );
  }
  onchange() {
    this.formfilter.valueChanges.subscribe(val => {
      this.dataSource.filter = JSON.stringify(val);
      this.dataSource.paginator = this.paginator;
    });
  }
  reload_grid() {

  }
  them_moi() {

  }
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);

      let isFilterSet = false;
      for (const col in searchTerms) {
        if (col !== 'status' && col !== 'levelion') {
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
            if (col !== 'status' && col !== 'levelion') {
              let filter_str = data[col] || '';
              if (filter_str.toString().toLowerCase().indexOf(searchTerms[col].trim().toLowerCase()) != -1 && isFilterSet) {
                found = true
              } else {
                found = false;
              }
              arr.push(found);
            }
            else {
              let filter2 = data[col].toString() || '';
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
  arr_status = [{ key: '1', value: 'Kích hoạt' }, { key: '0', value: 'Huỷ kích hoạt' }];
  arr_level = [{ key: '1', value: 'Tỉnh' }, { key: '2', value: 'Huyện' }, { key: '3', value: 'Xã' }];
  set_data() {
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'custormercode',
        label: '',
        value: '',
        required: false,
        order: 1
      }),
      new InputText({
        key: 'custormername',
        label: '',
        value: '',
        required: false,
        order: 2
      }),
      new InputText({
        key: 'phone',
        label: '',
        value: '',
        required: false,
        order: 2
      }),
      new InputText({
        key: 'taxcode',
        label: '',
        value: '',
        required: false,
        order: 3
      }),
      new InputText({
        key: 'address',
        label: '',
        value: '',
        required: false,
        order: 4
      }),
      new InputText({
        key: 'pldichvu',
        label: '',
        value: '',
        required: false,
        order: 4
      }),
      new InputText({
        key: 'plkhachhang',
        label: '',
        value: '',
        required: false,
        order: 4
      }),
      new InputText({
        key: 'salexyly',
        label: '',
        value: '',
        required: false,
        order: 4
      }),
      new InputText({
        key: 'dtdannguon',
        label: '',
        value: '',
        required: false,
        order: 4
      }),
      // new InputDropdown({
      //   key: 'status',
      //   label: '',
      //   options: this.arr_status,
      //   value: '',
      //   order: 3
      // }),
      // new InputDropdown({
      //   key: 'levelion',
      //   label: '',
      //   options: this.arr_level,
      //   value: '',
      //   order: 4
      // }),
    ];
    this.arr_filter = dataIP;
  }
}
