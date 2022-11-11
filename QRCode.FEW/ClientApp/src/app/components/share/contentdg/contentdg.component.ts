import { DatePipe } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { data_dialog_input, optioncs } from 'src/app/models/optioncs';
import { qr_gencode } from 'src/app/models/qr_gencode';
import { GencodeService } from 'src/app/services/gencode.service';
import { MessageService } from 'src/app/services/message.service';
import { ObservableService } from 'src/app/services/observable.service';

@Component({
  selector: 'app-contentdg',
  templateUrl: './contentdg.component.html',
  styleUrls: ['./contentdg.component.css']
})
export class ContentdgComponent implements OnInit {

  constructor(private datepipe: DatePipe, public dialogRef: MatDialogRef<ContentdgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: data_dialog_input) { }
  status = '';
  now: Date = new Date();
  op_tion_temp: optioncs = new optioncs();
  op_tion: optioncs = {
    data: " ",
    image: '',
    witdth: 300,
    height: 300,
    margin: 0,
    dotstyle: "square",
    cornersDot_type: 'None',
    cornerSquareType: 'None',
    dotcolor: '#000000',
    background_color: '#ffffff',
    shape: 'square'
  };
  ngOnInit(): void {
    console.log(this.data.status);
    this.status = '';
    this.op_tion = this.data.option;
    this.op_tion_temp = {
      data: ' ',
      image: this.data.option.image,
      witdth: this.data.option.witdth,
      height: this.data.option.height,
      margin: this.data.option.margin,
      dotstyle: this.data.option.dotstyle,
      cornersDot_type: this.data.option.cornersDot_type,
      cornerSquareType: this.data.option.cornerSquareType,
      dotcolor: this.data.option.dotcolor,
      background_color: this.data.option.background_color,
      shape: this.data.option.shape
    };
  }
  onClose() {
    this.dialogRef.close();
  }

  taiqr() {
    this.now = new Date();
    this.status = 'download' + this.datepipe.transform(this.now, 'yyyyMMddHHmmss');

  }
  save_qrcode() {
    debugger;
    let image = this.convert_img_qrcode();
    this.dialogRef.close(image);
  }
  convert_img_qrcode() {
    let dt = document.getElementById('qrcontentmb') as HTMLElement;
    let canvas = dt.getElementsByTagName('canvas');
    let tmp = canvas[0] as HTMLCanvasElement;
    const data = tmp.toDataURL();
    return data;
  }
}
