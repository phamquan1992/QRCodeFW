import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey.component';
import { CauhoiComponent } from './cauhoi/cauhoi.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewquestionComponent } from './viewquestion/viewquestion.component';
import { ShowquestionComponent } from './showquestion/showquestion.component';


@NgModule({
  declarations: [
    SurveyComponent,
    CauhoiComponent,
    ViewquestionComponent,
    ShowquestionComponent
  ],
  imports: [
    CommonModule,
    SurveyRoutingModule,
    ReactiveFormsModule
  ]
})
export class SurveyModule { }
