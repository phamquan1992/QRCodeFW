import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreeviewRoutingModule } from './freeview-routing.module';
import { FreeviewComponent } from './freeview.component';
import { DichvuComponent } from './dichvu/dichvu.component';
import { LoginComponent } from '../../share/login/login.component';
import { FormsModule } from '@angular/forms';
import { DangkyComponent } from './dichvu/dangky/dangky.component';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    FreeviewComponent,
    DichvuComponent,
    LoginComponent,
    DangkyComponent,
  ],
  imports: [
    CommonModule,
    FreeviewRoutingModule,
    FormsModule,
    MatSelectModule
  ]
})
export class FreeviewModule { }
