import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { qr_his_scan } from 'src/app/models/qr_his_scan';
import { HisscanService } from 'src/app/services/hisscan.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import * as moment from 'moment';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-hisscan',
  templateUrl: './hisscan.component.html',
  styleUrls: ['./hisscan.component.css']

})
export class HisscanComponent implements OnInit {

  constructor(private hisSrc: HisscanService, private route: ActivatedRoute, private router: Router,) { }
  arr_his: qr_his_scan[] = [];
  loading$: boolean = false;
  name_filter = '';
  dataSource = new MatTableDataSource<qr_his_scan>(this.arr_his);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['tel', 'location', 'province', 'ip', 'osystem', 'application', 'time_scan'];
  filter_his = {
    exp_date_start: '',
    exp_date_end: ''
  };
  ngOnInit(): void {
    this.loading$ = true;
    this.dataSource = new MatTableDataSource<qr_his_scan>(this.arr_his);
    let type_code = this.route.snapshot.paramMap.get('type') || '';
    let dataid = this.route.snapshot.paramMap.get('dataid') || "";
    this.hisSrc.get_list(type_code, dataid).subscribe(t => {
      this.arr_his = t;
      this.dataSource = new MatTableDataSource<qr_his_scan>(this.arr_his);
      this.dataSource.filterPredicate = this.createFilter();
      this.dataSource.paginator = this.paginator;
      this.loading$ = false;
    });
  }
  applyFilter() {
    let start_exp = this.range_exp.controls['start_exp'].value || '';
    let end_exp = this.range_exp.controls['end_exp'].value || '';
    this.filter_his['exp_date_start'] = start_exp;
    this.filter_his['exp_date_end'] = end_exp;
    this.dataSource.filter = JSON.stringify(this.filter_his);
    this.dataSource.paginator = this.paginator;
  }
  reload_grid() {
    let start_exp = '';
    let end_exp = '';
    this.filter_his['exp_date_start'] = start_exp;
    this.filter_his['exp_date_end'] = end_exp;
    this.range_exp.controls['start_exp'].setValue(start_exp);
    this.range_exp.controls['end_exp'].setValue(end_exp);
    this.dataSource.filter = JSON.stringify(this.filter_his);
    this.dataSource.paginator = this.paginator;
  }
  back_page() {
    this.router.navigate(['/portal/gencode']);
  }
  checkinput_date(gt: any) {
    let isValid = moment(gt.value, 'DD/MM/YYYY', true).isValid()
    if (!isValid) {
      gt.value = null;
    }
  }
  range_exp = new FormGroup({
    start_exp: new FormControl(null),
    end_exp: new FormControl(null),
  });
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      let nameSearch = () => {
        if (isFilterSet) {
          let arr: boolean[] = [];
          let found = false;
          for (const col in searchTerms) {

            if (col == 'exp_date_start' || col == 'exp_date_end') {
              const temp_date = new Date(searchTerms[col]);
              temp_date.setHours(0, 0, 0);
              let data_date = new Date(data['time_scan']);
              if (col == 'exp_date_start') {
                if (temp_date <= data_date) {
                  found = true
                } else {
                  found = false
                }
              }
              if (col == 'exp_date_end') {
                if (temp_date >= data_date) {
                  found = true
                } else {
                  found = false
                }
              }
            }
            else {
              if (data[col].toString().toLowerCase().indexOf(searchTerms[col].trim().toLowerCase()) != -1 && isFilterSet) {
                found = true
              } else {
                found = false
              }
            }
            arr.push(found);
          }
          let count_array = arr.findIndex(t => t == false);
          arr = [];
          return count_array == -1 ? true : false;
        } else {
          return true;
        }
      }
      return nameSearch();
    }
    return filterFunction;
  }
  number_change(event: Event, name: string) {
    var inputData = (<HTMLInputElement>event.target).value;

    //replace more than one dot
    var extractedFte = inputData.replace(/[^0-9.]/g, '').replace('.', '')
      .replace(/\./g, '').replace('x', '.');

    //Extract nuber Values
    extractedFte = extractedFte.replace(/^(\d+)\d*$/, "$1");

    //Reasign to same control
    (<HTMLInputElement>event.target).value = extractedFte;
  }
}
