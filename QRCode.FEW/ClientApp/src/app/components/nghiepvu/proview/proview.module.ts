import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProviewRoutingModule } from './proview-routing.module';
import { ProviewComponent } from './proview.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SidenavComponent } from './commons/sidenav/sidenav.component';
import { AcountinfoComponent } from './commons/acountinfo/acountinfo.component';
import { DashboardComponent } from './childview/dashboard/dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { GencodeComponent } from './childview/gencode/gencode.component';
import { ShowimgComponent } from './childview/gencode/showimg/showimg.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    ProviewComponent,
    SidenavComponent,
    AcountinfoComponent,
    DashboardComponent,
    GencodeComponent,
    ShowimgComponent,
    // CompaniesComponent,
    // AddcompanyComponent
  ],
  imports: [
    CommonModule,
    ProviewRoutingModule, MatSidenavModule, MatListModule, MatTableModule,MatCheckboxModule,MatAutocompleteModule,
    MatSlideToggleModule
  ]
})
export class ProviewModule { }
