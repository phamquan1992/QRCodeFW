import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-upload',
  templateUrl: './dialog-upload.component.html',
  styleUrls: ['./dialog-upload.component.css']
})
export class DialogUploadComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogUploadComponent>) { }

  ngOnInit(): void {
  }
  str_src = '';
  load_src_file(gt: any) {
    // setTimeout(() => {
    //   console.log(gt);
    //   this.bt_click(gt);
    // }, 3000);
    this.bt_click(gt);
  }
  bt_click(gt:any){
    this.dialogRef.close(gt);
  }
}
