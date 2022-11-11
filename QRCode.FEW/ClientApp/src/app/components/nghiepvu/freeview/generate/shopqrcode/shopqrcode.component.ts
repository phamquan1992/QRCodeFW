import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { data_dialog_input, optioncs } from 'src/app/models/optioncs';
import { DatePipe } from '@angular/common';
import { ContentdgComponent } from 'src/app/components/share/contentdg/contentdg.component';
import { obj_value_form } from 'src/app/models/cauhoi';

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
      name: 'Website', value: ''
    }
  ];
  constructor(private dialog: MatDialog, private datepipe: DatePipe) { }

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
    this.data = gt.value;
    if (gt.value === '' || gt.value === null)
      this.data = " ";
    //this.change_val();
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
  get_data() {
    let ar_str = this.arr_link.map(t => t.value);
    let tem_gt = ``;
    ar_str.forEach(element => {
      if (element != '' && element != null)
        tem_gt = tem_gt == '' ? "URL:" + element : tem_gt + ';' + "URL:" + element;
    });
    if (tem_gt === '')
      this.data = " ";
    else
      tem_gt = tem_gt + ";";
    // this.data = "BEGIN:LINK\r\n" +
    // "VERSION:3.0\r\n" +    
    // "URL:https://www.google.com/\r\n"+
    // "URL:https://www.facebook.com/\r\n" +
    // "END:LINK\r\n";
    console.log(tem_gt);
    this.data = "MECARD:N:TQC,eQR;" + tem_gt;
  }
  add_link(gt: string) {
    let index_any = this.arr_link.findIndex(t => t.name == gt);
    if (index_any == -1)
      this.arr_link.push({ name: gt, value: '' });
  }
}
