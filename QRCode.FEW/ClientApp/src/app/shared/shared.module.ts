import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustominputComponent } from './custominput/custominput.component';
import { AddinputComponent } from './addinput/addinput.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { TypeqrcodeComponent } from './typeqrcode/typeqrcode.component';
import { NgxQrcodeStylingModule } from 'ngx-qrcode-styling';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AutocompleinputComponent } from './autocompleinput/autocompleinput.component';
import { UploadinputComponent } from './uploadinput/uploadinput.component';
import { DialogUploadComponent } from './dialog-upload/dialog-upload.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ThongtinkhacComponent } from './thongtinkhac/thongtinkhac.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EditorlayoutComponent } from './editorlayout/editorlayout.component';

@NgModule({
  declarations: [
    CustominputComponent,
    AddinputComponent,
    QrcodeComponent,
    TypeqrcodeComponent,
    AutocompleinputComponent,
    UploadinputComponent,
    DialogUploadComponent,
    ThongtinkhacComponent,
    EditorlayoutComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    NgxQrcodeStylingModule, MatAutocompleteModule, MatDialogModule, AngularEditorModule
  ], exports: [
    CustominputComponent,
    AddinputComponent,
    QrcodeComponent,
    TypeqrcodeComponent,
    AutocompleinputComponent, UploadinputComponent, DialogUploadComponent, ThongtinkhacComponent, EditorlayoutComponent]
})
export class SharedModule { }
