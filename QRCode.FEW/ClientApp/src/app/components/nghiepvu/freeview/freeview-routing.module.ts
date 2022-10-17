import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DichvuComponent } from './dichvu/dichvu.component';
import { FreeviewComponent } from './freeview.component';

const routes: Routes = [{
  path: '', component: FreeviewComponent, children: [
    {
      path: 'dich-vu', component: DichvuComponent
    },
    { path: 'generate', loadChildren: () => import('./generate/generate.module').then(m => m.GenerateModule) },
    { path: '', redirectTo: 'generate', pathMatch: 'full' }
  ]
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreeviewRoutingModule { }
