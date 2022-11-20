import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { qr_his_scan } from 'src/app/models/qr_his_scan';
import { HisscanService } from 'src/app/services/hisscan.service';

@Component({
  selector: 'app-hisscan',
  templateUrl: './hisscan.component.html',
  styleUrls: ['./hisscan.component.css']
})
export class HisscanComponent implements OnInit {

  constructor(private hisSrc: HisscanService, private route: ActivatedRoute, private router: Router,) { }
  arr_his: qr_his_scan[] = [];
  name_filter = '';
  dataSource = new MatTableDataSource<qr_his_scan>(this.arr_his);
  displayedColumns: string[] = ['tel', 'location', 'province', 'ip', 'osystem', 'application', 'time_scan'];
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<qr_his_scan>(this.arr_his);
    let type_code = this.route.snapshot.paramMap.get('type') || '';
    let dataid = this.route.snapshot.paramMap.get('dataid') || "";
    console.log(type_code+' - '+dataid);
    this.hisSrc.get_list(type_code, dataid).subscribe(t => {
      this.arr_his = t;
      this.dataSource = new MatTableDataSource<qr_his_scan>(this.arr_his);
    });
  }
  applyFilter() {

  }
  reload_grid() {

  }
}