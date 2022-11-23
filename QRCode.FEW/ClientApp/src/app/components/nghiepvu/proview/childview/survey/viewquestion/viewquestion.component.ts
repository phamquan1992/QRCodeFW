import { Component, Input, OnInit } from '@angular/core';
import { cauhoi } from 'src/app/models/cauhoi';

@Component({
  selector: 'app-viewquestion',
  templateUrl: './viewquestion.component.html',
  styleUrls: ['./viewquestion.component.css']
})
export class ViewquestionComponent implements OnInit {

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

}
