import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { nguoidung } from 'src/app/models/nguoidung';
import { payment_view, qr_payment } from 'src/app/models/qr_payment';
import { MessageService } from 'src/app/services/message.service';
import { ObservableService } from 'src/app/services/observable.service';
import { PaynemtService } from 'src/app/services/paynemt.service';
import { SelectngayComponent } from './selectngay/selectngay.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit,AfterViewInit {

  constructor(private paymentSrc: PaynemtService, private messSrc: MessageService, private sharingSrc: ObservableService, private dialog: MatDialog,
    private renderer: Renderer2, private el: ElementRef,) { }
  
  arr_payment: payment_view[] = [];
  loading$: boolean = false;
  user_info!: nguoidung;
  displayedColumns: string[] = ['email', 'phone', 'packname', 'created_date', 'payment_date', 'action'];
  dataSource = new MatTableDataSource<payment_view>(this.arr_payment);
  selection = new SelectionModel<payment_view>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  range_exp = new FormGroup({
    start_exp: new FormControl(null),
    end_exp: new FormControl(null),
  });
  active_range = new FormGroup({
    start_active: new FormControl(null),
    end_active: new FormControl(null),
  });
  filter_payment = {
    create_date_start: '',
    create_date_end: '',
    payment_date_start: '',
    payment_date_end: ''
  };
  innerHeight=0;
  ngOnInit(): void {
    this.innerHeight = window.innerHeight;
    this.get_data();
    this.sharingSrc.getUserInfo().subscribe(t => {
      this.user_info = t;
    });
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
    this.paymentSrc.get_payment_view().subscribe(t => {
      this.arr_payment = t;
      this.dataSource = new MatTableDataSource<payment_view>(this.arr_payment);
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.loading$ = false;
    });   
  }
  applyFilter() {
    let start_create = this.range_exp.controls['start_exp'].value || '';
    let end_create = this.range_exp.controls['end_exp'].value || '';
    let start_active = this.active_range.controls['start_active'].value || '';
    let end_active = this.active_range.controls['end_active'].value || '';
    this.filter_payment['create_date_start'] = start_create;
    this.filter_payment['create_date_end'] = end_create;
    this.filter_payment['payment_date_start'] = start_active;
    this.filter_payment['payment_date_end'] = end_active;
    this.dataSource.filter = JSON.stringify(this.filter_payment);
    this.dataSource.paginator = this.paginator;
  }
  reload_grid() {
    this.range_exp.controls['start_exp'].setValue('');
    this.range_exp.controls['end_exp'].setValue('');
    this.active_range.controls['start_active'].setValue('');
    this.active_range.controls['end_active'].setValue('');
    this.filter_payment['create_date_start'] = '';
    this.filter_payment['create_date_end'] = '';
    this.filter_payment['payment_date_start'] = '';
    this.filter_payment['payment_date_end'] = '';
    this.dataSource.filter = JSON.stringify(this.filter_payment);
    this.dataSource.paginator = this.paginator;
  }
  checkinput_date(gt: any) {
    let isValid = moment(gt.value, 'DD/MM/YYYY', true).isValid()
    if (!isValid) {
      gt.value = null;
    }
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
  select_ngay(gt: payment_view) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "350px";
    dialogConfig.panelClass = "magrin_pane";
    //dialogConfig.data = str_data;
    this.dialog.open(SelectngayComponent, dialogConfig).afterClosed().subscribe(
      res => {
        if (res != '') {
          let arr_date = res.split('/');
          let _date = arr_date[1] + '/' + arr_date[0] + '/' + arr_date[2];
          let pay_date = new Date(_date);
          pay_date.setHours(23, 59, 59);
          let item_update: qr_payment = {
            qrpaymentid: 0,
            packcode: '',
            packname: '',
            userid: 0,
            qrenterpriseid: 0,
            payment_date: new Date(),
            created_date: new Date(),
            created_by: 0,
            lastcreated_date: new Date(),
            lastcreated_by: 0
          };
          item_update.qrpaymentid = gt.qrpaymentid;
          item_update.lastcreated_by = Number(this.user_info.id);
          item_update.payment_date = pay_date;
          this.paymentSrc.active_payment(item_update).subscribe(t => {
            if (t) {
              this.messSrc.success("Kích hoạt thành công");
              this.get_data();
            } else {
              this.messSrc.error("Kích hoạt thất bại");
            }
          });
        }
      }
    );
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
              let data_date = new Date(data['created_date']);
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
            } else if (col == 'payment_date_start' || col == 'payment_date_end') {
              const temp_date = new Date(searchTerms[col]);
              let data_date = new Date(data['payment_date']);
              if (col == 'payment_date_start') {
                temp_date.setHours(0, 0, 0);
                if (temp_date <= data_date) {
                  found = true
                } else {
                  found = false;
                }
              }
              if (col == 'payment_date_end') {
                temp_date.setHours(23, 59, 59);
                if (temp_date >= data_date) {
                  found = true
                } else {
                  found = false;
                }
              }
            }
            else {
              if (data[col].toString().toLowerCase().indexOf(searchTerms[col].trim().toLowerCase()) != -1 && isFilterSet) {
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
}
