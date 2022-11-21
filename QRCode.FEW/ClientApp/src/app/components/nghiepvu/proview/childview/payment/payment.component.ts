import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { nguoidung } from 'src/app/models/nguoidung';
import { payment_view, qr_payment } from 'src/app/models/qr_payment';
import { MessageService } from 'src/app/services/message.service';
import { ObservableService } from 'src/app/services/observable.service';
import { PaynemtService } from 'src/app/services/paynemt.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private paymentSrc: PaynemtService, private messSrc: MessageService, private sharingSrc: ObservableService,) { }
  arr_payment: payment_view[] = [];
  loading$: boolean = false;
  user_info!: nguoidung;
  displayedColumns: string[] = ['select', 'email', 'phone', 'packname', 'created_date', 'payment_date', 'action'];
  dataSource = new MatTableDataSource<payment_view>(this.arr_payment);
  selection = new SelectionModel<payment_view>(true, []);
  range_exp = new FormGroup({
    start_exp: new FormControl(null),
    end_exp: new FormControl(null),
  });
  ngOnInit(): void {
  }
  applyFilter(){

  }
  reload_grid(){

  }
  checkinput_date(gt: any) {
    let isValid = moment(gt.value, 'DD/MM/YYYY', true).isValid()
    if (!isValid) {
      gt.value = null;
    }
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
