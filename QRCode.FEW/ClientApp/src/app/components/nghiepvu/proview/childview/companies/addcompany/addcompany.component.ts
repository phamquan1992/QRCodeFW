import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DialogUploadComponent } from 'src/app/shared/dialog-upload/dialog-upload.component';
import { CompaniesService } from '../companies.service';

export interface item_dropdown_cp {
  key: string;
  value: string;
}

@Component({
  selector: 'app-addcompany',
  templateUrl: './addcompany.component.html',
  styleUrls: ['./addcompany.component.css']
})
export class AddcompanyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddcompanyComponent>, private dialog: MatDialog, private companySrc: CompaniesService) { }

  ngOnInit(): void {
    this.array_quocgia = this.companySrc.array_quocgia;
    this.arr_tinh = this.companySrc.arr_tinh;
  }
  form_close() {
    this.dialogRef.close();
  }
  src_daidien = '';
  src_bia = '';
  src_image: string[] = [];
  src_video = '';
  str_st = '';
  rotate_it = false;
  array_quocgia = [{
    key: '', value: '--Quốc gia--'
  }];
  arr_tinh = [
    {
      ma: '',
      ten: '--Tỉnh thành--'
    }
  ];
  array_huyen = [
    {
      ma: '',
      ten: '--Quận, huyện--'
    }
  ];
  array_huyen_tmp = [
    {
      ma: '',
      ten: '--Quận, huyện--'
    }
  ];
  array_xa_tmp = [
    {
      ma: '',
      ten: '--Xã, phường--'
    }
  ];
  array_xa = [
    {
      ma: '',
      ten: '--Xã, phường--'
    }
  ];
  arr_nhomnganh = [
    {
      ma: 'Nganh1',
      ten: 'Nhóm ngành 1'
    },
    {
      ma: 'Nganh2',
      ten: 'Nhóm ngành 2'
    },
    {
      ma: 'Nganh3',
      ten: 'Nhóm ngành 3'
    },
    {
      ma: 'Nganh4',
      ten: 'Nhóm ngành 4'
    },
    {
      ma: 'Nganh5',
      ten: 'Nhóm ngành 5'
    },
    {
      ma: 'Nganh6',
      ten: 'Nhóm ngành 6'
    },
  ];




  showDialog(gt: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "520px";
    dialogConfig.panelClass = "pd_dialog_none";
    this.dialog.open(DialogUploadComponent, dialogConfig).afterClosed().subscribe(
      res => {
        if (res != null && res != '' && res != undefined) {
          if (gt == 'daidien') {
            this.src_daidien = '';
            this.src_daidien = res;
          }
          if (gt == 'bia') {
            this.src_bia = '';
            this.src_bia = res;
          }
          if (gt == 'thuvienanh') {
            this.src_image.push(res);
          }
          if (gt == 'video') {
            this.src_video = '';
          }
        }
      }
    );
  }
  _tinh_val = '';
  tinh_close(gt: any) {

  }
  displayFn(selectedoption: any) {
    return selectedoption ? selectedoption.ten : undefined;
  }
  set_gt(gt: any) {
    this.array_huyen_tmp = this.companySrc.get_huyen(gt);
    this.array_huyen = this.array_huyen_tmp;
  }
  select_it(evnt: any) {
    console.log(evnt.option.value);
    let gt = evnt.option.value.ma;
    this.set_gt(gt);
  }
  select_it_xa(evnt: any) {
    console.log(evnt);
    let gt = evnt.option.value.ma;
    this.array_xa_tmp = this.companySrc.get_xa(gt);
    this.array_xa = this.array_xa_tmp;
  }
  auto_tinh_change(obj_input: any) {
    let val = obj_input.value;
    this.arr_tinh = this.companySrc.arr_tinh.filter(option => option.ten.toLowerCase().includes(val.toLowerCase()));
  }
  auto_huyen_chang(obj_input: any) {
    let val = obj_input.value;
    this.array_huyen = this.array_huyen_tmp.filter(option => option.ten.toLowerCase().includes(val.toLowerCase()));
  }
  auto_xa_chang(obj_input: any) {
    let val = obj_input.value;
    this.array_xa = this.array_xa_tmp.filter(option => option.ten.toLowerCase().includes(val.toLowerCase()));
  }
}
