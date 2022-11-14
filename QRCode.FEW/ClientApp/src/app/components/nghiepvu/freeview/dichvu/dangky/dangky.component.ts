import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { nguoidung } from 'src/app/models/nguoidung';
import { qr_payment } from 'src/app/models/qr_payment';
import { MessageService } from 'src/app/services/message.service';
import { ObservableService } from 'src/app/services/observable.service';
import { PaynemtService } from 'src/app/services/paynemt.service';
export interface dangky_obj {
  pack_code: string;
  pack_name: string;
  price: string;
}
@Component({
  selector: 'app-dangky',
  templateUrl: './dangky.component.html',
  styleUrls: ['./dangky.component.css']
})
export class DangkyComponent implements OnInit {

  check_gt: any;
  constructor(public dialogRef: MatDialogRef<DangkyComponent>, private paymentSrc: PaynemtService, private messSrc: MessageService, private _sharingService: ObservableService, @Inject(MAT_DIALOG_DATA) public data: dangky_obj) { }

  ngOnInit(): void {
  }
  onClose() {
    this.dialogRef.close();
  }
  xac_nhan() {
    let pay: qr_payment = {
      qrpaymentid: 0,
      packcode: '',
      packname: '',
      userid: 0,
      qrenterpriseid: 0,
      payment_date: new Date(),
      created_date: new Date(),
      created_by: 0,
      lastcreated_date: new Date(),
      lastcreated_by: 0
    };
    this._sharingService.getUserInfo().subscribe(user => {
      debugger;
      pay.userid = Number(user.id);
      pay.created_by = Number(user.id);
      pay.packcode = this.data.pack_code;
      pay.packname = this.data.pack_name;
      console.log(JSON.stringify(pay));
      this.paymentSrc.add_payment(pay).subscribe(
        check => {
          if (check) {
            this.messSrc.success('Bạn đã đăng ký thành công!');
            this.onClose();
          } else {
            this.messSrc.error('Có lỗi trong quá trình đăng ký!');
          }
        }
      );
    });
  }
}
