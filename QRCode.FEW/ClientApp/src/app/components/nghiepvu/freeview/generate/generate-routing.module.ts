import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateComponent } from './generate.component';
import { LinkqrcodeComponent } from './linkqrcode/linkqrcode.component';
import { SocialqrcodeComponent } from './socialqrcode/socialqrcode.component';
import { VanbanComponent } from './vanban/vanban.component';

const routes: Routes = [{
  path: '', component: GenerateComponent, children: [
    { path: 'van-ban', component: VanbanComponent },
    { path: 'link', component: LinkqrcodeComponent },
    { path: 'social', component: SocialqrcodeComponent },
    { path: '', redirectTo: 'van-ban', pathMatch: 'full' }
    
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateRoutingModule { }
