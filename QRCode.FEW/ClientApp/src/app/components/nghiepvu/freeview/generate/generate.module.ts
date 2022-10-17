import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerateRoutingModule } from './generate-routing.module';
import { GenerateComponent } from './generate.component';
import { VanbanComponent } from './vanban/vanban.component';
import { SigninComponent } from 'src/app/components/share/signin/signin.component';
import { ContentdgComponent } from 'src/app/components/share/contentdg/contentdg.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { NgxQrcodeStylingModule } from 'ngx-qrcode-styling';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    GenerateComponent,
    VanbanComponent,
    SigninComponent,
    ContentdgComponent,   
    
  ],
  imports: [
    CommonModule,
    GenerateRoutingModule,
    MatDialogModule,
    MatAutocompleteModule,
    FormsModule,
    NgxQrcodeStylingModule,
    SharedModule
  ]
})
export class GenerateModule { }
