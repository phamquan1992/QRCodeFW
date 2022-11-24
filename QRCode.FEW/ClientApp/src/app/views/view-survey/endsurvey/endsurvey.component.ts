import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-endsurvey',
  templateUrl: './endsurvey.component.html',
  styleUrls: ['./endsurvey.component.css']
})
export class EndsurveyComponent implements OnInit {

  constructor(private route: ActivatedRoute,) { }
  value_id='';
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.value_id = id == null ? '' : id.toString();
  }

}
