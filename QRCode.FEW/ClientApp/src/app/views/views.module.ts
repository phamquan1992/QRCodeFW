import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { ViewsComponent } from './views.component';
import { ProductinfoComponent, SafeHtmlPipe } from './productinfo/productinfo.component';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { ChangepassComponent } from './changepass/changepass.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ViewSurveyComponent } from './view-survey/view-survey.component';
import { ViewcauhoiComponent } from './view-survey/viewcauhoi/viewcauhoi.component';
import { MatSelectModule } from '@angular/material/select';
import { EndsurveyComponent } from './view-survey/endsurvey/endsurvey.component';

@NgModule({
  declarations: [
    ViewsComponent,
    ProductinfoComponent,
    EnterpriseComponent,
    SafeHtmlPipe,
    ChangepassComponent,
    ViewSurveyComponent,
    ViewcauhoiComponent,
    EndsurveyComponent,
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    ReactiveFormsModule, FormsModule,
    SharedModule,MatSelectModule
  ]
})
export class ViewsModule { }
