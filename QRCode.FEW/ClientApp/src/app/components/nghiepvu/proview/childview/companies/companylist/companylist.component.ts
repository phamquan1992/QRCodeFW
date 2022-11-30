import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { location } from 'src/app/models/location';
import { nguoidung } from 'src/app/models/nguoidung';
import { qr_enterprise } from 'src/app/models/qr_enterprise';
import { CommonService } from 'src/app/services/common.service';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import { GencodeService } from 'src/app/services/gencode.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MessageService } from 'src/app/services/message.service';
import { ObservableService } from 'src/app/services/observable.service';
import { AlertdeleteComponent } from 'src/app/shared/alertdelete/alertdelete.component';
import { ImportfileComponent } from 'src/app/shared/importfile/importfile.component';
import { CompaniesService } from '../companies.service';
export interface enterprise_export {
  thongtin_chung: string;
  dia_chi: string;
  trang_thai: string;
  ngay_capnhat: string;
}

export interface congty {
  img_src: string;
  TenCTY: string;
  MST: string;
  SDT: string;
  DiaChi: string;
  TrangThai: false;
  Khuvuc: string;
  ngaysua: string;
}
@Component({
  selector: 'app-companylist',
  templateUrl: './companylist.component.html',
  styleUrls: ['./companylist.component.css']
})
export class CompanylistComponent implements OnInit, AfterViewInit {
  arr_tinh!: location[];
  data_company: qr_enterprise[] = [];
  displayedColumns: string[] = ['select', 'name', 'DiaChi', 'TrangThai', 'ngaysua', 'action'];
  dataSource = new MatTableDataSource<qr_enterprise>(this.data_company);
  selection = new SelectionModel<qr_enterprise>(true, []);
  innerHeight = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filtercty = {
    name: '',
    tel: '',
    taxcode: '',
    province: '',
  };
  name_filter = '';
  value_select = 'all';
  user_info!: nguoidung;
  loading$: boolean = false;
  h_col = 0;
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
  constructor(private router: Router, private congtySrc: CompaniesService, private mesSrc: MessageService, private dialog: MatDialog,
    private gencodeSrc: GencodeService, private sharingSrc: ObservableService, private renderer: Renderer2, private el: ElementRef,
    private datepipe: DatePipe, private exportSrv: ExportExcelService, private localSrv: LocalStorageService, private commonSrv: CommonService) { }

