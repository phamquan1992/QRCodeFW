import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { ProductinfoComponent } from './productinfo/productinfo.component';
import { ViewsComponent } from './views.component';

const routes: Routes = [{
  path: '', component: ViewsComponent, children: [
    { path: 'product', component: ProductinfoComponent },
    { path: 'enterprise', component: EnterpriseComponent },
    { path: '', redirectTo: 'product', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
