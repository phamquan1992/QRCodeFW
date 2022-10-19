import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
export interface survey {
  name: string;
  status: boolean;
  userdate: string;
}


@Component({
  selector: 'app-surveylist',
  templateUrl: './surveylist.component.html',
  styleUrls: ['./surveylist.component.css']
})
export class SurveylistComponent implements OnInit {

  constructor(private router: Router) { }
  data_survey: survey[] = [
    {
      name: 'Khảo sát 1',
      status: false,
      userdate: '10/10/2022'
    },
    {
      name: 'Khảo sát 2',
      status: false,
      userdate: '30/10/2022'
    },
    {
      name: 'Khảo sát 3',
      status: true,
      userdate: '01/12/2022'
    },
  ];
  dataSource = new MatTableDataSource<survey>(this.data_survey);
  selection = new SelectionModel<survey>(true, []);
  displayedColumns = ['select', 'name', 'status', 'userdate', 'action'];
  ngOnInit(): void {
  }
  add_action() {
    this.router.navigate(['portal/survey/add']);
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
