import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QlkhachhangRoutingModule } from './qlkhachhang-routing.module';
import { QlkhachhangComponent } from './qlkhachhang.component';
import { NhapdulieuComponent } from './nhapdulieu/nhapdulieu.component';
import { EditdataComponent } from './nhapdulieu/editdata/editdata.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    QlkhachhangComponent,
    NhapdulieuComponent,
    EditdataComponent
  ],
  imports: [
    CommonModule,
    QlkhachhangRoutingModule,
    MatTableModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatPaginatorModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class QlkhachhangModule { }
