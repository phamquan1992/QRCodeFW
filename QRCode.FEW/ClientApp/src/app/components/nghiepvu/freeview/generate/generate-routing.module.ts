import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanactiveGuard } from 'src/app/securities/canactive.guard';
import { CompanyviewComponent } from './companyview/companyview.component';
import { GenerateComponent } from './generate.component';
import { LinkqrcodeComponent } from './linkqrcode/linkqrcode.component';
import { ProductviewComponent } from './productview/productview.component';
import { ShopqrcodeComponent } from './shopqrcode/shopqrcode.component';
import { SocialqrcodeComponent } from './socialqrcode/socialqrcode.component';
import { SurveyviewComponent } from './surveyview/surveyview.component';
import { VanbanComponent } from './vanban/vanban.component';

const routes: Routes = [{
  path: '', component: GenerateComponent, children: [
    { path: 'van-ban', component: VanbanComponent },
    { path: 'link', component: LinkqrcodeComponent },
    { path: 'social', component: SocialqrcodeComponent },
    { path: 'shop', component: ShopqrcodeComponent },
    { path: 'product', canActivate: [CanactiveGuard], component: ProductviewComponent },
    { path: 'survey', canActivate: [CanactiveGuard], component: SurveyviewComponent },
    { path: 'ojbect', canActivate: [CanactiveGuard], component: CompanyviewComponent },
    { path: '', redirectTo: 'link', pathMatch: 'full' }

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenerateRoutingModule { }
