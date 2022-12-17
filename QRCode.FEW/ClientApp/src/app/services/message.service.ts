import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { nguoidung } from '../models/nguoidung';
import { ObservableService } from './observable.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastr: ToastrService, private _sharingService: ObservableService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog) { }
  success(str_thongbao: string) {
    this.toastr.success(str_thongbao, 'Thông báo',
      {
        progressBar: true
      });
  }
  warn(str_thongbao: string) {
    this.toastr.warning(str_thongbao, 'Thông báo',
      {
        progressBar: true
      });
  }
  error(str_thongbao: string) {
    this.toastr.error(str_thongbao, 'Thông báo',
      {
        progressBar: true
      });
  }
  handError(error: any) {
    let nd: nguoidung = {
      email: '',
      id: '',
      sodt: '',
      token: '',
      active: false,
      isadmin: false
    };
    if (error.status == 401) {
      this.warn('Đã hết phiên làm việc');
      this._sharingService.reMoveTokenValue();
      this._sharingService.reMoveUserValue();
      //this._sharingService.setUserValue(nd);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = "reload";
      this.router.navigate(['./'], { relativeTo: this.route });
      //this.router.navigate(['/qrcode-free']);
    } else if (error.status == 403) {
      this.error('Trang không tồn tại');
      this._sharingService.reMoveTokenValue();
      this._sharingService.reMoveUserValue();
      //this._sharingService.setUserValue(nd);
      this.router.navigate(['/qrcode-free']);
    } else {
      console.log(error);
      if (error._body != undefined) {
        let errMsg = JSON.parse(error._body).Message;
        this.error(errMsg);
      } else {
        this.error("Xảy ra lỗi hệ thống, vui lòng liên hệ với quản trị!");
      }
    }
  }
}

