import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Inputcustom } from 'src/app/models/Inputcustom';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogUploadComponent } from 'src/app/shared/dialog-upload/dialog-upload.component';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  DataForm: FormGroup = new FormGroup({});
  payLoad: any;
  data!: Inputcustom[];
  data_macdinh!: Inputcustom[];
  data_mota!: Inputcustom[];
  data_khac!: Inputcustom[];
  dynamic_num = 0;
  ten_input = 'txt';
  src_img = '';
  src_daidien = '';
  src_sanpham = '';
  src_logo = '';
  src_chungchi = '';
  src_mavach = '';
  src_video = '';
  open_menu_mota = false;

  constructor(private dialog: MatDialog) {
    this.data = [{
      Title: 'Mã sản phẩm',
      name: 'Ma_sp',
      is_require: true,
      is_visible: true,
      type: 'text',
      nhom: 'macdinh',
      is_delete: false,
      value_ip: ''
    },
    {
      Title: 'Tên sản phẩm',
      name: 'Ten_sp',
      is_require: true,
      is_visible: true,
      type: 'text',
      nhom: 'macdinh',
      is_delete: false,
      value_ip: ''
    },
    {
      Title: 'Danh mục',
      name: 'Danh_muc',
      is_require: true,
      is_visible: true,
      type: 'dropdown',
      nhom: 'macdinh',
      is_delete: false,
      value_ip: '123'
    },
    {
      Title: 'Giá bán',
      name: 'Gia_sp',
      is_require: true,
      is_visible: true,
      type: 'text',
      nhom: 'macdinh',
      is_delete: false,
      value_ip: ''
    },
    {
      Title: 'Slogan sản phẩm',
      name: 'Slogan_sp',
      is_require: true,
      is_visible: true,
      type: 'text',
      nhom: 'macdinh',
      is_delete: false,
      value_ip: ''
    }
    ];
    this.data_macdinh = this.data.filter(t => t.nhom == 'macdinh');
    this.data_mota = this.data.filter(t => t.nhom == 'mota');
    this.data_khac = this.data.filter(t => t.nhom == 'khac');
    this.DataForm = this.generateFormControls();
  }
  status_type = false;
  ngOnInit(): void {

  }
  PreviewData() {
    this.payLoad = JSON.stringify(this.DataForm.getRawValue());
    this.data.forEach(element => {
      element.value_ip = this.DataForm.controls[element.name].value;
    });
    console.log(JSON.stringify(this.data));
  }
  generateFormControls() {
    let tempGroup: FormGroup = new FormGroup({});
    this.data.forEach(element => {
      tempGroup.addControl(element.name, new FormControl(''));
    });
    return tempGroup;
  }
  add_input(tmp: Inputcustom) {
    console.log(tmp);
    this.dynamic_num = this.dynamic_num + 1;
    this.data.push(tmp);
    if (tmp.nhom == 'khac') {
      this.data_khac.push(tmp);
    }
    if (tmp.nhom == 'mota') {
      this.data_mota.push(tmp);
    }
    this.DataForm.addControl(tmp.name, new FormControl(''));
  }
  exit_thempro(gt: boolean) {
    this.status_type = gt;
  }
  delete_input_temp(gt: string) {
    let index = this.data.findIndex(t => t.name == gt);
    this.data.splice(index, 1);
    this.data_mota = this.data.filter(t => t.nhom == 'mota');
    this.data_khac = this.data.filter(t => t.nhom == 'khac');
  }
  get_image_upload(gt: any) {
    this.src_img = gt.value;
  }
  str_st = '';
  showDialog(gt: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "520px";
    // dialogConfig.height = "310px";
    dialogConfig.panelClass = "pd_dialog_none";
    this.dialog.open(DialogUploadComponent, dialogConfig).afterClosed().subscribe(
      res => {
        if (res != null && res != '' && res != undefined) {
          if (gt == 'daidien') {
            this.src_daidien = '';
            this.src_daidien = res;
          }
          if (gt == 'sanpham') {
            this.src_sanpham = '';
            this.src_sanpham = res;
          }
          if (gt == 'logo') {
            this.src_sanpham = '';
            this.src_logo = res;
          }
        }
      }
    );
  }
  select_mota(value_gt: string, mota_gt: string) {
    this.open_menu_mota = false;
    let tmp = {
      Title: mota_gt,
      name: value_gt,
      is_require: true,
      is_visible: true,
      type: 'text',
      nhom: 'mota',
      is_delete: true,
      value_ip: ''
    };
    this.data.push(tmp);
    this.data_mota = this.data.filter(t => t.nhom == 'mota');
    this.DataForm.addControl(tmp.name, new FormControl(''));
  }
}
