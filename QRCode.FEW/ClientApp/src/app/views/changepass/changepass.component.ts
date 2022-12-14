import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { user_reset } from 'src/app/models/product';
import { MessageService } from 'src/app/services/message.service';
import { ViewdataService } from 'src/app/services/viewdata.service';

export const passwordMatchingValidatiorchange: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password_new');
  const confirmPassword = control.get('confirm_password');
  let gt = password?.value === confirmPassword?.value ? null : { notmatched: true };
  return gt;
};

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {

  constructor(private route: ActivatedRoute, private viewService: ViewdataService, private messSrc: MessageService, private router: Router) { }
  DataForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password_old: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password_new: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirm_password: new FormControl('', Validators.required),
  }, { validators: passwordMatchingValidatiorchange });
  ngOnInit(): void {
    let email = this.route.snapshot.paramMap.get('email');
    this.DataForm.controls['email'].setValue(email);
  }
  onSubmit() {
    let email_tmp = this.DataForm.controls['email'].value;
    let password_old_tmp = this.DataForm.controls['password_old'].value;
    let password_old_new = this.DataForm.controls['password_new'].value;
    let user_tmp: user_reset = {
      email: email_tmp,
      password_old: password_old_tmp,
      password: password_old_new
    };
    this.viewService.change_password(user_tmp).subscribe(
      t => {
        if (t.result == 'Success') {
          this.messSrc.success("Thay ?????i m???t kh???u th??nh c??ng");
          this.router.navigate(['/qrcode-free']);
        }
        else if (t.result == 'NullUser') {
          this.messSrc.error("M???t kh???u kh??ng ????ng.\r\n Vui l??ng nh???p ????ng m???t kh???u trong email thay ?????i m???t kh???u");
        }
        else if (t.result == 'UpdateError') {
          this.messSrc.error("C???p nh???t th??ng tin t??i kho???n th???t b???i\r\n"+"Vui l??ng li??n h??? v???i qu???n tr???");
        }
        else {
          this.messSrc.error("C?? l???i trong qu?? tr??nh x??? l?? d??? li???u");
        }
      }
    );
  }
}
