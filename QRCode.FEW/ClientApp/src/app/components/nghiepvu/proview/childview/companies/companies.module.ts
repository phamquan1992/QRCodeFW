import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { AddcompanyComponent } from './addcompany/addcompany.component';
import { CompaniesComponent } from './companies.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CompanylistComponent } from './companylist/companylist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'src/app/shared/shared.module';


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
    MatAutocompleteModule,FormsModule, ReactiveFormsModule,
    MatTooltipModule,
    SharedModule
  ]
})
export class CompaniesModule { }
