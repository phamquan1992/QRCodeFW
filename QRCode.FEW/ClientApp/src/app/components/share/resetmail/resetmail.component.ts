import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MailRequest, result_object } from 'src/app/models/optioncs';
import { CommonService } from 'src/app/services/common.service';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-resetmail',
  templateUrl: './resetmail.component.html',
  styleUrls: ['./resetmail.component.css']
})
export class ResetmailComponent implements OnInit {

  constructor(private dataSrc: DataService, private messSrc: MessageService, public dialogRef: MatDialogRef<ResetmailComponent>, @Inject('BASE_URL') baseUrl: string) {
    this.url_str = baseUrl;
  }
  user_name = '';
  url_str: string = '';
  ngOnInit(): void {
  }

  get required() {
    if (this.user_name == null || this.user_name == '')
      return false;
    else {
      return this.get_isval(this.user_name);
    }
  }
  get_isval(email: string) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  reset_pass() {
    let mail_xacnhan = this.user_name;
    let url_xacnhan = this.url_str + 'views/changepass/' + this.user_name;
    let pass_ram = this.makeRandom(6);
    let mail_objet: MailRequest = {
      sdt: url_xacnhan,
      pass: pass_ram,
      toemail: mail_xacnhan,
      subject: "Thay đổi mật khẩu",
      body: '',
    };
    let kq: result_object = {
      result: '',
      error: ''
    };
    this.dataSrc.put('SendMail/ResetPass', mail_objet).subscribe(t => {
      kq = t as result_object;
      if (kq.result == "Success") {
        this.messSrc.success('Bạn đã thực hiện thành công!');
        this.dialogRef.close();
      } else if (kq.result == "NotUser") {
        this.messSrc.error('Không có email này trong hệ thống!');
      }
      else {
        this.messSrc.error('Có lỗi trong quá trình đăng ký!');
      }

    });
  }
  makeRandom(lengthOfCode: number) {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
