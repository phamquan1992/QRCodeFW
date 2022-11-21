import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { nguoidung } from 'src/app/models/nguoidung';
import { qr_payment } from 'src/app/models/qr_payment';
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
  arr_payment: qr_payment[] = [];
  loading$: boolean = false;
  user_info!: nguoidung;
  displayedColumns: string[] = ['select', 'name', 'DiaChi', 'TrangThai', 'ngaysua', 'action'];
  dataSource = new MatTableDataSource<qr_payment>(this.arr_payment);
  selection = new SelectionModel<qr_payment>(true, []);
  ngOnInit(): void {
  }

}
