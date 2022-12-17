import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingpageComponent } from './loadingpage/loadingpage.component';
import { CustominputComponent } from './custominput/custominput.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterrowComponent } from './filterrow/filterrow.component';
import { AlertComponent } from './alert/alert.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    LoadingpageComponent,
    CustominputComponent,
    FilterrowComponent,
    AlertComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,MatAutocompleteModule,MatDialogModule
  ], exports: [
    LoadingpageComponent,
    CustominputComponent,
    FilterrowComponent,
    AlertComponent
  ]
})
export class SharedModule { }
