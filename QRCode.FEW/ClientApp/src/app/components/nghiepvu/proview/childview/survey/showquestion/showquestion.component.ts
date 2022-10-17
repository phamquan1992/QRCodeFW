import { Component, Input, OnInit } from '@angular/core';
import { cauhoi } from 'src/app/models/cauhoi';

@Component({
  selector: 'app-showquestion',
  templateUrl: './showquestion.component.html',
  styleUrls: ['./showquestion.component.css']
})
export class ShowquestionComponent implements OnInit {

  constructor() { }
  @Input() array_cauhoi: cauhoi[] = [];
  ngOnInit(): void {
  }

}
