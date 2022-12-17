import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [{ path: 'danhmuc', loadChildren: () => import('./components/danhmuc/danhmuc.module').then(m => m.DanhmucModule) },
{ path: 'home', component: HomeComponent },
{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'qlkhachhang', loadChildren: () => import('./components/qlkhachhang/qlkhachhang.module').then(m => m.QlkhachhangModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
