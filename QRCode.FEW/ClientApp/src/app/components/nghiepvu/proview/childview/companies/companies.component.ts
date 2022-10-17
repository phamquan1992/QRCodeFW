import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddcompanyComponent } from './addcompany/addcompany.component';

export interface congyty {
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
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  
  arr_tinh = [
    { ma: '', ten: '--Tỉnh thành--' },
    { ma: '97', ten: 'Bộ quốc phòng' },
    { ma: '01', ten: 'Thành phố Hà Nội' },
    { ma: '31', ten: 'Thành phố Hải Phòng' },
    { ma: '34', ten: 'Tỉnh Thái Bình' },
    { ma: '08', ten: 'Tỉnh Tuyên Quang' },
    { ma: '87', ten: 'Tỉnh Đồng Tháp' },
    { ma: '30', ten: 'Tỉnh Hải Dương' },
    { ma: '72', ten: 'Tỉnh Tây Ninh' },
    { ma: '35', ten: 'Tỉnh Hà Nam' },
    { ma: '48', ten: 'Thành phố Đà Nẵng' },
    { ma: '75', ten: 'Tỉnh Đồng Nai' },
    { ma: '89', ten: 'Tỉnh An Giang' },
    { ma: '27', ten: 'Tỉnh Bắc Ninh' },
    { ma: '44', ten: 'Tỉnh Quảng Bình' },
    { ma: '95', ten: 'Tỉnh Bạc Liêu' },
    { ma: '52', ten: 'Tỉnh Bình Định' },
    { ma: '77', ten: 'Tỉnh Bà Rịa - Vũng Tàu' },
    { ma: '80', ten: 'Tỉnh Long An' },
    { ma: '14', ten: 'Tỉnh Sơn La' },
    { ma: '25', ten: 'Tỉnh Phú Thọ' },
    { ma: '46', ten: 'Tỉnh Thừa Thiên Huế' },
    { ma: '17', ten: 'Tỉnh Hòa Bình' },
    { ma: '19', ten: 'Tỉnh Thái Nguyên' },
    { ma: '10', ten: 'Tỉnh Lào Cai' },
    { ma: '15', ten: 'Tỉnh Yên Bái' },
    { ma: '26', ten: 'Tỉnh Vĩnh Phúc' },
    { ma: '54', ten: 'Tỉnh Phú Yên' },
    { ma: '60', ten: 'Tỉnh Bình Thuận' },
    { ma: '11', ten: 'Tỉnh Điện Biên' },
    { ma: '12', ten: 'Tỉnh Lai Châu' },
    { ma: '22', ten: 'Tỉnh Quảng Ninh' },
    { ma: '36', ten: 'Tỉnh Nam Định' },
    { ma: '45', ten: 'Tỉnh Quảng Trị' },
    { ma: '70', ten: 'Tỉnh Bình Phước' },
    { ma: '68', ten: 'Tỉnh Lâm Đồng' },
    { ma: '83', ten: 'Tỉnh Bến Tre' },
    { ma: '84', ten: 'Tỉnh Trà Vinh' },
    { ma: '93', ten: 'Tỉnh Hậu Giang' },
    { ma: '96', ten: 'Tỉnh Cà Mau' },
    { ma: '82', ten: 'Tỉnh Tiền Giang' },
    { ma: '86', ten: 'Tỉnh Vĩnh Long' },
    { ma: '58', ten: 'Tỉnh Ninh Thuận' },
    { ma: '64', ten: 'Tỉnh Gia Lai' },
    { ma: '04', ten: 'Tỉnh Cao Bằng' },
    { ma: '66', ten: 'Tỉnh Đắk Lắk' },
    { ma: '74', ten: 'Tỉnh Bình Dương' },
    { ma: '91', ten: 'Tỉnh Kiên Giang' },
    { ma: '20', ten: 'Tỉnh Lạng Sơn' },
    { ma: '37', ten: 'Tỉnh Ninh Bình' },
    { ma: '02', ten: 'Tỉnh Hà Giang' },
    { ma: '33', ten: 'Tỉnh Hưng Yên' },
    { ma: '62', ten: 'Tỉnh Kon Tum' },
    { ma: '06', ten: 'Tỉnh Bắc Kạn' },
    { ma: '51', ten: 'Tỉnh Quảng Ngãi' },
    { ma: '92', ten: 'Thành phố Cần Thơ' },
    { ma: '67', ten: 'Tỉnh Đắk Nông' },
    { ma: '24', ten: 'Tỉnh Bắc Giang' },
    { ma: '49', ten: 'Tỉnh Quảng Nam' },
    { ma: '38', ten: 'Tỉnh Thanh Hóa' },
    { ma: '94', ten: 'Tỉnh Sóc Trăng' },
    { ma: '56', ten: 'Tỉnh Khánh Hòa' },
    { ma: '79', ten: 'Thành phố Hồ Chí Minh' },
    { ma: '42', ten: 'Tỉnh Hà Tĩnh' },
    { ma: '40', ten: 'Tỉnh Nghệ An' },
    { ma: '98', ten: 'Bộ công an' }
  ];
  data_company: congyty[] = [
    { img_src: '', TenCTY: 'Công ty A', MST: 'Chưa xác định', SDT: '0399059100', DiaChi: 'Số nhà 22 ngách 52/21 ngõ 52 Yên Vĩnh, Xã Kim Chung, Huyện Hoài Đức, Thành phố Hà Nội Read more: https://masocongty.vn/company/4245617/cong-ty-tnhh-thuong-mai-xnk-ovva.html', TrangThai: false, Khuvuc: '', ngaysua: '' },
    { img_src: '', TenCTY: 'Công ty B', MST: 'Chưa xác định', SDT: '0399059100', DiaChi: 'Số nhà 22 ngách 52/21 ngõ 52 Yên Vĩnh, Xã Kim Chung, Huyện Hoài Đức, Thành phố Hà Nội Read more: https://masocongty.vn/company/4245617/cong-ty-tnhh-thuong-mai-xnk-ovva.html', TrangThai: false, Khuvuc: '', ngaysua: '' },
    { img_src: '', TenCTY: 'Công ty C', MST: 'Chưa xác định', SDT: '0399059100', DiaChi: 'Số nhà 22 ngách 52/21 ngõ 52 Yên Vĩnh, Xã Kim Chung, Huyện Hoài Đức, Thành phố Hà Nội Read more: https://masocongty.vn/company/4245617/cong-ty-tnhh-thuong-mai-xnk-ovva.html', TrangThai: false, Khuvuc: '', ngaysua: '' },
    { img_src: '', TenCTY: 'Công ty A', MST: 'Chưa xác định', SDT: '0399059100', DiaChi: 'Số nhà 22 ngách 52/21 ngõ 52 Yên Vĩnh, Xã Kim Chung, Huyện Hoài Đức, Thành phố Hà Nội Read more: https://masocongty.vn/company/4245617/cong-ty-tnhh-thuong-mai-xnk-ovva.html', TrangThai: false, Khuvuc: '', ngaysua: '' },
  ];
  displayedColumns: string[] = ['select', 'img_src', 'TenCTY', 'DiaChi', 'TrangThai', 'Khuvuc', 'ngaysua'];
  dataSource = new MatTableDataSource<congyty>(this.data_company);
  selection = new SelectionModel<congyty>(true, []);
  constructor(private dialog: MatDialog) { }
  ngOnInit(): void {
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
  them_moi(){
    this.showDialog('');
  }
  showDialog(gt: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "600px";
    dialogConfig.maxHeight='90vh';
    dialogConfig.panelClass = "pd_dialog_none";
    this.dialog.open(AddcompanyComponent, dialogConfig).afterClosed().subscribe(
      res => {
        
      }
    );
  }
}
