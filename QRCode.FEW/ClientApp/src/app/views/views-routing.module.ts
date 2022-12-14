import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangepassComponent } from './changepass/changepass.component';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { ProductinfoComponent } from './productinfo/productinfo.component';
import { EndsurveyComponent } from './view-survey/endsurvey/endsurvey.component';
import { ViewSurveyComponent } from './view-survey/view-survey.component';
import { ViewsComponent } from './views.component';

const routes: Routes = [{
  path: '', component: ViewsComponent, children: [
    { path: 'product/:id/:id2', component: ProductinfoComponent },
    { path: 'enterprise/:id', component: EnterpriseComponent },
    { path: 'changepass/:email', component: ChangepassComponent },
    { path: 'survey/:id', component: ViewSurveyComponent },
    { path: 'end/:id', component: EndsurveyComponent },
    { path: '', redirectTo: 'product', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
