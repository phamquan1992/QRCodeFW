import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { cutom_it } from 'src/app/models/category';
import { nguoidung } from 'src/app/models/nguoidung';
import { gencodeview, gencode_status, qr_gencode } from 'src/app/models/qr_gencode';
import { GencodeService } from 'src/app/services/gencode.service';
import { MessageService } from 'src/app/services/message.service';
import { ObservableService } from 'src/app/services/observable.service';
import { PaynemtService } from 'src/app/services/paynemt.service';
import { ShowimgComponent } from './showimg/showimg.component';
import { SyncpackComponent } from './syncpack/syncpack.component';

@Component({
  selector: 'app-gencode',
  templateUrl: './gencode.component.html',
  styleUrls: ['./gencode.component.css']
})
export class GencodeComponent implements OnInit {
  data!: Observable<gencodeview[]>;
  data_arr: gencodeview[] = [];
  dataSource = new MatTableDataSource<gencodeview>(this.data_arr);
  selection = new SelectionModel<gencodeview>(true, []);
  displayedColumns: string[] = ['select', 'qr_name', 'qr_img', 'qr_tpye', 'qr_obj_name', 'status_qr', 'pack_name', 'create_date_qr', 'exp_date', 'action'];
  str_url = '';
  arr_filter_loaiQR: cutom_it[] = [
    { mota: "Gán sản phẩm", name: "product", stt: 1 },
    { mota: "Gán doanh nghiệp", name: "enterprise", stt: 1 },
  ];
  arr_filter_pack: cutom_it[] = [];
  nameqr_filter = '';
  nameobj_filter = '';
  range_active = new FormGroup({
    start_active: new FormControl(null),
    end_active: new FormControl(null),
  });
  range_exp = new FormGroup({
    start_exp: new FormControl(null),
    end_exp: new FormControl(null),
  });
  filter_gencode = {
    qr_name: '',
    qr_obj_name: '',
    qr_tpye: '',
    pack_name: '',
    province: '',
    create_date_qr_start: '',
    create_date_qr_end: '',
    exp_date_start: '',
    exp_date_end: ''
  };
  user_info!: nguoidung;
  constructor(private gencodeSrc: GencodeService, private paymentSrc: PaynemtService, private sharingSrc: ObservableService, @Inject('BASE_URL') baseUrl: string, private dialog: MatDialog,
    private messSrc: MessageService) {
    this.str_url = baseUrl;
  }
  ngOnInit(): void {
    this.get_data();
    this.sharingSrc.getUserInfo().subscribe(t => this.user_info = t);
    this.paymentSrc.get_payment_list(Number(this.user_info.id)).subscribe(t => {
      t.forEach(element => {
        let it_tmp: cutom_it = {
          stt: 0,
          name: '',
          mota: ''
        };
        it_tmp.mota = element.packname;
        it_tmp.name = element.qrpaymentid.toString();
        this.arr_filter_pack.push(it_tmp);
      });
    });
  }
  get_data() {
    this.dataSource = new MatTableDataSource<gencodeview>(this.data_arr);
    this.sharingSrc.getUserInfo().subscribe(t => {
      this.data = this.gencodeSrc.get_list(t.id);
      this.data.subscribe(it => {
        this.data_arr = it;
        this.dataSource = new MatTableDataSource<gencodeview>(this.data_arr);
        this.dataSource.filterPredicate = this.createFilter();
      });
    });
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  copy_url(val: string, qr_tpye: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    if (qr_tpye == 'product') {
      val = val + '/gen'
    }
    selBox.value = this.str_url + 'views/' + qr_tpye + '/' + val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.messSrc.success("Sao chép liên kết QR Code thành công");
  }
  download_img(str_base64: string) {
    const downloadLink = document.createElement('a');
    const fileName = 'sample.png';
    downloadLink.href = str_base64;
    downloadLink.download = fileName;
    downloadLink.click();
    this.messSrc.success("Tải QR Code thành công");
  }
  zoom_img(str_data: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "350px";
    dialogConfig.height = "350px";
    dialogConfig.panelClass = "magrin_pane";
    dialogConfig.data = str_data;
    this.dialog.open(ShowimgComponent, dialogConfig).afterClosed().subscribe(
      res => {

      }
    );
  }
  chon_dichvu() {
    if (this.selection.selected.length == 0) {
      this.messSrc.error("Bạn chưa chọn bản ghi nào!");
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "350px";
    // dialogConfig.height = "350px";
    dialogConfig.panelClass = "magrin_pane";
    //dialogConfig.data = str_data;
    this.dialog.open(SyncpackComponent, dialogConfig).afterClosed().subscribe(
      res => {
        if (res != null && res != '') {
          let arr_gen: gencode_status[] = [];
          this.selection.selected.forEach(element => {
            let status_obj: gencode_status = {
              qrgencodeid: element.qrgencodeid,
              status: 0,
              userid: Number(this.user_info.id),
              qrpaymentid: res
            }
            arr_gen.push(status_obj);
          });
          this.gencodeSrc.sync_pack(arr_gen).subscribe(t => {
            if (t) {
              this.messSrc.success("Bạn đã thực hiện thành công");
              this.selection.clear();
              this.get_data();
            }
            else
              this.messSrc.error("Có lỗi trong quá trình xử lý dữ liệu");
          });
        }
      }
    );
  }
  active_status(element: gencodeview) {
    if (element.status_qr == 'Kích hoạt') {
      element.status_qr = 'Huỷ kích hoạt';
    } else {
      element.status_qr = 'Kích hoạt';
    }
    let status_obj: gencode_status = {
      qrgencodeid: element.qrgencodeid,
      status: element.status_qr == 'Kích hoạt' ? 1 : 0,
      userid: Number(this.user_info.id),
      qrpaymentid: 0
    }
    let arr_gen: gencode_status[] = [];
    arr_gen.push(status_obj)
    this.gencodeSrc.update_status(arr_gen).subscribe(t => {
      if (t) {
        this.messSrc.success(element.status_qr + " QR Code thành công");
      } else {
        this.messSrc.error(element.status_qr + " QR Code thất bại");
      }
    });

  }
  pack_name_filter = '';
  loaiQR_filter = '';
  applyFilter() {
    let start_active = this.range_active.controls['start_active'].value || '';
    let end_active = this.range_active.controls['end_active'].value || '';
    let start_exp = this.range_exp.controls['start_exp'].value || '';
    let end_exp = this.range_exp.controls['end_exp'].value || '';

    this.filter_gencode['qr_name'] = this.nameqr_filter;
    this.filter_gencode['qr_obj_name'] = this.nameobj_filter;
    this.filter_gencode['qr_tpye'] = this.loaiQR_filter;
    this.filter_gencode['pack_name'] = this.pack_name_filter;
    this.filter_gencode['create_date_qr_start'] = start_active;
    this.filter_gencode['create_date_qr_end'] = end_active;
    this.filter_gencode['exp_date_start'] = start_exp;
    this.filter_gencode['exp_date_end'] = end_exp;
    this.dataSource.filter = JSON.stringify(this.filter_gencode);
    this.selection.clear();
  }
  reload_grid() {
    this.filter_gencode['qr_name'] = '';
    this.filter_gencode['qr_obj_name'] = '';
    this.filter_gencode['qr_tpye'] = '';
    this.filter_gencode['pack_name'] = '';
    this.filter_gencode['create_date_qr_start'] = '';
    this.filter_gencode['create_date_qr_end'] = '';
    this.filter_gencode['exp_date_start'] = '';
    this.filter_gencode['exp_date_end'] = '';
    this.dataSource.filter = JSON.stringify(this.filter_gencode);
    this.selection.clear();
    this.nameqr_filter = '';
    this.nameobj_filter = '';
    this.loaiQR_filter = '';
    this.pack_name_filter = '';
    this.range_active.controls['start_active'].setValue('');
    this.range_active.controls['end_active'].setValue('');
    this.range_active.controls['start_exp'].setValue('');
    this.range_active.controls['end_exp'].setValue('');
  }
  setval_loaiQR(gt: any) {
    this.loaiQR_filter = gt;
  }
  setval_packname(gt: any) {
    this.pack_name_filter = gt;
  }
  input1_change(event: any) {
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
            if (col == 'create_date_qr_start' || col == 'create_date_qr_end') {
              debugger
              const temp_date = new Date(searchTerms[col]);

              let data_date = new Date(data['create_date_qr']);
              if (col == 'create_date_qr_start') {
                temp_date.setHours(0, 0, 0);
                if (temp_date <= data_date) {
                  found = true
                }
              }
              if (col == 'create_date_qr_end') {
                temp_date.setHours(23, 59, 59);
                if (temp_date >= data_date) {
                  found = true
                }
              }
            } else if (col == 'exp_date_start' || col == 'exp_date_end') {
              const temp_date = new Date(searchTerms[col]);
              let data_date = new Date(data['exp_date']);
              if (col == 'exp_date_start') {
                if (temp_date >= data_date) {
                  found = true
                }
              }
              if (col == 'exp_date_end') {
                if (temp_date <= data_date) {
                  found = true
                }
              }
            }
            else {
              if (data[col].toString().toLowerCase().indexOf(searchTerms[col].trim().toLowerCase()) != -1 && isFilterSet) {
                found = true
              }
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
  showhide_gencode(gt: boolean) {
    if (this.selection.selected.length == 0) {
      this.messSrc.error('Bạn chưa chọn bản ghi nào');
      return;
    }
    let arr_gen: gencode_status[] = [];
    this.selection.selected.forEach(element => {
      element.status_qr = gt ? 'Kích hoạt' : 'Huỷ kích hoạt';;
      let status_obj: gencode_status = {
        qrgencodeid: element.qrgencodeid,
        status: gt ? 1 : 0,
        userid: Number(this.user_info.id),
        qrpaymentid: 0
      }
      arr_gen.push(status_obj);
    });
    let str_trangthai = gt ? 'Kích hoạt' : 'Huỷ kích hoạt';
    this.gencodeSrc.update_status(arr_gen).subscribe(t => {
      if (t) {
        this.messSrc.success(str_trangthai + " QR Code thành công");
      } else {
        this.messSrc.error(str_trangthai + " QR Code thất bại");
      }
    });
  }
  checkinput_date(gt: any) {
    let isValid = moment(gt.value, 'DD/MM/YYYY', true).isValid()
    if (!isValid) {
      gt.value = null;
    }
  }
}
