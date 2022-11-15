import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { location } from 'src/app/models/location';
import { nguoidung } from 'src/app/models/nguoidung';
import { qr_enterprise } from 'src/app/models/qr_enterprise';
import { GencodeService } from 'src/app/services/gencode.service';
import { MessageService } from 'src/app/services/message.service';
import { ObservableService } from 'src/app/services/observable.service';
import { AlertdeleteComponent } from 'src/app/shared/alertdelete/alertdelete.component';
import { CompaniesService } from '../companies.service';

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
export class CompanylistComponent implements OnInit {
  arr_tinh!: location[];
  data_company: qr_enterprise[] = [];
  displayedColumns: string[] = ['select', 'name', 'DiaChi', 'TrangThai', 'ngaysua', 'action'];
  dataSource = new MatTableDataSource<qr_enterprise>(this.data_company);
  selection = new SelectionModel<qr_enterprise>(true, []);
  filtercty = {
    name: '',
    tel: '',
    taxcode: '',
    province: '',
  };
  name_filter = '';
  value_select = 'all';
  user_info!: nguoidung;
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
    private gencodeSrc: GencodeService, private sharingSrc: ObservableService) { }

  ngOnInit(): void {
    this.get_data();
    this.sharingSrc.getUserInfo().subscribe(t => {
      this.user_info = t;
    });
  }
  get_data() {
    this.dataSource = new MatTableDataSource<qr_enterprise>(this.data_company);
    this.congtySrc.get_location('00').subscribe(t => this.arr_tinh = t);
    this.congtySrc.get_list_cty().subscribe(t => {
      this.data_company = t;
      this.dataSource = new MatTableDataSource<qr_enterprise>(this.data_company);
      this.dataSource.filterPredicate = this.createFilter();
    });
  }
  them_moi() {
    this.router.navigate(['portal/companies/add']);
  }
  sua_congty(id: string) {
    this.router.navigate(['portal/companies/edit/' + id]);
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
      if(this.selection.selected.length==0){
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
    console.log(JSON.stringify(this.filtercty));
    this.dataSource.filter = JSON.stringify(this.filtercty);
  }
  reload_grid() {
    this.filtercty['name'] = '';
    this.filtercty['tel'] = '';
    this.filtercty['taxcode'] = '';
    this.filtercty['province'] = '';
    this.name_filter = '';
    this.value_select = 'all';
    this.dataSource.filter = JSON.stringify(this.filtercty);
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
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            if (data[col].toString().toLowerCase().indexOf(searchTerms[col].trim().toLowerCase()) != -1 && isFilterSet) {
              found = true
            }
          }
          return found
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
  doublerow(id: number) {
    let link = '/portal/companies/edit/' + id;
    this.router.navigate([link]);
  }
}
