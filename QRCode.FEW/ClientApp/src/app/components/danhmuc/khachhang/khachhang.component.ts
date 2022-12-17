import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { custormer_detail, mdcustomer } from 'src/app/models/mdcustomer';

@Component({
  selector: 'app-khachhang',
  templateUrl: './khachhang.component.html',
  styleUrls: ['./khachhang.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*',"border-bottom":'1px solid #0000001f' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class KhachhangComponent implements OnInit, AfterViewInit {
  arr_custormer: mdcustomer[] = [];
  
  dataSource = new MatTableDataSource<mdcustomer>(this.arr_custormer);
  
  loading$ = false;
  name_filter = '';
  displayedColumns: string[] = ['select', 'objectcode', 'objectname', 'address', 'action'];
  displayedColumns2: string[] = ['cot1', 'objectcode_filter', 'objectname_filter', 'address_filter', 'cot6'];
  
  selection = new SelectionModel<mdcustomer>(true, []);
  row_expand!:mdcustomer;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  formfilter!: FormGroup;
  filter_object = {
    objectcode: '',
    objectname: '',
    address: ''
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    const group: any = {};
    this.displayedColumns2.forEach(it => {
      group[it] = new FormControl('');
    });
    this.formfilter = new FormGroup(group);
    this.get_data();
    this.dataSource.filterPredicate = this.createFilter();
  }
  get_data() {
    this.arr_custormer = [];
    for (let index = 0; index < 50; index++) {
      let item: mdcustomer = {
        id: index + 1,
        objectcode: 'KH' + (index + 1),
        objectname: 'Khách hàng ' + (index + 1),
        address: 'Địa chỉ khách hàng ' + (index + 1)
      };
      this.arr_custormer.push(item);
    }
    this.dataSource = new MatTableDataSource<mdcustomer>(this.arr_custormer);
    
    
  }
  select_row(data: mdcustomer) {
    
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
  showXoaDialog(id: any) {

  }
  sua_item(gt: mdcustomer) {
    let data: mdcustomer = {
      id: gt.id,
      objectcode: gt.objectcode,
      objectname: gt.objectname,
      address: gt.address
    };
    this.showEditDialog(data);
  }
  showEditDialog(data: mdcustomer) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "520px";
    dialogConfig.panelClass = "pd_dialog_none";
    dialogConfig.data = data;
    dialogConfig.disableClose = true;
    // this.dialog.open(EditdonviComponent, dialogConfig).afterClosed().subscribe(
    //   res => {
    //     if (res != null && res != '' && res != undefined) {

    //     }
    //   }
    // );
  }
  applyFilter(name_filter: string, gt: any) {
    let name_tmp = name_filter.split('_')[0];
    if (name_tmp === 'address') {
      this.filter_object.address = gt.value;
    }
    if (name_tmp === 'objectcode') {
      this.filter_object.objectcode = gt.value;
    }
    if (name_tmp === 'objectname') {
      this.filter_object.objectname = gt.value;
    }
    if (name_tmp === 'address') {
      this.filter_object.address = gt.value;
    }
    this.dataSource.filter = JSON.stringify(this.filter_object);
    this.dataSource.paginator = this.paginator;
  }
  reload_grid() {

  }
  them_moi() {

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
            let filter_str = data[col] || '';
            if (filter_str.toString().toLowerCase().indexOf(searchTerms[col].trim().toLowerCase()) != -1 && isFilterSet) {
              found = true
            } else {
              found = false;
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
