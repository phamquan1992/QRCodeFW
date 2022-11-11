import { Component, OnInit } from '@angular/core';
import { data_dialog_input, optioncs } from 'src/app/models/optioncs';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContentdgComponent } from 'src/app/components/share/contentdg/contentdg.component';

@Component({
  selector: 'app-linkqrcode',
  templateUrl: './linkqrcode.component.html',
  styleUrls: ['./linkqrcode.component.css']
})
export class LinkqrcodeComponent implements OnInit {
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
  op_tion: optioncs = new optioncs();
  status = '';
  now: Date = new Date();
  constructor(private dialog: MatDialog,private datepipe: DatePipe) { }

  ngOnInit(): void {
  }
  onchange_text(gt: any) {
    this.data ="URL:"+ gt.value;
    if (gt.value === '' || gt.value === null)
      this.data = " ";
  }
  xuat_qr(item: optioncs) {
    this.op_tion = item;
  }
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
}
