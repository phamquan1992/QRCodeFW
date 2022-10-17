import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'qrcode-free', loadChildren: () => import('./components/nghiepvu/freeview/freeview.module').then(m => m.FreeviewModule) },
  { path: 'portal', loadChildren: () => import('./components/nghiepvu/proview/proview.module').then(m => m.ProviewModule) },
  { path: '', redirectTo: 'qrcode-free', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
