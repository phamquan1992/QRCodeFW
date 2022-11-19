import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { cauhoi } from 'src/app/models/cauhoi';

@Component({
  selector: 'app-cauhoi',
  templateUrl: './cauhoi.component.html',
  styleUrls: ['./cauhoi.component.css']
})
export class CauhoiComponent implements OnInit {

  constructor() { }
  @Input() cauhoi_in: cauhoi = {
    name: '',
    visible_index: 0,
    noidung: '',
    type: '',
    element: [],
    dapan: { key: '', value: '' }
  };
  iscols = false;
  @Input() form!: FormGroup;
  ngOnInit(): void {
    this.iscols=true;
  }
  them_cautl() {
    let length_arr = this.cauhoi_in.element.length;
    let tmp = {
      key: 'dapan' + length_arr,
      value: ''
    };
    this.cauhoi_in.element.push(tmp);
  }
  delete_cautl(i: string) {
    let id_del = this.cauhoi_in.element.findIndex(t => t.key == i);
    this.cauhoi_in.element.splice(id_del, 1);
  }
  showHidediv() {
    this.iscols = !this.iscols;
  }
}
