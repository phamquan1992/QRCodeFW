import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-upload',
  templateUrl: './dialog-upload.component.html',
  styleUrls: ['./dialog-upload.component.css']
})
export class DialogUploadComponent implements OnInit {

  save_forder: string = '';
  constructor(public dialogRef: MatDialogRef<DialogUploadComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {   
    this.save_forder = this.data;
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
