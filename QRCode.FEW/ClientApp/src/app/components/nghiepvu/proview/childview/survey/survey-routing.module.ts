import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddsurveyComponent } from './addsurvey/addsurvey.component';
import { SurveyComponent } from './survey.component';
import { SurveylistComponent } from './surveylist/surveylist.component';

const routes: Routes = [{
  path: '', component: SurveyComponent,
  children: [
    { path: 'list', component: SurveylistComponent },
    { path: 'add', component: AddsurveyComponent },
    { path: '', redirectTo: 'list', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
