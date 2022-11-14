import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { cutom_it } from 'src/app/models/category';
import { gencodeview } from 'src/app/models/qr_gencode';
import { GencodeService } from 'src/app/services/gencode.service';
import { MessageService } from 'src/app/services/message.service';
import { ObservableService } from 'src/app/services/observable.service';
import { PaynemtService } from 'src/app/services/paynemt.service';
import { ShowimgComponent } from './showimg/showimg.component';

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
  constructor(private gencodeSrc: GencodeService, private paymentSrc: PaynemtService, private sharingSrc: ObservableService, @Inject('BASE_URL') baseUrl: string, private dialog: MatDialog,
    private messSrc: MessageService) {
    this.str_url = baseUrl;
  }
  ngOnInit(): void {
    this.get_data();

  }
  get_data() {
    this.dataSource = new MatTableDataSource<gencodeview>(this.data_arr);
    this.sharingSrc.getUserInfo().subscribe(t => {
      this.data = this.gencodeSrc.get_list(t.id);
      this.data.subscribe(it => {
        this.data_arr = it;
        this.dataSource = new MatTableDataSource<gencodeview>(this.data_arr);
      });
      this.paymentSrc.get_payment_list(Number(t.id)).subscribe(t => {
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
  active_status(element: gencodeview) {
    if (element.status_qr == 'Kích hoạt') {
      element.status_qr = 'Huỷ kích hoạt';
    } else {
      element.status_qr = 'Kích hoạt';
    }
    this.messSrc.success(element.status_qr + " QR Code thành công");
  }
  applyFilter() {

  }
  reload_grid() {

  }
  setval_loaiQR(gt: any) {

  }
  input1_change(event:any){
    console.log(event);
  }
}
