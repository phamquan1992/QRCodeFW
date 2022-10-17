import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { NgxQrcodeStylingModule } from 'ngx-qrcode-styling';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QrcodeComponent } from './components/share/qrcode/qrcode.component';
import { QrmobileComponent } from './components/share/qrmobile/qrmobile.component';

@NgModule({
  declarations: [
    AppComponent,
    QrcodeComponent,
    QrmobileComponent
  ],
  imports: [
    NgxQrcodeStylingModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
