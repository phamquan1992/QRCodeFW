import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanactiveGuard } from 'src/app/securities/canactive.guard';

const routes: Routes = [
  { path: 'qrcode-free', loadChildren: () => import('./components/nghiepvu/freeview/freeview.module').then(m => m.FreeviewModule) },
  { path: 'portal',canActivate:[CanactiveGuard], loadChildren: () => import('./components/nghiepvu/proview/proview.module').then(m => m.ProviewModule) },
  { path: '', redirectTo: 'qrcode-free', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[CanactiveGuard]
})
export class AppRoutingModule { }
