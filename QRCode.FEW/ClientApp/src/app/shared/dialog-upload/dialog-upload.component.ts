import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { data_upload } from 'src/app/models/optioncs';

@Component({
  selector: 'app-dialog-upload',
  templateUrl: './dialog-upload.component.html',
  styleUrls: ['./dialog-upload.component.css']
})
export class DialogUploadComponent implements OnInit {

  save_forder: string = '';
  type_file: string = '';
  tieu_de='Tải ảnh lên';
  constructor(public dialogRef: MatDialogRef<DialogUploadComponent>, @Inject(MAT_DIALOG_DATA) public data: data_upload) { }

  ngOnInit(): void {
    this.save_forder = this.data.forder_save;
    this.type_file = this.data.type_file;
    if(this.data.type_file=='video'){
      this.tieu_de='Tải video lên';
    }
  }
  str_src = '';
  load_src_file(gt: any) {
    // setTimeout(() => {
    //   console.log(gt);
    //   this.bt_click(gt);
    // }, 3000);
    this.bt_click(gt);
  }
  bt_click(gt: any) {
    this.dialogRef.close(gt);
  }
}