  ngOnInit(): void {
    this.innerHeight = window.innerHeight;
    this.h_col = (window.innerHeight - 280);
    this.loading$ = true;
    this.sharingSrc.getUserInfo().subscribe(t => {
      this.user_info = t;
    });
    this.get_data();
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
    this.dataSource = new MatTableDataSource<qr_enterprise>(this.data_company);
    this.congtySrc.get_location('00').subscribe(t => this.arr_tinh = t);
    this.congtySrc.get_list_cty().subscribe(t => {
      this.data_company = t.filter(t => t.created_by === Number(this.user_info.id));
      this.dataSource = new MatTableDataSource<qr_enterprise>(this.data_company);
      this.dataSource.filterPredicate = this.createFilter();
      this.dataSource.paginator = this.paginator;
    });
    this.loading$ = false;
  }
  them_moi() {
    this.router.navigate(['portal/companies/add']);
  }
  sua_congty(id: string) {
    let gt_tmp = this.commonSrv.mahoa_id(id);
    this.router.navigate(['portal/companies/edit/' + gt_tmp]);
  }
  xoa_congty(id: string) {
    this.congtySrc.delete_obj(id).subscribe(t => {
      if (t) {
        this.mesSrc.success('Bạn đã thực hiện thành công!');
        this.selection.clear();
        this.get_data();
      } else {
        this.mesSrc.error('Có lỗi trong quá trình lưu dữ liệu');
      }
    });
  }
  Xoa_sp_arr() {
    let arrID = this.selection.selected.map(t => t.qrenterpriseid);
    this.congtySrc.delete_arr(arrID).subscribe(t => {
      if (t) {
        this.mesSrc.success('Bạn đã thực hiện thành công!');
        this.selection.clear();
        this.get_data();
      } else {
        this.mesSrc.error('Có lỗi trong quá trình lưu dữ liệu');
      }
    });
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
      let arrID_select = this.selection.selected.map(t => t.qrenterpriseid);
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
            this.xoa_congty(act);
          } else {
            this.Xoa_sp_arr();
          }
        }
      }
    );
  }
  applyFilter() {
    this.filtercty['name'] = this.name_filter;
    this.filtercty['tel'] = this.name_filter;
    this.filtercty['taxcode'] = this.name_filter;
    // this.filtercty['tel'] = '';
    // this.filtercty['taxcode'] = '';
    this.filtercty['province'] = this.value_select == 'all' ? '' : this.value_select;
    this.dataSource.filter = JSON.stringify(this.filtercty);
    this.dataSource.paginator = this.paginator;
  }
  reload_grid() {
    this.filtercty['name'] = '';
    this.filtercty['tel'] = '';
    this.filtercty['taxcode'] = '';
    this.filtercty['province'] = '';
    this.name_filter = '';
    this.value_select = 'all';
    this.dataSource.filter = JSON.stringify(this.filtercty);
    this.dataSource.paginator = this.paginator;
    this.selection.clear();
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
            if ((col === 'name' || col === 'tel' || col === 'taxcode') && isFilterSet) {
              console.log(data['taxcode']);
              let filter_name = data['name'] || '';
              let filter_tel = data['tel'] || '';
              let filter_taxcode = data['taxcode'] || '';

              let gttemp1 = filter_name.toString().toLowerCase().indexOf(searchTerms[col].trim().toLowerCase());
              let gttemp2 = filter_tel.toString().toLowerCase().indexOf(searchTerms[col].trim().toLowerCase());
              let gttemp3 = filter_taxcode.toString().toLowerCase().indexOf(searchTerms[col].trim().toLowerCase());

              if (gttemp1 > -1 || gttemp2 > -1 || gttemp3 > -1)
                found = true;
              else
                found = false;
            } else {
              let filter_str = data[col] || '';
              if (filter_str.toString().toLowerCase().indexOf(searchTerms[col].trim().toLowerCase()) != -1 && isFilterSet) {
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
  showhide_product(trangthai: boolean) {
    if (this.selection.selected.length == 0) {
      this.mesSrc.error('Bạn chưa chọn bản ghi nào');
      return;
    }
    this.selection.selected.forEach(element => {
      element.status = trangthai;
    });
    this.congtySrc.update_status(this.selection.selected).subscribe(
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
  doublerow(id: string) {
    // let link = '/portal/companies/edit/' + id;
    // this.router.navigate([link]);
    let gt_tmp = this.commonSrv.mahoa_id(id);
    this.router.navigate(['portal/companies/edit/' + gt_tmp]);
  }
  Import_enterprise() {
    this.showDialog();
  }
  showDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "710px";
    // dialogConfig.height="400px";
    dialogConfig.panelClass = ["pd_dialog_none", "z-[3000]"];
    dialogConfig.data = 'enterprise';
    this.dialog.open(ImportfileComponent, dialogConfig).afterClosed().subscribe(
      res => {
        if (res == "Success") {
          this.get_data();
        }
      }
    );
  }
  arr_header: string[] = ['Thông tin chung', 'Địa chỉ', 'Trạng thái', 'Ngày cập nhật'];
  Export_enterprise() {
    let arr_export: enterprise_export[] = [];
    console.log(this.data_company);
    this.data_company.forEach((row: qr_enterprise) => {
      let gt_tmp: enterprise_export = {
        thongtin_chung: row.name + "\r\n" + "MST: " + row.taxcode + '\r\n' + "Số điện thoại: " + row.tel,
        dia_chi: row.address || '',
        trang_thai: row.status ? 'Kích hoạt' : 'Huỷ kích hoạt',
        ngay_capnhat: row.lastcreated_date == null ? this.datepipe.transform(row.created_date, 'dd/MM/yyyy') as string : this.datepipe.transform(row.lastcreated_date, 'dd/MM/yyyy') as string
      };
      arr_export.push(gt_tmp);
    });

    let reportData = {
      title: 'Danh sách doanh nghiệp, cá nhân',
      data: arr_export,
      headers: this.arr_header,
    };

    this.exportSrv.exportExcel(reportData);
  }
}
