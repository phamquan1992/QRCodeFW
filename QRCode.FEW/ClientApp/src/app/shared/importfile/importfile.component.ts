import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-importfile',
  templateUrl: './importfile.component.html',
  styleUrls: ['./importfile.component.css']
})
export class ImportfileComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ImportfileComponent>) { }
  @Input() title = 'Import tài liệu';
  ngOnInit(): void {
  }

}
