import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { qc_title } from 'src/app/models/qc_title';
import { EditchucvuComponent } from './editchucvu/editchucvu.component';

@Component({
  selector: 'app-chucvu',
  templateUrl: './chucvu.component.html',
  styleUrls: ['./chucvu.component.css']
})
export class ChucvuComponent implements OnInit, AfterViewInit {
  arr_tilte: qc_title[] = [];
  dataSource = new MatTableDataSource<qc_title>(this.arr_tilte);
  loading$ = false;
  name_filter = '';
  displayedColumns: string[] = ['select', 'titlecode', 'titlename', 'description', 'action'];
  displayedColumns2: string[] = ['cot1', 'titlecode_filter', 'titlename_filter', 'description_filter', 'cot6'];
  selection = new SelectionModel<qc_title>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  formfilter!: FormGroup;
  filter_object = {
    titlecode: '',
    titlename: '',
    description: ''
  }
  constructor(private dialog: MatDialog) {

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
    this.arr_tilte = [];
    for (let index = 0; index < 50; index++) {
      let item: qc_title = {
        id: (index + 1),
        titlecode: 'CV' + (index + 1),
        titlename: 'Chức vụ ' + (index + 1),
        description: 'Mô tả ' + (index + 1)
      };
      this.arr_tilte.push(item);
    }
    this.dataSource = new MatTableDataSource<qc_title>(this.arr_tilte);
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
  sua_item(gt: qc_title) {
    let data: qc_title = {
      id: gt.id,
      titlecode: gt.titlecode,
      titlename: gt.titlename,
      description: gt.description
    };
    this.showEditDialog(data);
  }
  showEditDialog(data: qc_title) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "520px";
    dialogConfig.panelClass = "pd_dialog_none";
    dialogConfig.data = data;
    dialogConfig.disableClose = true;
    this.dialog.open(EditchucvuComponent, dialogConfig).afterClosed().subscribe(
      res => {
        if (res != null && res != '' && res != undefined) {

        }
      }
    );
  }
  applyFilter(name_filter: string, gt: any) {
    let name_tmp = name_filter.split('_')[0];
    if (name_tmp === 'titlecode') {
      this.filter_object.titlecode = gt.value;
    }
    if (name_tmp === 'titlename') {
      this.filter_object.titlename = gt.value;
    }
    if (name_tmp === 'description') {
      this.filter_object.description = gt.value;
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
