import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginComponent } from '../components/share/login/login.component';
import { nguoidung } from '../models/nguoidung';
import { ObservableService } from './observable.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastr: ToastrService, private _sharingService: ObservableService, private router: Router, private dialog: MatDialog) { }
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
      token: ''
    };
    if (error.status == 401) {
      this.warn('Đã hết phiên làm việc');
      this._sharingService.reMoveTokenValue();
      this._sharingService.reMoveUserValue();
      //this._sharingService.setUserValue(nd);
      //this.router.navigate(['/qrcode-free']);
      this.showDialog();
    } else if (error.status == 403) {
      this.error('Trang không tồn tại');
      this._sharingService.reMoveTokenValue();
      this._sharingService.reMoveUserValue();
      //this._sharingService.setUserValue(nd);
      this.router.navigate(['/qrcode-free']);
      this.showDialog();
    } else {
      let errMsg = JSON.parse(error._body).Message;
      this.error(errMsg);
    }
  }
  showDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = "95%";
    dialogConfig.panelClass = ['md:w-[900px]', 'md:h-[585px]', 'w-full', 'h-[95%]', 'magrin_pane'];
    dialogConfig.disableClose = true;
    this.dialog.open(LoginComponent, dialogConfig).afterClosed().subscribe(
      res => {
        this._sharingService.getUserInfo();
      }
    );
  }
}
