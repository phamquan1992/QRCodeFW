import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { branch } from 'src/app/models/branch';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { custormer_detail, mdcustomer } from 'src/app/models/mdcustomer';
import { InputControlService } from 'src/app/services/input-control.service';

@Component({
  selector: 'app-editdata',
  templateUrl: './editdata.component.html',
  styleUrls: ['./editdata.component.css']
})
export class EditdataComponent {
  constructor(public dialogRef: MatDialogRef<EditdataComponent>, @Inject(MAT_DIALOG_DATA) public data: mdcustomer, private controlSrv: InputControlService) {

  }
  arrinput: Inputbase<string>[] = [];
  form!: FormGroup;
  tieu_de = 'Nhập dữ liệu khách hàng';
  arr_detail: custormer_detail[] = [];
  dataSource = new MatTableDataSource<custormer_detail>(this.arr_detail);
  displayedColumns: string[] = ['column1', 'column2', 'column3', 'status', 'action'];
  ngOnInit(): void {
    console.log(JSON.stringify(this.data));
    this.set_data();
    this.form = this.controlSrv.toFormGroup(this.arrinput as Inputbase<string>[]);
    for (let index = 0; index < 5; index++) {
      let it: custormer_detail = {
        detailid: (index + 1),
        customer_id: 1,
        column1: 'Mô tả ' + (index + 1),
        column2: 'Thông tin ' + (index + 1),
        column3: 'Dữ liệu ' + (index + 1),
        status: 'view'
      };
      this.arr_detail.push(it);
    }
    this.dataSource = new MatTableDataSource<custormer_detail>(this.arr_detail);
  }
  arr_status = [{ key: 'all', value: '-- Chọn trạng thái --' }, { key: '1', value: 'Kích hoạt' }, { key: '0', value: 'Huỷ kích hoạt' }];
  arr_level = [{ key: '1', value: 'Tỉnh' }, { key: '2', value: 'Huyện' }, { key: '3', value: 'Xã' }];
  set_data() {
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'objectcode',
        label: 'Mã khách hàng',
        value: this.data.objectcode,
        required: true,
        order: 1
      }),
      new InputText({
        key: 'name',
        label: 'Tên khách hàng',
        value: this.data.objectname,
        required: true,
        order: 2
      }),
      new InputText({
        key: 'taxcode',
        label: 'Mã số thuế',
        value: this.data.taxcode,
        required: false,
        order: 4
      }),
      new InputText({
        key: 'address',
        label: 'Địa chỉ',
        value: this.data.address,
        required: false,
        order: 5
      }),
    ];
    this.arrinput = dataIP;
  }
  onSubmit() {
    let data_edit = JSON.parse(JSON.stringify(this.form.value));
    console.log(data_edit);
  }
  onClose(gt: string) {
    this.dialogRef.close(gt);
  }
}
