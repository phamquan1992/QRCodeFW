import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcompanyComponent } from './addcompany/addcompany.component';
import { CompaniesComponent } from './companies.component';
import { CompanylistComponent } from './companylist/companylist.component';

const routes: Routes = [
  {
    path: '', component: CompaniesComponent, children: [
      { path: 'list', component: CompanylistComponent },
      { path: 'add', component: AddcompanyComponent },
      { path: 'edit/:id', component: AddcompanyComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
