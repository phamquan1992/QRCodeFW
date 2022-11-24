import { Component, Input, OnInit } from '@angular/core';
import { cauhoi, element_value } from 'src/app/models/cauhoi';

@Component({
  selector: 'app-viewcauhoi',
  templateUrl: './viewcauhoi.component.html',
  styleUrls: ['./viewcauhoi.component.css']
})
export class ViewcauhoiComponent implements OnInit {

  constructor() { }
  @Input()
  cauhoi_in: cauhoi = {
    name: '',
    visible_index: 0,
    noidung: 'Test',
    type: 'textarea',
    element: [],
    dapan: { key: '', value: '', mota: '' }
  };
  ngOnInit(): void {
  }
  select_item(it: element_value) {
    this.cauhoi_in.dapan = it;
  }
  maSelect(value: any) {
    let idex = this.cauhoi_in.element.findIndex(t => t.key == value);
    let item_slect = this.cauhoi_in.element[idex];
    this.cauhoi_in.dapan = item_slect;
  }
}
