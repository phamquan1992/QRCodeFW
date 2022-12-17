import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { branch, branch_edit } from 'src/app/models/branch';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { BranchService } from 'src/app/services/branch.service';
import { InputControlService } from 'src/app/services/input-control.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-editdonvi',
  templateUrl: './editdonvi.component.html',
  styleUrls: ['./editdonvi.component.css']
})
export class EditdonviComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<EditdonviComponent>, @Inject(MAT_DIALOG_DATA) public data: branch_edit, private controlSrv: InputControlService,
    private branchSrv: BranchService, private messageSrv: MessageService) {

  }
  arrinput: Inputbase<string>[] = [];
  form!: FormGroup;
  tieu_de = 'Cập nhật công ty';
  ngOnInit(): void {
    console.log(JSON.stringify(this.data));
    this.set_data();
    this.form = this.controlSrv.toFormGroup(this.arrinput as Inputbase<string>[]);
  }
  set_data() {
    let arr_status = [{ key: 'true', value: 'Kích hoạt' }, { key: 'false', value: 'Huỷ kích hoạt' }];
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'branchcode',
        label: 'Mã công ty',
        value: this.data.branch_obj.branchcode,
        required: true,
        order: 1
      }),
      new InputText({
        key: 'branchname',
        label: 'Tên công ty',
        value: this.data.branch_obj.branchname,
        required: true,
        order: 2
      }),
      new InputDropdown({
        key: 'branchid',
        label: 'Công ty cha',
        options: this.data.list_branch,
        value: this.data.branch_obj.branchid !== null ? this.data.branch_obj.branchid.toString() : 'S',
        order: 3
      }),
      new InputText({
        key: 'description',
        label: 'Mô tả',
        value: this.data.branch_obj.description,
        order: 4
      }),
      new InputText({
        key: 'address',
        label: 'Địa chỉ',
        value: this.data.branch_obj.address,
        order: 5
      }),
      new InputDropdown({
        key: 'isactive',
        label: 'Trạng thái',
        options: arr_status,
        value: this.data.branch_obj.isactive.toString(),
        order: 3
      }),
      new InputText({
        key: 'id',
        label: '',
        value: this.data.branch_obj.id.toString(),
        type: 'hidden',
        order: 7
      }),
    ];
    this.arrinput = dataIP;
  }
  onSubmit() {
    let data_edit = JSON.parse(JSON.stringify(this.form.value));
    console.log(data_edit);
    let value_save: branch = new branch(data_edit);
    value_save.id = Number(data_edit['id']);
    if (data_edit.isactive !== '' && data_edit.isactive !== undefined) {
      value_save.isactive = data_edit['isactive']['key'].toString() === 'true';
    }
    if (data_edit.branchid !== '' && data_edit.branchid !== undefined) {
      value_save.branchid = Number(data_edit['branchid']['key']);
    }
    console.log(value_save);
    let thongbao = 'Có lỗi trong quá trình lưu dữ liệu!';
    if (value_save.id === 0) {
      this.branchSrv.add_branch(value_save).subscribe(t => {
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
      this.branchSrv.update_branch(value_save).subscribe(t => {
        let kq = t.result;
        if (kq !== 'Success') {
          if (kq === 'ErrorUpdate')
            thongbao = 'Cập nhật dữ liệu thất bại!';
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
