import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastr: ToastrService) { }
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
}
