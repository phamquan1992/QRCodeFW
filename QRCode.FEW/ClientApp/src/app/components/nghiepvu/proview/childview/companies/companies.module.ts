import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { AddcompanyComponent } from './addcompany/addcompany.component';
import { CompaniesComponent } from './companies.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CompanylistComponent } from './companylist/companylist.component';


@NgModule({
  declarations: [    
    CompaniesComponent,
    AddcompanyComponent,
    CompanylistComponent
  ],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    MatTableModule,
    MatCheckboxModule,
    MatAutocompleteModule
  ]
})
export class CompaniesModule { }
