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
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
export const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MM YYYY',
  },
};
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
  ],
  providers:[
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ]
})
export class SurveyModule { }
