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
import { LinkqrcodeComponent } from './linkqrcode/linkqrcode.component';
import { SocialqrcodeComponent } from './socialqrcode/socialqrcode.component';
import { ShopqrcodeComponent } from './shopqrcode/shopqrcode.component';
import { ProductviewComponent } from './productview/productview.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    GenerateComponent,
    VanbanComponent,
    SigninComponent,
    ContentdgComponent,
    LinkqrcodeComponent,
    SocialqrcodeComponent,
    ShopqrcodeComponent,
    ProductviewComponent,   
    
  ],
  imports: [
    CommonModule,
    GenerateRoutingModule,
    MatDialogModule,
    MatAutocompleteModule,
    FormsModule,
    NgxQrcodeStylingModule,
    SharedModule,
    MatChipsModule,
    MatIconModule
  ]
})
export class GenerateModule { }
