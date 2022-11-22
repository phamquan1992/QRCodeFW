import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogConfig } from '@angular/material/dialog';
import { cauhoi } from 'src/app/models/cauhoi';
import { data_upload } from 'src/app/models/optioncs';
import { DialogUploadComponent } from 'src/app/shared/dialog-upload/dialog-upload.component';

@Component({
  selector: 'app-cauhoi',
  templateUrl: './cauhoi.component.html',
  styleUrls: ['./cauhoi.component.css']
})
export class CauhoiComponent implements OnInit {

  constructor() { }
  @Input() cauhoi_in: cauhoi = {
    name: '',
    visible_index: 0,
    noidung: '',
    type: '',
    element: [],
    dapan: { key: '', value: '' }
  };
  iscols = false;
  @Input() form!: FormGroup;
  ngOnInit(): void {
    this.iscols = true;
  }
  them_cautl() {
    let length_arr = this.cauhoi_in.element.length + 1;
    let tmp = {
      key: 'dapan' + length_arr,
      value: ''
    };
    this.cauhoi_in.element.push(tmp);
  }
  delete_cautl(i: string) {
    let id_del = this.cauhoi_in.element.findIndex(t => t.key == i);
    this.cauhoi_in.element.splice(id_del, 1);
  }
  showHidediv() {
    this.iscols = !this.iscols;
  }
  change_noidung(nd: any) {
    this.cauhoi_in.noidung = nd.value;
  }
  change_traloi(event: any, str_key: string) {
    let gt_index = this.cauhoi_in.element.findIndex(t => t.key == str_key);
    this.cauhoi_in.element[gt_index].value = event.target.value;
  }
  focusout_nd(nd: any) {
    this.cauhoi_in.noidung = nd.value.trim();
  }
  // showDialog(gt: string) {
  //   let data_show: data_upload = {
  //     type_file: 'image',
  //     forder_save: 'survey'
  //   }
  //   if (gt == 'video')
  //     data_show.type_file = 'video';
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = false;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = "520px";
  //   // dialogConfig.height = "310px";
  //   dialogConfig.panelClass = "pd_dialog_none";
  //   dialogConfig.data = data_show;
  //   this.dialog.open(DialogUploadComponent, dialogConfig).afterClosed().subscribe(
  //     res => {
  //       debugger;
  //       if (res != null && res != '' && res != undefined) {
  //         if (gt == 'daidien') {
  //           this.src_daidien = res;
  //           this.DataForm.controls['logo'].setValue(res);
  //         } else if (gt == 'sanpham') {
  //           this.src_sanpham = res;
  //           this.DataForm.controls['url_img'].setValue(res);
  //         }
  //         else if (gt == 'chungchi') {
  //           this.src_chungchi = res;
  //           this.DataForm.controls['url_iso'].setValue(res);
  //         }
  //         else if (gt == 'mavach') {
  //           this.src_mavach = res;
  //           this.DataForm.controls['url_barcode'].setValue(res);
  //         }
  //         else if (gt == 'video') {
  //           this.src_video = res;
  //           this.DataForm.controls['url_video'].setValue(res);
  //         }
  //       }
  //     }
  //   );
  // }
}
