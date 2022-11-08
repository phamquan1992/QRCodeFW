import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { ViewsComponent } from './views.component';
import { ProductinfoComponent, SafeHtmlPipe } from './productinfo/productinfo.component';
import { EnterpriseComponent } from './enterprise/enterprise.component';


@NgModule({
  declarations: [
    ViewsComponent,
    ProductinfoComponent,
    EnterpriseComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule
  ]
})
export class ViewsModule { }
