import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { qr_payment } from 'src/app/models/qr_payment';
import { ObservableService } from 'src/app/services/observable.service';
import { PaynemtService } from 'src/app/services/paynemt.service';

@Component({
  selector: 'app-syncpack',
  templateUrl: './syncpack.component.html',
  styleUrls: ['./syncpack.component.css']
})
export class SyncpackComponent implements OnInit {
  pkg_code = '';
  pkg_name = '';
  obj_select!: qr_payment;
  arr_temp: qr_payment[] = [];
  constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<SyncpackComponent>, @Inject(MAT_DIALOG_DATA) public data: string,
    private paymentSrc: PaynemtService, private sharingSrc: ObservableService, private datepipe: DatePipe) { }
  arrpayment!: Observable<qr_payment[]>;
  ngOnInit(): void {
    this.sharingSrc.getUserInfo().subscribe(t => {
      this.arrpayment = this.paymentSrc.get_payment_list(Number(t.id));
      this.arrpayment.subscribe(t => {
        this.arr_temp = t;
      });
    });
  }
  select_pack(gt: any) {
    //this.pkg_code = gt.value;
    let index_tmp = this.arr_temp.findIndex(t => t.qrpaymentid == Number(gt.value));
    if (index_tmp == -1)
      this.pkg_name = '';
    else {
      let obj_tmp = this.arr_temp[index_tmp];
      var myDate = this.get_next_year(obj_tmp.payment_date);
      this.pkg_name = obj_tmp.packname + ' - Ngày hết hạn: ' + this.datepipe.transform(myDate, 'dd/MM/yyyy');
    }

  }
  close_action() {
    this.dialogRef.close();
  }
  xac_nhan() {
    this.dialogRef.close(this.pkg_code);
  }
  get_next_year(gt: Date) {
    var myDate = new Date(gt);
    let gt2 = myDate.getFullYear() + 1;
    myDate.setFullYear(gt2);
    return myDate;
  }
}
