import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { mail_model } from 'src/app/models/optioncs';
import { DataService } from 'src/app/services/data.service';
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
  constructor(public dialogRef: MatDialogRef<SigninComponent>, private dataSrc: DataService) { }

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
    console.log(this.DataForm.value);
    let mail_objet: mail_model = {
      email: this.DataForm.controls['email'].value,
      sdt: this.DataForm.controls['sdt'].value,
      password: this.DataForm.controls['password'].value,
    };
    //this.dataSrc.post('',mail_objet);
  }
}

