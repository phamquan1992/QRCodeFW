import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    ProductsComponent,
    AddproductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatTableModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    AngularEditorModule
  ]
})
export class ProductsModule { }
