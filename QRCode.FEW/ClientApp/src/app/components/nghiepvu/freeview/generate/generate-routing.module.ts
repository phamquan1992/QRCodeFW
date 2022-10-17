import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateComponent } from './generate.component';
import { VanbanComponent } from './vanban/vanban.component';

const routes: Routes = [{
  path: '', component: GenerateComponent, children: [
    { path: 'van-ban', component: VanbanComponent },
    { path: '', redirectTo: 'van-ban', pathMatch: 'full' }
    
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateRoutingModule { }
