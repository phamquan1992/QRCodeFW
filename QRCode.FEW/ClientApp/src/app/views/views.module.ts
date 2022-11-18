import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { ViewsComponent } from './views.component';
import { ProductinfoComponent, SafeHtmlPipe } from './productinfo/productinfo.component';
import { EnterpriseComponent } from './enterprise/enterprise.component';
import { ChangepassComponent } from './changepass/changepass.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ViewsComponent,
    ProductinfoComponent,
    EnterpriseComponent,
    SafeHtmlPipe,
    ChangepassComponent
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ViewsModule { }
