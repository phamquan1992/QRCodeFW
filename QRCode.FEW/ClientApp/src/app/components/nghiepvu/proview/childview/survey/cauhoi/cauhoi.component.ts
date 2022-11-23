import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { cauhoi } from 'src/app/models/cauhoi';
import { data_upload } from 'src/app/models/optioncs';
import { DialogUploadComponent } from 'src/app/shared/dialog-upload/dialog-upload.component';

@Component({
  selector: 'app-cauhoi',
  templateUrl: './cauhoi.component.html',
  styleUrls: ['./cauhoi.component.css']
})
export class CauhoiComponent implements OnInit {

  constructor(private dialog: MatDialog,) { }
  @Input() cauhoi_in: cauhoi = {
    name: '',
    visible_index: 0,
    noidung: '',
    type: '',
    element: [],
    dapan: { key: '', value: '', mota: '' }
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
      value: '',
      mota: ''
    };
    this.cauhoi_in.element.push(tmp);
  }
  delete_cautl(i: string) {
    let id_del = this.cauhoi_in.element.findIndex(t => t.key == i);
    this.cauhoi_in.element.splice(id_del, 1);
    let index_item = this.arr_err.indexOf(i);
    if (index_item > -1)
      this.arr_err.splice(index_item, 1);
  }
  showHidediv() {
    this.iscols = !this.iscols;
  }
  change_noidung(nd: any) {
    this.cauhoi_in.noidung = nd.value;
    this.is_valid_nd = this.cauhoi_in.noidung == "" ? false : true;
  }
  change_traloi(event: any, str_key: string) {
    let gt_index = this.cauhoi_in.element.findIndex(t => t.key == str_key);
    this.cauhoi_in.element[gt_index].value = event.target.value;
  }
  change_traloi_img(event: any, str_key: string) {
    let gt_index = this.cauhoi_in.element.findIndex(t => t.key == str_key);
    this.cauhoi_in.element[gt_index].mota = event.target.value;
  }
  is_valid_nd = true;
  focusout_nd(nd: any) {
    this.cauhoi_in.noidung = nd.value.trim();
    this.is_valid_nd = this.cauhoi_in.noidung == "" ? false : true;
  }
  arr_err: string[] = [];
  focusout_traloi(event: any, name: string) {
    let gt = event.target.value.trim();
    event.target.value = gt;
    if (event.target.value === "")
      this.arr_err.push(name);
    else {
      let index_item = this.arr_err.indexOf(name);
      this.arr_err.splice(index_item, 1);
    }
  }
  is_valid_traloi(name: string) {
    return this.arr_err.indexOf(name) != -1;
  }
  is_valid_img(name: string) {
    return this.arr_err.indexOf(name) != -1;
  }
  img_select = '';
  uploadFile(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        //this.imageUrl = reader.result;
        debugger;
        let gt_index = this.cauhoi_in.element.findIndex(t => t.key == this.img_select);
        this.cauhoi_in.element[gt_index].value = reader.result?.toString() || '';
        if (this.cauhoi_in.element[gt_index].value != '') {
          let index_item = this.arr_err.indexOf(this.img_select);
          while (index_item != -1) {
            this.arr_err.splice(index_item, 1);
            index_item = this.arr_err.indexOf(this.img_select);
          }
        }
      }
      // ChangeDetectorRef since file is loading outside the zone
      //this.cd.markForCheck();        
    }
  }
  showBrowser(fileInput: any, str_key: string) {
    this.img_select = str_key;
    let gt_index = this.cauhoi_in.element.findIndex(t => t.key == str_key);
    if (this.cauhoi_in.element[gt_index].value == '') {
      this.arr_err.push(str_key);
    }
    fileInput.click();
  }
  showDialog(str_key: string) {
    this.img_select = str_key;
    let gt_index = this.cauhoi_in.element.findIndex(t => t.key == str_key);
    if (this.cauhoi_in.element[gt_index].value == '') {
      this.arr_err.push(str_key);
    }
    let data_show: data_upload = {
      type_file: 'image',
      forder_save: 'qr_survey'
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "520px";
    // dialogConfig.height = "310px";
    dialogConfig.panelClass = "pd_dialog_none";
    dialogConfig.data = data_show;
    this.dialog.open(DialogUploadComponent, dialogConfig).afterClosed().subscribe(
      res => {
        if (res != null && res != '' && res != undefined) {
          let gt_index = this.cauhoi_in.element.findIndex(t => t.key == this.img_select);
          this.cauhoi_in.element[gt_index].value = res || '';
          if (this.cauhoi_in.element[gt_index].value != '') {
            let index_item = this.arr_err.indexOf(this.img_select);
            while (index_item != -1) {
              this.arr_err.splice(index_item, 1);
              index_item = this.arr_err.indexOf(this.img_select);
            }
          }
          // if (gt == 'daidien') {
          //     this.src_daidien = res;
          //     this.DataForm.controls['logo'].setValue(res);
          // } else if (gt == 'sanpham') {
          //     this.src_sanpham = res;
          //     this.DataForm.controls['url_img'].setValue(res);
          // }
          // else if (gt == 'chungchi') {
          //     this.src_chungchi = res;
          //     this.DataForm.controls['url_iso'].setValue(res);
          // }
          // else if (gt == 'mavach') {
          //     this.src_mavach = res;
          //     this.DataForm.controls['url_barcode'].setValue(res);
          // }
          // else if (gt == 'video') {
          //     this.src_video = res;
          //     this.DataForm.controls['url_video'].setValue(res);
          // }
        }
      }
    );
  }
}
