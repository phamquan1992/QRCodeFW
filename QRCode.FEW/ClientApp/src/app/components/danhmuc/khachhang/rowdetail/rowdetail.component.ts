import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { custormer_detail } from 'src/app/models/mdcustomer';

@Component({
  selector: 'app-rowdetail',
  templateUrl: './rowdetail.component.html',
  styleUrls: ['./rowdetail.component.css']
})
export class RowdetailComponent implements OnInit {
  @Input() parent_id = 0;
  arr_detail: custormer_detail[] = [];
  dataSource = new MatTableDataSource<custormer_detail>(this.arr_detail);
  displayedColumns: string[] = ['column1', 'column2', 'column3'];
  ngOnInit(): void {
    this.arr_detail = [];
    if (this.parent_id != 0) {
      for (let index = 0; index < 5; index++) {
        let it: custormer_detail = {
          detailid: (index + 1),
          customer_id: this.parent_id,
          column1: 'Mô tả ' + (index + 1),
          column2: 'Thông tin ' + (index + 1),
          column3: 'Dữ liệu ' + (index + 1),
        };
        this.arr_detail.push(it);
      }
      this.dataSource = new MatTableDataSource<custormer_detail>(this.arr_detail);
    }
  }
}
