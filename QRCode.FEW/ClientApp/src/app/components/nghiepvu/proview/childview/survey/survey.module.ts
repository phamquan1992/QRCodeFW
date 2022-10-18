import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyComponent } from './survey.component';
import { CauhoiComponent } from './cauhoi/cauhoi.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewquestionComponent } from './viewquestion/viewquestion.component';
import { ShowquestionComponent } from './showquestion/showquestion.component';
import { AddsurveyComponent } from './addsurvey/addsurvey.component';
import { SurveylistComponent } from './surveylist/surveylist.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    SurveyComponent,
    CauhoiComponent,
    ViewquestionComponent,
    ShowquestionComponent,
    AddsurveyComponent,
    SurveylistComponent,
  ],
  imports: [
    CommonModule,
    SurveyRoutingModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class SurveyModule { }
