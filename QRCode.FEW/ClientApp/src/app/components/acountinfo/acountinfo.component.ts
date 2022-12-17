import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MessageObj } from 'src/app/models/message';
import { SignalRService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-acountinfo',
  templateUrl: './acountinfo.component.html',
  styleUrls: ['./acountinfo.component.css']
})
export class AcountinfoComponent implements OnInit {
  show_info = false;
  show_notify=false;
  show_message=false;
  count_user = 0;
  showMenusm = false;
  arr_notify: string[] = [];
  arr_message: string[] = [];
  MesagearrReceived$ = new Subject<MessageObj[]>();
  constructor(private signalrSrv: SignalRService) {

  }
  ngOnInit(): void {
    this.signalrSrv.count_user.subscribe(t => { this.count_user = t; });
    this.MesagearrReceived$ = this.signalrSrv.MesagearrReceived$;
    this.arr_notify = this.signalrSrv.arr_notify;
  }
  dang_xuat() {

  }
  click_out(event: any) {
    this.show_info = event;
  }
  click_out2(event: any) {
    this.show_notify = event;
  }
  click_message(event: any) {
    this.show_message = event;
  }
}
