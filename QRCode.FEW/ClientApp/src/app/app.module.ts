import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ToastrModule } from 'ngx-toastr';
import { CLIInterceptor } from './interceptor/httpInterceptor';
import { ResetmailComponent } from './components/share/resetmail/resetmail.component';
import { SharedModule } from './shared/shared.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './interceptor/CustomPaginatorConfiguration';

@NgModule({
  declarations: [
    AppComponent,
    ResetmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatAutocompleteModule,
    FormsModule,
    HttpClientModule,
    AngularEditorModule,
    SharedModule,
    ToastrModule.forRoot()
  ],
  providers: [DatePipe,
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
