import { SelectionModel } from '@angular/cdk/collections';
import { S } from '@angular/cdk/keycodes';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { nguoidung } from 'src/app/models/nguoidung';
import { product } from 'src/app/models/product';
import { GencodeService } from 'src/app/services/gencode.service';
import { MessageService } from 'src/app/services/message.service';
import { ObservableService } from 'src/app/services/observable.service';
import { AlertdeleteComponent } from 'src/app/shared/alertdelete/alertdelete.component';
import { ImportfileComponent } from 'src/app/shared/importfile/importfile.component';
import { ProductsService } from './products.service';
import * as XLSX from 'xlsx';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';

const data_product: product[] = [];
export interface product_export {
  code: string;
  name: string;
  status: string;
  ngay_capnhat: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  data_pr: product[] = [];
  displayedColumns: string[] = ['select', 'name', 'status', 'lastcreated_date', 'action'];
  dataSource = new MatTableDataSource<product>(data_product);
  selection = new SelectionModel<product>(true, []);
  filterProduct = {
    name: '',
    code: '',
    status: ''
  };
  value_select = 'all';
  name_filter = '';
  user_info!: nguoidung;
  loading$ = false;
  innerHeight = 0;
  constructor(private dialog: MatDialog, private productSrc: ProductsService, private mesSrc: MessageService, private router: Router,
    private gencodeSrc: GencodeService, private sharingSrc: ObservableService, private renderer: Renderer2, private el: ElementRef,
    public exportSrv: ExportExcelService, private datepipe: DatePipe,private commonSrv:CommonService) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<product>(data_product);
    this.sharingSrc.getUserInfo().subscribe(t => this.user_info = t);
    this.loading$ = true;
    this.productSrc.get_product_list().pipe().subscribe(t => {
      this.data_pr = t.filter(t => t.created_by === Number(this.user_info.id));
      this.dataSource = new MatTableDataSource<product>(this.data_pr);
      this.dataSource.filterPredicate = this.createFilter();
      this.dataSource.paginator = this.paginator;
      this.loading$ = false;
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
  reload_grid() {
    this.filterProduct['name'] = '';
    this.filterProduct['code'] = '';
    this.filterProduct['status'] = '';
    this.name_filter = '';
    this.value_select = 'all';
    this.dataSource.filter = JSON.stringify(this.filterProduct);
    this.dataSource.paginator = this.paginator;
    this.selection.clear();
  }
  applyFilter() {
    this.filterProduct['name'] = this.name_filter;
    this.filterProduct['code'] = this.name_filter;
    this.filterProduct['status'] = this.value_select == 'all' ? '' : this.value_select;
    this.dataSource.filter = JSON.stringify(this.filterProduct);
    this.dataSource.paginator = this.paginator;
  }
  customFilterPredicate() {
    const myFilterPredicate = (data: product, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      return data.name.toString().trim().indexOf(searchString.name) !== -1 && data.code.toString().trim().indexOf(searchString.name) !== -1 &&
        data.status.toString().trim().toLowerCase().indexOf(searchString.status.toLowerCase()) !== -1;
    }
    return myFilterPredicate;
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
            if ((col === 'name' || col === 'code') && isFilterSet) {
              let filter_name = data['name'] || '';
              let filter_code = data['code'] || '';
              let gttemp1 = filter_name.toString().toLowerCase().indexOf(searchTerms[col].trim().toLowerCase());
              let gttemp2 = filter_code.toString().toLowerCase().indexOf(searchTerms[col].trim().toLowerCase());
              if (gttemp1 > -1 || gttemp2 > -1)
                found = true;
              else
                found = false;
            } else {
              let filter_col = data[col] || '';
              if (filter_col.toString().toLowerCase().indexOf(searchTerms[col].trim().toLowerCase()) != -1 && isFilterSet) {
                found = true;
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
  createQR() {
  }
  Import_sp() {
    this.showDialog();
  }
  showDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "710px";
    // dialogConfig.height="400px";
    dialogConfig.panelClass = ["pd_dialog_none", "z-[3000]"];
    dialogConfig.data = 'product';
    this.dialog.open(ImportfileComponent, dialogConfig).afterClosed().subscribe(
      res => {
        if (res == "Success") {
          this.get_data();
        }
      }
    );
  }
  Xoa_sp_arr() {
    let arrID = this.selection.selected.map(t => t.qrproductid);
    this.productSrc.delete_product(arrID).subscribe(t => {
      if (t) {
        this.mesSrc.success('Bạn đã thực hiện thành công!');
        this.selection.clear();
        this.get_data();
      } else {
        this.mesSrc.error('Có lỗi trong quá trình lưu dữ liệu');
      }
    });

  }
  xoa_sp(id: any) {
    this.productSrc.delete_obj(id).subscribe(t => {
      if (t) {
        this.mesSrc.success('Bạn đã thực hiện thành công!');
        this.selection.clear();
        this.get_data();
      } else {
        this.mesSrc.error('Có lỗi trong quá trình lưu dữ liệu');
      }
    });
  }
  get_data() {
    this.dataSource = new MatTableDataSource<product>(data_product);
    this.productSrc.get_product_list().pipe().subscribe(t => {
      this.data_pr = t.filter(t => t.created_by === Number(this.user_info.id));
      this.dataSource = new MatTableDataSource<product>(this.data_pr);
      this.dataSource.filterPredicate = this.createFilter();
    });
  }
  showhide_product(trangthai: boolean) {
    if (this.selection.selected.length == 0) {
      this.mesSrc.error('Bạn chưa chọn bản ghi nào');
      return;
    }
    this.selection.selected.forEach(element => {
      element.status = trangthai;
    });
    this.productSrc.update_status(this.selection.selected).subscribe(
      t => {
        if (t) {
          this.mesSrc.success('Bạn đã thực hiện thành công!');
          this.selection.clear();
          this.get_data();
        } else {
          this.mesSrc.error('Có lỗi trong quá trình lưu dữ liệu');
        }
      }
    );
  }
  showXoaDialog(act: string) {
    if (act != '') {
      this.gencodeSrc.check_obj(act, 'enterprise').subscribe(t => {
        if (t) {
          this.mesSrc.error('Đối tượng đã được tạo QR Code không thể xoá!');
          return;
        }
      });
    } else {
      if (this.selection.selected.length == 0) {
        this.mesSrc.error('Bạn chưa chọn bản ghi nào!');
        return;
      }
      let arrID_select = this.selection.selected.map(t => t.qrproductid);
      this.gencodeSrc.get_list_id('enterprise', this.user_info.id).subscribe(t => {
        arrID_select.forEach(element => {
          let index_temp = t.indexOf(element);
          if (index_temp > -1) {
            this.mesSrc.error('Tồn tại dối tượng đã được tạo QR Code không thể xoá!');
            return;
          }
        });
      });
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "390px";
    dialogConfig.panelClass = "pd_dialog_none";
    dialogConfig.data = "Bạn chắc chắn muốn xoá bản ghi này?";
    this.dialog.open(AlertdeleteComponent, dialogConfig).afterClosed().subscribe(
      res => {
        if (res) {
          if (act != '') {
            this.xoa_sp(act);
          } else {
            this.Xoa_sp_arr();
          }
        }
      }
    );
  }
  doublerow(id: string) {
    // let link = '/portal/products/edit/' + id;
    // this.router.navigate([link]);
    let gt_tmp = this.commonSrv.mahoa_id(id);
    this.router.navigate(['/portal/products/edit/' + gt_tmp]);
  }

  arr_header: string[] = ['Mã sản phẩm', 'Tên sản phẩm', 'Trạng thái', 'Ngày cập nhật'];
  Export_sp() {
    let arr_export: product_export[] = [];
    this.data_pr.forEach((row: product) => {
      let gt_tmp: product_export = {
        code: row.code,
        name: row.name,
        status: row.status ? 'Kích hoạt' : 'Huỷ kích hoạt',
        ngay_capnhat: row.lastcreated_date == null ? this.datepipe.transform(row.created_date, 'dd/MM/yyyy') as string : this.datepipe.transform(row.lastcreated_date, 'dd/MM/yyyy') as string
      };
      arr_export.push(gt_tmp);
    });

    let reportData = {
      title: 'Danh sách sản phẩm',
      data: arr_export,
      // headers: Object.keys(this.data_pr[0]),
      headers: this.arr_header,
    };

    this.exportSrv.exportExcel(reportData);
  }
}
