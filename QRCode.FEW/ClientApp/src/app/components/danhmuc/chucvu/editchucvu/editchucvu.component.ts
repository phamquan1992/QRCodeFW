import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { qc_title } from 'src/app/models/qc_title';
import { InputControlService } from 'src/app/services/input-control.service';

@Component({
  selector: 'app-editchucvu',
  templateUrl: './editchucvu.component.html',
  styleUrls: ['./editchucvu.component.css']
})
export class EditchucvuComponent {
  constructor(public dialogRef: MatDialogRef<EditchucvuComponent>, @Inject(MAT_DIALOG_DATA) public data: qc_title, private controlSrv: InputControlService){

  }
  arrinput: Inputbase<string>[] = [];
  form!: FormGroup;
  tieu_de = 'Cập nhật chức vụ';
  ngOnInit(): void {
    console.log(JSON.stringify(this.data));
    this.set_data();
    this.form = this.controlSrv.toFormGroup(this.arrinput as Inputbase<string>[]);
  }
  set_data() {
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'titlecode',
        label: 'Mã chức vụ',
        value: this.data.titlecode,
        required: true,
        order: 1
      }),
      new InputText({
        key: 'titlename',
        label: 'Tên chức vụ',
        value: this.data.titlename,
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
    // console.log(data_edit);
    let value_save: qc_title = {
      id: Number(data_edit['id']),
      titlecode: data_edit['titlecode'],
      titlename: data_edit['titlename'],
      description: data_edit['description']
    };
    console.log(value_save);
  }
  onClose(gt: string) {
    this.dialogRef.close(gt);
  }
}
