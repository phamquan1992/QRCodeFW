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
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SyncpackComponent } from './childview/gencode/syncpack/syncpack.component';
import {MatSelectModule} from '@angular/material/select';
import { HisscanComponent } from './childview/gencode/hisscan/hisscan.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { StylePaginatorDirective } from 'src/app/interceptor/paginatorStyleDirective';
import { PaymentComponent } from './childview/payment/payment.component';
import { SelectngayComponent } from './childview/payment/selectngay/selectngay.component';
export const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM/YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MM/YYYY',
  },
};
@NgModule({
  declarations: [
    ProviewComponent,
    SidenavComponent,
    AcountinfoComponent,
    DashboardComponent,
    GencodeComponent,
    ShowimgComponent,
    SyncpackComponent,
    HisscanComponent,
    // CompaniesComponent,
    // AddcompanyComponent
    StylePaginatorDirective,
    PaymentComponent,
    SelectngayComponent
  ],
  imports: [
    CommonModule,
    ProviewRoutingModule, MatSidenavModule, MatListModule, MatTableModule,MatCheckboxModule,MatAutocompleteModule,
    MatSlideToggleModule,FormsModule,SharedModule,ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,MatSelectModule,MatTooltipModule,MatPaginatorModule
  ],  
  providers:[
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    
  ]
})
export class ProviewModule { }
