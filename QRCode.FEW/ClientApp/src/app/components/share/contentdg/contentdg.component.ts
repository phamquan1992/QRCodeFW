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
  }
  onClose() {
    this.dialogRef.close();
  }

  taiqr() {
    this.now = new Date();
    this.status = 'download' + this.datepipe.transform(this.now, 'yyyyMMddHHmmss');
  }
}
