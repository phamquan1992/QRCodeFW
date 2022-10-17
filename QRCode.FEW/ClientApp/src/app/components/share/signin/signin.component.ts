import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SigninComponent>) { }

  ngOnInit(): void {
  }
  onClose() {
    this.dialogRef.close();
  }
}
