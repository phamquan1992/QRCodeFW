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
  name_select='';
  arr_thongtinkhac = [
    { name: 'dynamic_1', value: 'Số công bố chất lượng' }, { name: 'dynamic_2', value: 'Số công bố An toàn thực phẩm' }, { name: 'dynamic_3', value: 'Số công bố lưu hành' },
    { name: 'dynamic_4', value: 'Tiêu chuẩn áp dụng' }, { name: 'dynamic_5', value: 'Quy chuẩn áp dụng' }, { name: 'dynamic_6', value: 'Ngày gieo trồng' },
    { name: 'dynamic_7', value: 'Ngày thu hoạch' }, { name: 'dynamic_8', value: 'Ngày đóng gói' }, { name: 'dynamic_9', value: 'Ngày đưa giống vào nuôi' },
    { name: 'dynamic_10', value: 'Ngày xuất kho/xuất bán' }, { name: 'dynamic_11', value: 'Lô sản xuất' }, { name: 'dynamic_12', value: 'Ngày bắt đầu SX lô hàng' },
    { name: 'dynamic_13', value: 'Ngày hoàn thành lô SX' }];

  add_input(_value: any) {
    this.dynamic_num = this.dynamic_num + 1;
    let tmp = {
      title: this.tieude_val,
      name: this.name_select,
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
    this.name_select=gt.name;
    this.tieude_val = gt.value;
  }
}
