import { E } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MailRequest, mail_model, result_object } from 'src/app/models/optioncs';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/message.service';
import { ObservableService } from 'src/app/services/observable.service';
import { LoginComponent } from '../login/login.component';
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
  loading$ = false;
  constructor(public dialogRef: MatDialogRef<SigninComponent>, private dataSrc: DataService, private mess: MessageService, @Inject('BASE_URL') baseUrl: string,
    private dialog: MatDialog, private _sharingService: ObservableService) {
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
    this.loading$ = true;
    let mail_xacnhan = this.DataForm.controls['email'].value;
    let sdt_xacnhan = this.DataForm.controls['sdt'].value;
    let pass_xacnhan = this.DataForm.controls['password'].value;
    let url_xacnhan = this.url_str + 'api/SendMail/XacThuc?sdt=' + sdt_xacnhan;
    let mail_objet: MailRequest = {
      sdt: sdt_xacnhan,
      pass: pass_xacnhan,
      toemail: mail_xacnhan,
      subject: "Th?? x??c nh???n",
      body: "<div><h2>B???n ???? ????ng k?? t??i kho???n t???i trang web c???a ch??ng t??i</h2></div><div>S??? ??i???n tho???i: " + sdt_xacnhan + "</div><div>M???t kh???u: " + pass_xacnhan + "</div><div>Vui l??ng v??o link d?????i ????? x??c nh???n ????ng k??</div><div><a href='" + url_xacnhan + "'>B???m v??o ????y ????? k??ch ho???t t??i kho???n</a><div>",
    };
    let kq: result_object = {
      result: '',
      error: ''
    };
    this.dataSrc.post('SendMail/Send', mail_objet).subscribe(t => {
      this.loading$ = false;
      kq = t as result_object;
      if (kq.result == "Success") {
        this.mess.success('B???n ???? ????ng k?? th??nh c??ng!');
        this.dialogRef.close();
      } else if (kq.result == "AnyUser") {
        this.mess.error('???? t???n t???i email ho???c s??? ??i???n tho???i trong h??? th???ng!');
      }
      else {
        console.log(kq.error);
        this.mess.error('C?? l???i trong qu?? tr??nh ????ng k??!');
      }

    });
  }
  dang_nhap() {
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
    this.onClose();
  }
  focusout_event(event: any, name: string) {
    let sdt_xacnhan = this.DataForm.controls[name].setValue(event.target.value.trim());
  }
}

