import { DatePipe } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { optioncs } from 'src/app/models/optioncs';

@Component({
  selector: 'app-contentdg',
  templateUrl: './contentdg.component.html',
  styleUrls: ['./contentdg.component.css']
})
export class ContentdgComponent implements OnInit {

  constructor(private datepipe: DatePipe, public dialogRef: MatDialogRef<ContentdgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: optioncs) { }
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
    this.status = '';
    this.op_tion = this.data;
    this.op_tion_temp = {
      data: ' ',
      image: this.data.image,
      witdth: this.data.witdth,
      height: this.data.height,
      margin: this.data.margin,
      dotstyle: this.data.dotstyle,
      cornersDot_type: this.data.cornersDot_type,
      cornerSquareType: this.data.cornerSquareType,
      dotcolor: this.data.dotcolor,
      background_color: this.data.background_color,
      shape: this.data.shape
    };
  }
  onClose() {
    this.dialogRef.close();
  }

  taiqr() {
    this.now = new Date();
    this.status = 'download' + this.datepipe.transform(this.now, 'yyyyMMddHHmmss');
  }
}
