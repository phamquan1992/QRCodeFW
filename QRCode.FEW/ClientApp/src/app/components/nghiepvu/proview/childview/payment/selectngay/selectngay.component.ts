import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-selectngay',
  templateUrl: './selectngay.component.html',
  styleUrls: ['./selectngay.component.css']
})
export class SelectngayComponent implements OnInit {
  ngay_select = '';
  constructor(public dialogRef: MatDialogRef<SelectngayComponent>, @Inject(MAT_DIALOG_DATA) public data: string, private messSrc: MessageService) { }

  ngOnInit(): void {
  }
  xac_nhan(gt: any) {
    console.log(gt.value);
    if (gt.value == '') {
      this.messSrc.error("Bạn chưa chọn ngày kích hoạt");
      return;
    }
    this.dialogRef.close(gt.value);
  }
  close_action() {
    this.dialogRef.close();
  }
  number_change(event: Event) {
    var inputData = (<HTMLInputElement>event.target).value;

    //replace more than one dot
    var extractedFte = inputData.replace(/[^0-9.]/g, '').replace('.', '')
      .replace(/\./g, '').replace('x', '.');

    //Extract nuber Values
    extractedFte = extractedFte.replace(/^(\d+)\d*$/, "$1");

    //Reasign to same control
    (<HTMLInputElement>event.target).value = extractedFte;
  }
  checkinput_date(gt: any) {
    let isValid = moment(gt.value, 'DD/MM/YYYY', true).isValid()
    if (!isValid) {
      gt.value = null;
    }
  }
}
