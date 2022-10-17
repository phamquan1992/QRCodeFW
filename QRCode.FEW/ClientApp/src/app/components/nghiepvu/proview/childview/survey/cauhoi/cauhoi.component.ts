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
    dapan: ''
  };
  @Input() form!: FormGroup;
  ngOnInit(): void {
    console.log(JSON.stringify(this.cauhoi_in));
  }
  them_cautl() {
    let length_arr = this.cauhoi_in.element.length;
    this.cauhoi_in.element.push(length_arr.toString());
  }
  delete_cautl(i: string) {
    let id_del= this.cauhoi_in.element.findIndex(t=>t==i);
    this.cauhoi_in.element.splice(id_del, 1);
  }
}
