import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { cauhoi } from 'src/app/models/cauhoi';

@Component({
  selector: 'app-addsurvey',
  templateUrl: './addsurvey.component.html',
  styleUrls: ['./addsurvey.component.css']
})
export class AddsurveyComponent implements OnInit {
  arr_cauhoi: cauhoi[] = [];
  DataForm: FormGroup = new FormGroup({});
  constructor() { 
    this.arr_cauhoi = [

    ];
  }

  ngOnInit(): void {
  }
  show_menu = false;
  them_cauhoi(type_ip: string) {
    let max_val = this.arr_cauhoi.length == 0 ? 1 : Math.max(...this.arr_cauhoi.map(t => t.visible_index)) + 1;
    let tmpIit = {
      noidung: '',
      dapan: { key: '', value: '' },
      element: [{ key: 'dapan1', value: '' }],
      name: '',
      type: type_ip,
      visible_index: max_val
    };
    if (type_ip == 'dropdown' || type_ip == 'luachon' || type_ip == 'images') {
      tmpIit.element.push({ key: 'dapan2', value: '' });
    }
    this.arr_cauhoi.push(tmpIit);
    this.show_menu = false;
  }
  xoa_cauhoi(ch: cauhoi) {

    this.update_index(ch.visible_index);

  }
  update_index(vitri: number) {
    let index_last = this.arr_cauhoi.length;
    let item_next = vitri + 1;
    let idex_temp = vitri;
    while (item_next <= index_last) {
      let cur_index = this.arr_cauhoi.findIndex(t => t.visible_index == item_next);
      if (cur_index > -1) {
        this.arr_cauhoi[cur_index].visible_index = idex_temp;
        idex_temp = idex_temp + 1;
      }
      item_next = item_next + 1;
    }
    let index_del = this.arr_cauhoi.findIndex(t => t.visible_index == vitri);
    if (index_del > -1)
      this.arr_cauhoi.splice(index_del, 1);
  }
  move_index(vt: number, act: string) {
    let cur_id = this.arr_cauhoi.findIndex(t => t.visible_index == vt);
    if (act == 'up') {
      if (vt != 1) {
        this.arr_cauhoi[cur_id].visible_index = vt - 1;
        let cur_pre = this.arr_cauhoi.findIndex(t => t.visible_index == vt - 1);
        this.arr_cauhoi[cur_pre].visible_index = vt;
      }
    }
    if (act == 'down') {
      if (vt != this.arr_cauhoi.length) {
        let id_tem = vt + 1
        let cur_next = this.arr_cauhoi.findIndex(t => t.visible_index == id_tem);
        this.arr_cauhoi[cur_id].visible_index = id_tem;
        this.arr_cauhoi[cur_next].visible_index = vt;
      }
    }
    this.arr_cauhoi = this.arr_cauhoi.sort((a, b) => (a.visible_index > b.visible_index) ? 1 : -1);
  }
}
