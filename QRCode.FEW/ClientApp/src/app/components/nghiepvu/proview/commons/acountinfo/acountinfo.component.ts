import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { nguoidung } from 'src/app/models/nguoidung';
import { MessageService } from 'src/app/services/message.service';
import { ObservableService } from 'src/app/services/observable.service';

@Component({
  selector: 'app-acountinfo',
  templateUrl: './acountinfo.component.html',
  styleUrls: ['./acountinfo.component.css']
})
export class AcountinfoComponent implements OnInit {

  constructor(private router: Router, private messSrc: MessageService, private _sharingService: ObservableService) { }
  nguoidung: nguoidung = {
    email: '',
    id: '',
    sodt: '',
    token: ''
  };
  ngOnInit(): void {
    this._sharingService.getUserInfo().subscribe(t => {
      this.nguoidung = t;
    });
  }
  show_info = false;
  dang_xuat() {
    this._sharingService.reMoveUserValue();
    this.router.navigate(['/qrcode-free']);
  }
}
