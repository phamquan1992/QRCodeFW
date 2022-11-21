import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { qr_his_scan } from 'src/app/models/qr_his_scan';
import { HisscanService } from 'src/app/services/hisscan.service';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';


@Component({
  selector: 'app-hisscan',
  templateUrl: './hisscan.component.html',
  styleUrls: ['./hisscan.component.css']
  
})
export class HisscanComponent implements OnInit {

  constructor(private hisSrc: HisscanService, private route: ActivatedRoute, private router: Router,) { }
  arr_his: qr_his_scan[] = [];
  loading$: boolean=false;
  name_filter = '';
  dataSource = new MatTableDataSource<qr_his_scan>(this.arr_his);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['tel', 'location', 'province', 'ip', 'osystem', 'application', 'time_scan'];
  filtercty = {
    name: '',
    tel: '',
    taxcode: '',
    province: '',
  };
  ngOnInit(): void {
    this.loading$ = true;
    this.dataSource = new MatTableDataSource<qr_his_scan>(this.arr_his);    
    this.dataSource.paginator = this.paginator;    
    let type_code = this.route.snapshot.paramMap.get('type') || '';
    let dataid = this.route.snapshot.paramMap.get('dataid') || "";
    this.hisSrc.get_list(type_code, dataid).subscribe(t => {
      this.arr_his = t;
      this.dataSource = new MatTableDataSource<qr_his_scan>(this.arr_his);
      
      this.loading$ = false;
    });
  }
  applyFilter() {

  }
  reload_grid() {

  }
  back_page() {
    this.router.navigate(['/portal/gencode']);
  }
}
