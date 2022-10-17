import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Inputcustom } from 'src/app/models/Inputcustom';

@Component({
  selector: 'app-addinput',
  templateUrl: './addinput.component.html',
  styleUrls: ['./addinput.component.css']
})
export class AddinputComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() out_data = new EventEmitter<Inputcustom>();
  @Output() out_exist = new EventEmitter<boolean>();
  @Output() out_delete = new EventEmitter<string>();
  @Input() dynamic_num = 0;
  @Input() type_input = 'text';
  tieude_val = '';
  tieude_val_close = '';
  arr_thongtinkhac = ['Số công bố chất lượng', 'Số công bố An toàn thực phẩm', 'Số công bố lưu hành',
    'Tiêu chuẩn áp dụng', 'Quy chuẩn áp dụng', 'Ngày gieo trồng', 'Ngày thu hoạch', 'Ngày đóng gói', 'Ngày đưa giống vào nuôi',
    'Ngày xuất kho/xuất bán', 'Lô sản xuất', 'Ngày bắt đầu SX lô hàng', 'Ngày hoàn thành lô SX'];

  add_input(_value: any) {
    this.dynamic_num = this.dynamic_num + 1;
    let tmp = {
      Title: this.tieude_val,
      name: 'txt_dynamic_' + this.dynamic_num,
      is_require: true,
      is_visible: true,
      type: 'text',
      nhom: 'khac',
      is_delete: true,
      value_ip: _value.value
    };
    this.out_data.emit(tmp);
    _value.value = '';
    this.tieude_val_close = '';
  }
  exit_form() {
    this.out_exist.emit(false);
  }
  delete_input(gt: string) {
    this.out_delete.emit(gt);
  }
  get_thongtinkhac(gt: any) {
    this.tieude_val = gt;
  }
}
