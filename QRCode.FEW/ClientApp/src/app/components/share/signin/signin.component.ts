import { E } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MailRequest, mail_model, result_object } from 'src/app/models/optioncs';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/message.service';
export const passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('repassword');
  let gt = password?.value === confirmPassword?.value ? null : { notmatched: true };
  return gt;
};
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  DataForm!: FormGroup;
  url_str: string = '';
  constructor(public dialogRef: MatDialogRef<SigninComponent>, private dataSrc: DataService, private mess: MessageService, @Inject('BASE_URL') baseUrl: string) {
    this.url_str = baseUrl;
  }

  ngOnInit(): void {
    this.DataForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      sdt: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(12)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repassword: new FormControl('', [Validators.required])
    }, { validators: passwordMatchingValidatior });

  }

  onClose() {
    this.dialogRef.close();

  }
  dang_ky() {
    if (this.DataForm.invalid) {
      return;
    }
    console.log(this.DataForm.value);
    let mail_xacnhan = this.DataForm.controls['email'].value;
    let sdt_xacnhan = this.DataForm.controls['sdt'].value;
    let pass_xacnhan = this.DataForm.controls['password'].value;
    let url_xacnhan = this.url_str + 'api/SendMail/XacThuc?sdt=' + sdt_xacnhan;
    let mail_objet: MailRequest = {
      sdt: sdt_xacnhan,
      pass: pass_xacnhan,
      toemail: mail_xacnhan,
      subject: "Thư xác nhận",
      body: "<div><h2>Bạn đã đăng ký tài khoản tại trang web của chúng tôi</h2></div><div>Số điện thoại: " + sdt_xacnhan + "</div><div>Mật khẩu: " + pass_xacnhan + "</div><div>Vui lòng vào link dưới để xác nhận đăng ký</div><div><a href='" + url_xacnhan + "'>Bấm vào đây để kích hoạt tài khoản</a><div>",
    };
    let kq: result_object = {
      result: ''
    };
    this.dataSrc.post('SendMail/Send', mail_objet).subscribe(t => {
      kq = t as result_object;
      if (kq.result == "Success") {
        this.mess.success('Bạn đã đăng ký thành công!');
        this.dialogRef.close();
      } else {
        this.mess.error('Có lỗi trong quá trình đăng ký!');
      }

    });
  }
}

