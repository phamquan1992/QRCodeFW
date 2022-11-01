import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alertdelete',
  templateUrl: './alertdelete.component.html',
  styleUrls: ['./alertdelete.component.css']
})
export class AlertdeleteComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<AlertdeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,) { }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close(false);
  }
}
