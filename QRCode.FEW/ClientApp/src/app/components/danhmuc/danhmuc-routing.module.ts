import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CauhinhhtComponent } from './cauhinhht/cauhinhht.component';
import { ChucvuComponent } from './chucvu/chucvu.component';
import { ChuyennganhComponent } from './chuyennganh/chuyennganh.component';
import { DanhmucComponent } from './danhmuc.component';
import { DiabanhcComponent } from './diabanhc/diabanhc.component';
import { DndonviComponent } from './dndonvi/dndonvi.component';
import { KhachhangComponent } from './khachhang/khachhang.component';
import { NhomqlyComponent } from './nhomqly/nhomqly.component';
import { PhongbanComponent } from './phongban/phongban.component';
import { PldichvuComponent } from './pldichvu/pldichvu.component';

const routes: Routes = [{
  path: '', component: DanhmucComponent,
  children: [
    { path: 'congty', component: DndonviComponent },
    { path: 'phongban', component: PhongbanComponent },
    { path: 'cauhinhht', component: CauhinhhtComponent },
    { path: 'chucvu', component: ChucvuComponent },
    { path: 'chuyennganh', component: ChuyennganhComponent },
    { path: 'diabanhc', component: DiabanhcComponent },
    { path: 'khachhang', component: KhachhangComponent },
    { path: 'nhomqly', component: NhomqlyComponent },
    { path: 'pldichvu', component: PldichvuComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhmucRoutingModule { }
