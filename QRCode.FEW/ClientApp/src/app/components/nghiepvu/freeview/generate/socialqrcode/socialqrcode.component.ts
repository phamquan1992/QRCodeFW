import { Component, OnInit } from '@angular/core';
import { optioncs } from 'src/app/models/optioncs';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContentdgComponent } from 'src/app/components/share/contentdg/contentdg.component';
import { obj_value_form } from 'src/app/models/cauhoi';


@Component({
  selector: 'app-socialqrcode',
  templateUrl: './socialqrcode.component.html',
  styleUrls: ['./socialqrcode.component.css']
})
export class SocialqrcodeComponent implements OnInit {
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
  op_tion: optioncs = new optioncs();
  status = '';
  now: Date = new Date();
  constructor(private dialog: MatDialog, private datepipe: DatePipe) { }

  ngOnInit(): void {
  }
  arr_link: obj_value_form[] = [
    {
      name: 'Website', value: ''
    }
  ];
  onchange_text(gt: any) {
    this.update_data(gt.name, gt.value);
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
  update_data(name: string, value: string) {
    let index_gt = this.arr_link.findIndex(t => t.name == name);
    if (index_gt > -1)
      this.arr_link[index_gt].value = value;
  }
  xuat_qr(item: optioncs) {
    this.op_tion = item;
  }
  taiqr() {
    this.now = new Date();
    this.status = 'download' + this.datepipe.transform(this.now, 'yyyyMMddHHmmss');
  }
  showDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.height = "100%";
    dialogConfig.maxWidth = "95%";
    dialogConfig.maxHeight = "95%";
    dialogConfig.data = this.op_tion;
    // dialogConfig.height = "310px";
    this.dialog.open(ContentdgComponent, dialogConfig).afterClosed().subscribe(
      res => {
      }
    );
  }
  add_link(gt: string) {
    let index_any = this.arr_link.findIndex(t => t.name == gt);
    if (index_any == -1)
      this.arr_link.push({ name: gt, value: '' });
  }
  delete_link(gt: string) {
    let index_any = this.arr_link.findIndex(t => t.name == gt);
    this.arr_link.splice(index_any, 1);
    this.get_data();
  }
}
