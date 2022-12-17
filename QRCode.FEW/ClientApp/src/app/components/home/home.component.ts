import { Component } from '@angular/core';
import { SignalRService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  count_user = 0;
  constructor(private signalrSrv: SignalRService) {
    this.signalrSrv.count_user.subscribe(t => { this.count_user = t; });
  }
  thongbao() {
    this.signalrSrv.send_allmess("Test", "Test gửi thông báo");
  }
}
