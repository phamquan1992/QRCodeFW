import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { data_dialog_input, optioncs } from 'src/app/models/optioncs';
import { DatePipe } from '@angular/common';
import { ContentdgComponent } from 'src/app/components/share/contentdg/contentdg.component';
import { obj_value_form } from 'src/app/models/cauhoi';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-shopqrcode',
  templateUrl: './shopqrcode.component.html',
  styleUrls: ['./shopqrcode.component.css']
})
export class ShopqrcodeComponent implements OnInit {
  title = 'ngxqrcodeex';
  data = ' ';
  image = '';
  witdth = 200;
  height = 200;
  margin = 0;
  dotstyle = "square"; //"square" hoặc "dots"
  dotcolor = '#000000';
  background_color = '#ffffff';
  shape = 'square' //"square" hoặc "circle"
  cornersDot_type = 'None';
  cornerSquareType = 'None';
  status = '';
  arr_link: obj_value_form[] = [
    {
      name: 'Website', value: '', required: true
    }
  ];
  constructor(private dialog: MatDialog, private datepipe: DatePipe, private commonSrc: CommonService) { }

  ngOnInit(): void {
    this.status = '';
  }
  now: Date = new Date();
  op_tion: optioncs = new optioncs();
  taiqr() {
    this.now = new Date();
    this.status = 'download' + this.datepipe.transform(this.now, 'yyyyMMddHHmmss');
  }
  showDialog() {
    let data_input: data_dialog_input = {
      option: this.op_tion,
      status: false
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.height = "100%";
    dialogConfig.maxWidth = "95%";
    dialogConfig.maxHeight = "95%";
    dialogConfig.data = data_input;
    // dialogConfig.height = "310px";
    this.dialog.open(ContentdgComponent, dialogConfig).afterClosed().subscribe(
      res => {
        // this.rowSelect = -1;
      }
    );
  }
  onchange_text(gt: any) {
    let is_check = this.commonSrc.isValidHttpUrl(gt.value);
    this.update_data(gt.name, gt.value, is_check);
    this.get_data();
  }
  ten_cuahang = '';
  mota = '';
  phone = '';
  email = '';
  diachi = '';
  onchange_text2(event: any, name: string) {
    let gt_temp = event.value;
    if (name == 'ten_cuahang') {
      this.ten_cuahang = gt_temp.trim();
    }
    if (name == 'mota') {
      this.mota = gt_temp.trim();
    }
    if (name == 'phone') {
      this.phone = gt_temp.trim();
    }
    if (name == 'email') {
      this.email = gt_temp.trim();
    }
    if (name == 'diachi') {
      this.diachi = gt_temp.trim();
    }
    this.get_data();
  }
  change_val() {
    this.op_tion = {
      data: this.data,
      image: this.image,
      witdth: this.witdth,
      height: this.height,
      margin: this.margin,
      dotstyle: this.dotstyle,
      cornersDot_type: this.cornersDot_type,
      cornerSquareType: this.cornerSquareType,
      dotcolor: this.dotcolor,
      background_color: this.background_color,
      shape: this.shape
    };
  }
  xuat_qr(item: optioncs) {
    this.op_tion = item;
  }
  delete_link(gt: string) {
    let index_any = this.arr_link.findIndex(t => t.name == gt);
    this.arr_link.splice(index_any, 1);
    this.get_data();
  }
  str_link = '';
  update_data(name: string, value: string, required: boolean) {
    let index_gt = this.arr_link.findIndex(t => t.name == name);
    if (index_gt > -1) {
      this.arr_link[index_gt].value = !required ? '' : value;
      this.arr_link[index_gt].required = required;
      if (value == '') {
        this.arr_link[index_gt].required = true;
      }
    }
    let ar_str = this.arr_link.map(t => t.value);
    this.str_link = '';
    ar_str.forEach(element => {
      if (element != '' && element != null) {
        this.str_link = this.str_link + "URL:" + element + "\r\n";
      }
    });
  }
  get_data() {
    let card_temp = "BEGIN:VCARD\r\n" +
      "VERSION:3.0\r\n" +
      "N:Tên cửa hàng: " + this.ten_cuahang + ";\r\n" +
      "TITLE: Giới thiệu: " + this.mota + "\r\n" +
      "TEL;TYPE=work,voice:" + this.phone + "\r\n" +
      "EMAIL;TYPE=internet:" + this.email + "\r\n" +
      this.str_link +
      "ADR:;;" + this.diachi + "\r\n" +
      "END:VCARD";
    this.data = card_temp;
  }

  add_link(gt: string) {
    let index_any = this.arr_link.findIndex(t => t.name == gt);
    if (index_any == -1)
      this.arr_link.push({ name: gt, value: '', required: true });
  }
  focusFunction(gt: any) {
    let gt_tem = gt.value.trim();
    gt.value = gt_tem;
  }
  focusFunction2(gt: any) {
    let gt_tem = gt.value.trim();
    gt.value = gt_tem;
  }
  focusEmail(gt: any) {
    let gt_tem = gt.value.trim();
    gt.value = gt_tem;

  }
  get_isval(email: string) {
    if (email == '') {
      return true
    } else {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
  }

}
