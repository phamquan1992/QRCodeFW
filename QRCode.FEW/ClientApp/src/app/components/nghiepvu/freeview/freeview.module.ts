import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreeviewRoutingModule } from './freeview-routing.module';
import { FreeviewComponent } from './freeview.component';
import { DichvuComponent } from './dichvu/dichvu.component';
import { LoginComponent } from '../../share/login/login.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FreeviewComponent,
    DichvuComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FreeviewRoutingModule,
    FormsModule
  ]
})
export class FreeviewModule { }
