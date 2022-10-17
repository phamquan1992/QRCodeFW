import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { cauhoi } from 'src/app/models/cauhoi';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  arr_cauhoi: cauhoi[] = [];
  DataForm: FormGroup = new FormGroup({});
  constructor() {
    this.arr_cauhoi = [
      {
        noidung: 'Câu hỏi 1',
        dapan: '',
        element: ['A', 'B', 'C', 'D'],
        name: '',
        type: 'luachon',
        visible_index: 1
      },
      {
        noidung: 'Câu hỏi 2',
        dapan: '',
        element: ['Hiển thị'],
        name: '',
        type: 'text',
        visible_index: 2
      },
      {
        noidung: 'Câu hỏi 3',
        dapan: '',
        element: ['AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'],
        name: '',
        type: 'textarea',
        visible_index: 3
      }, 
      {
        noidung: 'Câu hỏi 4',
        dapan: '',
        element: ['Hiển thị'],
        name: '',
        type: 'dropdown',
        visible_index: 4
      },
      {
        noidung: 'Câu hỏi 5',
        dapan: '',
        element: ['','','',''],
        name: '',
        type: 'images',
        visible_index: 5
      },
    ];
  }

  ngOnInit(): void {
  }
  them_cauhoi() {
    let max_val = this.arr_cauhoi.length == 0 ? 1 : Math.max(...this.arr_cauhoi.map(t => t.visible_index)) + 1;
    let tmpIit = {
      noidung: '',
      dapan: '',
      element: [''],
      name: '',
      type: 'text',
      visible_index: max_val
    };
    this.arr_cauhoi.push(tmpIit);
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
}
