import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanactiveGuard } from 'src/app/securities/canactive.guard';
import { CompaniesComponent } from './childview/companies/companies.component';
import { DashboardComponent } from './childview/dashboard/dashboard.component';
import { GencodeComponent } from './childview/gencode/gencode.component';
import { HisscanComponent } from './childview/gencode/hisscan/hisscan.component';
import { PaymentComponent } from './childview/payment/payment.component';
import { ProviewComponent } from './proview.component';

const routes: Routes = [
  {
    path: '', component: ProviewComponent, children: [
      { path: 'products', canActivate: [CanactiveGuard], loadChildren: () => import('./childview/products/products.module').then(m => m.ProductsModule) },
      { path: 'survey', canActivate: [CanactiveGuard], loadChildren: () => import('./childview/survey/survey.module').then(m => m.SurveyModule) },
      { path: 'companies', canActivate: [CanactiveGuard], loadChildren: () => import('./childview/companies/companies.module').then(m => m.CompaniesModule) },
      { path: 'dashboard', canActivate: [CanactiveGuard], component: DashboardComponent },///:id/:id2
      { path: 'gencode', canActivate: [CanactiveGuard], component: GencodeComponent },
      { path: 'hisqr/:dataid', canActivate: [CanactiveGuard], component: HisscanComponent },
      { path: 'payment', canActivate: [CanactiveGuard], component: PaymentComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProviewRoutingModule { }
