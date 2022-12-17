import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { branch } from 'src/app/models/branch';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { mdareas } from 'src/app/models/mdareas';
import { mdmajors } from 'src/app/models/mdmajors';
import { InputControlService } from 'src/app/services/input-control.service';

@Component({
  selector: 'app-editmdareas',
  templateUrl: './editmdareas.component.html',
  styleUrls: ['./editmdareas.component.css']
})
export class EditmdareasComponent {
  constructor(public dialogRef: MatDialogRef<EditmdareasComponent>, @Inject(MAT_DIALOG_DATA) public data: mdareas, private controlSrv: InputControlService) {

  }
  arrinput: Inputbase<string>[] = [];
  form!: FormGroup;
  tieu_de = 'Cập nhật địa bàn hành chính';
  ngOnInit(): void {
    console.log(JSON.stringify(this.data));
    this.set_data();
    this.form = this.controlSrv.toFormGroup(this.arrinput as Inputbase<string>[]);
  }
  arr_status = [{ key: 'all', value: '-- Chọn trạng thái --' }, { key: '1', value: 'Kích hoạt' }, { key: '0', value: 'Huỷ kích hoạt' }];
  arr_level = [{ key: '1', value: 'Tỉnh' }, { key: '2', value: 'Huyện' }, { key: '3', value: 'Xã' }];
  set_data() {
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'code',
        label: 'Mã địa bàn',
        value: this.data.code,
        required: true,
        order: 1
      }),
      new InputText({
        key: 'name',
        label: 'Tên địa bàn',
        value: this.data.name,
        required: true,
        order: 2
      }),
      new InputDropdown({
        key: 'status',
        label: 'Trạng thái',
        options: this.arr_status,
        value: this.data.status == null ? 'all' : this.data.status?.toString(),
        order: 3
      }),
      new InputDropdown({
        key: 'levelion',
        label: 'Cấp địa bàn',
        options: this.arr_level,
        value: this.data.levelion == null ? 'all' : this.data.levelion?.toString(),
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
