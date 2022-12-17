import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { department, department_edit } from 'src/app/models/department';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { BranchService } from 'src/app/services/branch.service';
import { DepartmentService } from 'src/app/services/department.service';
import { InputControlService } from 'src/app/services/input-control.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-editdepart',
  templateUrl: './editdepart.component.html',
  styleUrls: ['./editdepart.component.css']
})
export class EditdepartComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<EditdepartComponent>, @Inject(MAT_DIALOG_DATA) public data: department_edit, private controlSrv: InputControlService,
    private branchSrv: BranchService, private messageSrv: MessageService, private departSrv: DepartmentService) { }
  arrinput: Inputbase<string>[] = [];
  form!: FormGroup;
  tieu_de = 'Cập nhật phòng ban';
  ngOnInit(): void {
    console.log(JSON.stringify(this.data));
    this.set_data();
    this.form = this.controlSrv.toFormGroup(this.arrinput as Inputbase<string>[]);
  }
  set_data() {
    let arr_status = [{ key: 'true', value: 'Kích hoạt' }, { key: 'false', value: 'Huỷ kích hoạt' }];
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'departmentcode',
        label: 'Mã phòng ban',
        value: this.data.obj_edit.departmentcode,
        required: true,
        order: 1
      }),
      new InputText({
        key: 'departmentname',
        label: 'Tên phòng ban',
        value: this.data.obj_edit.departmentname,
        required: true,
        order: 2
      }),
      new InputDropdown({
        key: 'branchid',
        label: 'Công ty',
        options: this.data.list_branch,
        value: this.data.obj_edit.branchid !== null && this.data.obj_edit.branchid !== 0 ? this.data.obj_edit.branchid.toString() : '',
        order: 3
      }),
      new InputText({
        key: 'description',
        label: 'Mô tả',
        value: this.data.obj_edit.description,
        order: 4
      }),
      new InputDropdown({
        key: 'isactive',
        label: 'Trạng thái',
        options: arr_status,
        value: this.data.obj_edit === undefined ? '' : this.data.obj_edit.isactive?.toString(),
        order: 3
      }),
      new InputText({
        key: 'id',
        label: '',
        value: this.data.obj_edit.id.toString(),
        type: 'hidden',
        order: 7
      }),
    ];
    this.arrinput = dataIP;
  }
  onSubmit() {
    let data_edit = JSON.parse(JSON.stringify(this.form.value));
    console.log(data_edit);
    let value_save: department = {
      id: 0,
      branchid: 0,
      departmentcode: '',
      departmentname: '',
      description: ''
    };
    value_save.id = Number(data_edit['id']);
    value_save.departmentcode = data_edit['departmentcode'];
    value_save.departmentname = data_edit['departmentname'];
    value_save.description = data_edit['description'];
    if (data_edit['isactive'] !== '' && data_edit['isactive'] !== undefined) {
      value_save.isactive = data_edit['isactive']['key'].toString() === 'true';
    }
    if (data_edit['branchid'] !== '' && data_edit['branchid'] !== undefined) {
      value_save.branchid = Number(data_edit['branchid']['key']);
    }
    console.log(value_save);
    let thongbao = 'Có lỗi trong quá trình lưu dữ liệu!';
    if (value_save.id === 0) {
      this.departSrv.add_department(value_save).subscribe(t => {
        let kq = t.result;
        if (kq !== 'Success') {
          if (kq === 'AnyObj')
            thongbao = 'Đã tồn tại mã công ty này!';
          if (kq === 'ErrorAdd')
            thongbao = 'Đã tồn tại mã công ty này!';
          if (kq === 'Error')
            thongbao = 'Xảy ra lỗi không xác định!';
          this.messageSrv.error(thongbao);
        } else {
          this.messageSrv.success('Bạn đã thực hiện thành công');
          this.dialogRef.close('Success');
        }
      });
    } else {
      this.departSrv.update_department(value_save).subscribe(t => {
        let kq = t.result;
        if (kq !== 'Success') {
          if (kq === 'Error')
            thongbao = 'Đã tồn tại mã công ty này!';
          if (kq === 'ErrorUpdate')
            thongbao = 'Đã tồn tại mã công ty này!';
          if (kq === 'Error')
            thongbao = 'Xảy ra lỗi không xác định!';
          this.messageSrv.error(thongbao);
        } else {
          this.messageSrv.success('Bạn đã thực hiện thành công');
          this.dialogRef.close('Success');
        }
      });
    }

  }
  onClose(gt: string) {
    this.dialogRef.close(gt);
  }
}
