import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DanhmucRoutingModule } from './danhmuc-routing.module';
import { DanhmucComponent } from './danhmuc.component';
import { DndonviComponent } from './dndonvi/dndonvi.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PhongbanComponent } from './phongban/phongban.component';
import { EditdonviComponent } from './dndonvi/editdonvi/editdonvi.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ChucvuComponent } from './chucvu/chucvu.component';
import { KhachhangComponent } from './khachhang/khachhang.component';
import { ChuyennganhComponent } from './chuyennganh/chuyennganh.component';
import { DiabanhcComponent } from './diabanhc/diabanhc.component';
import { NhomqlyComponent } from './nhomqly/nhomqly.component';
import { PldichvuComponent } from './pldichvu/pldichvu.component';
import { CauhinhhtComponent } from './cauhinhht/cauhinhht.component';
import { EditchucvuComponent } from './chucvu/editchucvu/editchucvu.component';
import { RowdetailComponent } from './khachhang/rowdetail/rowdetail.component';
import { EditmdmajorsComponent } from './chuyennganh/editmdmajors/editmdmajors.component';
import { EditmdareasComponent } from './diabanhc/editmdareas/editmdareas.component';
import { EditdepartComponent } from './phongban/editdepart/editdepart.component';

@NgModule({
    declarations: [
        DanhmucComponent,
        DndonviComponent,
        PhongbanComponent,
        EditdonviComponent,
        ChucvuComponent,
        KhachhangComponent,
        ChuyennganhComponent,
        DiabanhcComponent,
        NhomqlyComponent,
        PldichvuComponent,
        CauhinhhtComponent,
        EditchucvuComponent,
        RowdetailComponent,
        EditmdmajorsComponent,
        EditmdareasComponent,
        EditdepartComponent
    ],
    imports: [
        CommonModule,
        DanhmucRoutingModule,
        MatTableModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatPaginatorModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule
    ]
})
export class DanhmucModule { }
