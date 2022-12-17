import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { branch } from 'src/app/models/branch';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { mdmajors } from 'src/app/models/mdmajors';
import { InputControlService } from 'src/app/services/input-control.service';

@Component({
  selector: 'app-editmdmajors',
  templateUrl: './editmdmajors.component.html',
  styleUrls: ['./editmdmajors.component.css']
})
export class EditmdmajorsComponent {
  constructor(public dialogRef: MatDialogRef<EditmdmajorsComponent>, @Inject(MAT_DIALOG_DATA) public data: mdmajors, private controlSrv: InputControlService) {

  }
  arrinput: Inputbase<string>[] = [];
  form!: FormGroup;
  tieu_de = 'Cập nhật lĩnh vực chuyên ngành';
  ngOnInit(): void {
    console.log(JSON.stringify(this.data));
    this.set_data();
    this.form = this.controlSrv.toFormGroup(this.arrinput as Inputbase<string>[]);
  }
  set_data() {
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'majorscode',
        label: 'Mã chuyên ngành',
        value: this.data.majorscode,
        required: true,
        order: 1
      }),
      new InputText({
        key: 'majorsname',
        label: 'Tên chuyên ngành',
        value: this.data.majorsname,
        required: true,
        order: 2
      }),
      new InputText({
        key: 'description',
        label: 'Mô tả',
        value: this.data.description,
        order: 3
      }),
      new InputText({
        key: 'id',
        label: '',
        value: this.data.id.toString(),
        type: 'hidden',
        order: 4
      }),
    ];
    this.arrinput = dataIP;
  }
  onSubmit() {
    let data_edit = JSON.parse(JSON.stringify(this.form.value));
    console.log(data_edit);   
  }
  onClose(gt: string) {
    this.dialogRef.close(gt);
  }
}
