import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { optioncs } from 'src/app/models/optioncs';
import { DatePipe } from '@angular/common';
import { ContentdgComponent } from 'src/app/components/share/contentdg/contentdg.component';

@Component({
  selector: 'app-vanban',
  templateUrl: './vanban.component.html',
  styleUrls: ['./vanban.component.css']
})
export class VanbanComponent implements OnInit {

  constructor(private dialog: MatDialog, private datepipe: DatePipe) { }
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

}
