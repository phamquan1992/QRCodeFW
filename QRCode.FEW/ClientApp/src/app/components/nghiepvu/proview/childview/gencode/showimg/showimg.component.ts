import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-showimg',
  templateUrl: './showimg.component.html',
  styleUrls: ['./showimg.component.css']
})
export class ShowimgComponent implements OnInit {

  constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<ShowimgComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
  }

}
