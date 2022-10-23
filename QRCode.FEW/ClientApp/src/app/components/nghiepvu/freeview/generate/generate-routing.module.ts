import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateComponent } from './generate.component';
import { LinkqrcodeComponent } from './linkqrcode/linkqrcode.component';
import { ShopqrcodeComponent } from './shopqrcode/shopqrcode.component';
import { SocialqrcodeComponent } from './socialqrcode/socialqrcode.component';
import { VanbanComponent } from './vanban/vanban.component';

const routes: Routes = [{
  path: '', component: GenerateComponent, children: [
    { path: 'van-ban', component: VanbanComponent },
    { path: 'link', component: LinkqrcodeComponent },
    { path: 'social', component: SocialqrcodeComponent },
    { path: 'shop', component: ShopqrcodeComponent },
    { path: '', redirectTo: 'link', pathMatch: 'full' }

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateRoutingModule { }
