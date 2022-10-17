import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ProductsComponent } from './products.component';

const routes: Routes = [{
  path: '', component: ProductsComponent,
},
{ path: 'add', component: AddproductComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
