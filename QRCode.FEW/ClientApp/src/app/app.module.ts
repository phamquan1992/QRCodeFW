import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AcountinfoComponent } from './components/acountinfo/acountinfo.component';
import { ClickOutsideDirective } from './directive/clickOutside.directive';
import { FormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './directive/CustomPaginatorConfiguration';
import { HomeComponent } from './components/home/home.component';
import {MatBadgeModule} from '@angular/material/badge';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    AcountinfoComponent,
    ClickOutsideDirective,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatBadgeModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatDialogModule
  ],
  providers: [
    {
    provide: MatPaginatorIntl,
    useClass: CustomMatPaginatorIntl
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
