import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  constructor(public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,) {

  }
  closeDialog() {
    this.dialogRef.close(false);
  }
}
