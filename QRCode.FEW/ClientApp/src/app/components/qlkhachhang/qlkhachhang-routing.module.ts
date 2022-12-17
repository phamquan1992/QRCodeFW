import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NhapdulieuComponent } from './nhapdulieu/nhapdulieu.component';
import { QlkhachhangComponent } from './qlkhachhang.component';

const routes: Routes = [{
  path: '', component: QlkhachhangComponent, children: [
    { path: 'nhapdulieu', component: NhapdulieuComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QlkhachhangRoutingModule { }
