import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { cutom_it } from 'src/app/models/category';
import { nguoidung } from 'src/app/models/nguoidung';
import { survey_view } from 'src/app/models/qr_survey';
import { CommonService } from 'src/app/services/common.service';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import { ObservableService } from 'src/app/services/observable.service';
import { SurveyService } from 'src/app/services/survey.service';
export interface survey {
  name: string;
  status: boolean;
  userdate: string;
}
export interface survey_export {
  name: string;
  trang_thai: string;
  so_cauhoi: number;
  so_traloi: number;
  ngay_tao: string;
  ngay_bd: string;
  ngay_kt: string
}

@Component({
  selector: 'app-surveylist',
  templateUrl: './surveylist.component.html',
  styleUrls: ['./surveylist.component.css']
})
export class SurveylistComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private surveySrv: SurveyService, private sharingSrv: ObservableService, private renderer: Renderer2, private el: ElementRef
    , private datepipe: DatePipe, private exportSrv: ExportExcelService,private commonSrv:CommonService) { }
  data_survey: survey_view[] = [];
  dataSource = new MatTableDataSource<survey_view>(this.data_survey);
  selection = new SelectionModel<survey_view>(true, []);
  displayedColumns = ['select', 'name', 'status', 'count_question', 'cout_answer', 'userdate', 'start_date', 'end_date', 'action'];
  loading$ = false;
  user_info!: nguoidung;
  arr_filter_status: cutom_it[] = [
    { stt: 1, mota: 'Kích hoạt', name: 'true' },
    { stt: 2, mota: 'Huỷ kích hoạt', name: 'false' }
  ];
  range_exp = new FormGroup({
    start_exp: new FormControl(null),
    end_exp: new FormControl(null),
  });
  filter_survey = {
    create_date_start: '',
    create_date_end: '',
    name: '',
    status: ''
  };
  ten_filter = '';
  innerHeight = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.sharingSrv.getUserInfo().subscribe(t => {
      this.user_info = t;
      this.get_data();
    });
    this.innerHeight = window.innerHeight;
  }
  ngAfterViewInit(): void {
    this.set_heigthtable();
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerHeight = window.innerHeight;
    this.set_heigthtable();
  }
  @ViewChild('header') elementView!: ElementRef;
  @ViewChild('table_content') tableView!: ElementRef;
  set_heigthtable() {
    let h_heder = this.elementView.nativeElement.offsetHeight;
    const trheader = (<HTMLElement>this.el.nativeElement).querySelector('.mat-header-row') as Element;
    let h_tmp = this.innerHeight - (h_heder + trheader.clientHeight + 45 + 56);
    var height = `${h_tmp}px`;
    this.renderer.setStyle(this.tableView.nativeElement, "height", height);
  }
  get_data() {
    this.loading$ = true;
    this.surveySrv.get_list(this.user_info.id).subscribe(v => {
      this.data_survey = v;
      console.log(v);
      this.dataSource = new MatTableDataSource<survey_view>(this.data_survey);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.loading$ = false;
    });
  }
  applyFilter() {
    let start_create = this.range_exp.controls['start_exp'].value || '';
    let end_create = this.range_exp.controls['end_exp'].value || '';
    this.filter_survey['create_date_start'] = start_create;
    this.filter_survey['create_date_end'] = end_create;
    this.filter_survey['status'] = this.status_name_filter;
    this.filter_survey['name'] = this.ten_filter.trim();
    this.dataSource.filter = JSON.stringify(this.filter_survey);
    this.dataSource.paginator = this.paginator;
  }
  status_name_filter = '';
  str_status = '';
  setval_status(gt: any) {
    this.status_name_filter = gt;
    if (gt != '' && gt != null)
      this.str_status = this.arr_filter_status.filter(t => t.name == gt)[0].mota;
    else
      this.str_status = '';
  }
  reload_grid() {
    this.ten_filter = '';
    this.range_exp.controls['start_exp'].setValue('');
    this.range_exp.controls['end_exp'].setValue('');
    this.filter_survey['create_date_start'] = '';
    this.filter_survey['create_date_end'] = '';
    this.filter_survey['status'] = '';
    this.filter_survey['name'] = '';
    this.str_status = '';
    this.status_name_filter = '';
    this.dataSource.filter = JSON.stringify(this.filter_survey);
    this.dataSource.paginator = this.paginator;
  }
  checkinput_date(gt: any) {
    let isValid = moment(gt.value, 'DD/MM/YYYY', true).isValid()
    if (!isValid) {
      gt.value = null;
    }
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
  add_action() {
    this.router.navigate(['portal/survey/add']);
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  show_info(id: string) {
    let gt_tmp = this.commonSrv.mahoa_id(id);
    this.router.navigate(['portal/survey/edit/' + gt_tmp]);
  }
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
            if (col == 'create_date_start' || col == 'create_date_end') {
              const temp_date = new Date(searchTerms[col]);
              let data_date = new Date(data.object_edit['created_date']);
              debugger;
              if (col == 'create_date_start') {
                temp_date.setHours(0, 0, 0);
                if (temp_date <= data_date) {
                  found = true
                } else {
                  found = false;
                }
              }
              if (col == 'create_date_end') {
                temp_date.setHours(23, 59, 59);
                if (temp_date >= data_date) {
                  found = true
                } else {
                  found = false;
                }
              }
            }
            else {
              if (data.object_edit[col].toString().toLowerCase().indexOf(searchTerms[col].trim().toLowerCase()) != -1 && isFilterSet) {
                found = true
              } else {
                found = false;
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
  arr_header: string[] = ['Tên khảo sát', 'Trạng thái','Số câu hỏi','Số người trả lời','Ngày tạo', 'Ngày bắt đầu','Ngày kết thúc'];
  Export_khaosat() {
    let arr_export: survey_export[] = [];
    this.data_survey.forEach((row: survey_view) => {
      let gt_tmp: survey_export = {
        name: row.object_edit.name,
        trang_thai: row.object_edit.status ? 'Kích hoạt' : 'Huỷ kích hoạt',
        so_cauhoi: row.list_cauhoi.length,
        so_traloi: row.object_edit.cout_answer,
        ngay_tao: row.object_edit.created_date == null ? '' : this.datepipe.transform(row.object_edit.created_date, 'dd/MM/yyyy HH:mm:ss') as string,
        ngay_bd: row.object_edit.start_date == null ? '' : this.datepipe.transform(row.object_edit.start_date, 'dd/MM/yyyy') as string,
        ngay_kt: row.object_edit.end_date == null ? '' : this.datepipe.transform(row.object_edit.end_date, 'dd/MM/yyyy') as string,
      };
      arr_export.push(gt_tmp);
    });

    let reportData = {
      title: 'Danh sách khảo sát',
      data: arr_export,
      headers: this.arr_header,
    };

    this.exportSrv.exportExcel(reportData);
  }
}
