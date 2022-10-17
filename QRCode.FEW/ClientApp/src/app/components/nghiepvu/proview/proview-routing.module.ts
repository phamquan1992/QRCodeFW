import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './childview/companies/companies.component';
import { DashboardComponent } from './childview/dashboard/dashboard.component';
import { ProviewComponent } from './proview.component';

const routes: Routes = [
  {
    path: '', component: ProviewComponent, children: [
      { path: 'products', loadChildren: () => import('./childview/products/products.module').then(m => m.ProductsModule) },
      { path: 'survey', loadChildren: () => import('./childview/survey/survey.module').then(m => m.SurveyModule) },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'companies', component: CompaniesComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviewRoutingModule { }
