import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-surveylist',
  templateUrl: './surveylist.component.html',
  styleUrls: ['./surveylist.component.css']
})
export class SurveylistComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  add_action() {
    this.router.navigate(['portal/survey/add']);
  }
}
