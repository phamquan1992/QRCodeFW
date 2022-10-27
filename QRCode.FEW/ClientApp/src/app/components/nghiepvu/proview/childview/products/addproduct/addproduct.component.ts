import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Inputcustom } from 'src/app/models/Inputcustom';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogUploadComponent } from 'src/app/shared/dialog-upload/dialog-upload.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ProductsService } from '../products.service';
import { product } from 'src/app/models/product';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  DataForm: FormGroup = new FormGroup({
    logo: new FormControl(''),
    url_img: new FormControl(''),
    url_iso: new FormControl(''),
    url_barcode: new FormControl('')
  });
  payLoad: any;
  data!: Inputcustom[];
  data_macdinh!: Inputcustom[];
  data_mota!: Inputcustom[];
  data_khac!: Inputcustom[];
  dynamic_num = 0;
  ten_input = 'txt';
  src_img = '';
  src_daidien = '';
  src_sanpham = '';
  src_logo = '';
  src_chungchi = '';
  src_mavach = '';
  src_video = '';
  open_menu_mota = false;

  arr_mota = [
    { name: 'des_story', value: 'Câu chuyện sản phẩm' },
    { name: 'des_story', value: 'Quy trình sản xuất' },
    { name: 'des_pack', value: 'Quy cách đóng gói' },
    { name: 'des_element', value: 'Thành phần' },
    { name: 'des_uses', value: 'Công dụng' },
    { name: 'des_guide', value: 'Hướng dẫn sử dụng' },
    { name: 'des_preserve', value: 'Bảo quản' },
    { name: 'des_startdate', value: 'Ngày sản xuất' },
    { name: 'des_enddate', value: 'Hạn sử dụng' },
  ];

  constructor(private dialog: MatDialog, private route: ActivatedRoute, private router: Router, private productSrc: ProductsService) {

  }
  status_type = false;
  gt_id!: Observable<string>;
  value_id = '';
  product$!: Observable<product>;
  ngOnInit(): void {
    this.data = [];
    this.gt_id = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        params.get('id') == null ? '0' : params.get('id')!)
    );
    this.gt_id.subscribe(t => {
      this.value_id = t;
      this.productSrc.get_detail_product(this.value_id).subscribe(t => {
        this.data = t;
        this.data_macdinh = this.data.filter(t => t.nhom == 'macdinh');
        this.data_mota = this.data.filter(t => t.nhom == 'mota');
        this.data_khac = this.data.filter(t => t.nhom == 'khac');
        this.generateFormControls();
      });
    });
  }
  PreviewData() {
    this.payLoad = JSON.stringify(this.DataForm.getRawValue());
    this.data.forEach(element => {
      element.value_ip = this.DataForm.controls[element.name].value;
    });
    let proj: product = {
      qrproductid: 0,
      name: '',
      code: '',
      category: '',
      price: 0,
      slogan: '',
      logo: '',
      url_img: '',
      url_iso: '',
      url_barcode: '',
      des_story: '',
      des_pack: '',
      des_element: '',
      des_uses: '',
      des_guide: '',
      des_preserve: '',
      des_startdate: '',
      des_enddate: '',
      url_video: '',
      lastcreated_date: new Date(),
      lastcreated_by: 0,
      status: false
    };
    this.product$ = this.productSrc.get_product(this.value_id);

    this.product$.subscribe(t => proj = t);

    const myObj = JSON.parse(JSON.stringify(proj));
    this.data.forEach(element => {
      //Object.assign(obje, { [element.name]: element.value_ip });
      myObj[element.name] = element.value_ip;
    });
    console.log(myObj);
  }
  generateFormControls() {
    this.data.forEach(element => {
      if (element.name != 'logo' && element.name != 'url_img' && element.name != 'url_iso' && element.name != 'url_barcode')
        this.DataForm.addControl(element.name, new FormControl(''));
      else {
        debugger;
        this.DataForm.controls[element.name].setValue(element.value_ip);
        if (element.name == 'logo') {
          this.src_daidien = element.value_ip;
        }
        if (element.name == 'url_img') {
          this.src_sanpham = element.value_ip;
        }
        if (element.name == 'url_iso') {
          this.src_chungchi = element.value_ip;
        }
        if (element.name == 'url_barcode') {
          this.src_mavach = element.value_ip;
        }
      }
    });
  }
  add_input(tmp: Inputcustom) {

    this.dynamic_num = this.dynamic_num + 1;
    this.data.push(tmp);
    if (tmp.nhom == 'khac') {
      this.data_khac.push(tmp);
    }
    if (tmp.nhom == 'mota') {
      this.data_mota.push(tmp);
    }
    this.DataForm.addControl(tmp.name, new FormControl(''));
  }
  exit_thempro(gt: boolean) {
    this.status_type = gt;
  }
  delete_input_temp(gt: string) {
    let index = this.data.findIndex(t => t.name == gt);
    this.data.splice(index, 1);
    this.data_mota = this.data.filter(t => t.nhom == 'mota');
    this.data_khac = this.data.filter(t => t.nhom == 'khac');
  }
  get_image_upload(gt: any) {
    this.src_img = gt.value;
  }
  str_st = '';
  showDialog(gt: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "520px";
    // dialogConfig.height = "310px";
    dialogConfig.panelClass = "pd_dialog_none";
    this.dialog.open(DialogUploadComponent, dialogConfig).afterClosed().subscribe(
      res => {
        if (res != null && res != '' && res != undefined) {
          if (gt == 'daidien') {
            this.src_daidien = res;
            this.DataForm.controls['img_daidien'].setValue(res);
          }
          if (gt == 'sanpham') {
            this.src_sanpham = res;
            this.DataForm.controls['img_sanpham'].setValue(res);
          }
          if (gt == 'chungchi') {
            this.src_chungchi = res;
            this.DataForm.controls['img_chungchi'].setValue(res);
          }
          if (gt == 'mavach') {
            this.src_mavach = res;
            this.DataForm.controls['img_mavach'].setValue(res);
          }
        }
      }
    );
  }
  select_mota(value_gt: string, mota_gt: string) {
    this.open_menu_mota = false;
    let tmp = {
      title: mota_gt,
      name: value_gt,
      is_require: true,
      is_visible: true,
      type: 'text',
      nhom: 'mota',
      is_delete: true,
      value_ip: ''
    };
    console.log(tmp);
    this.data.push(tmp);
    this.data_mota = this.data.filter(t => t.nhom == 'mota');
    this.DataForm.addControl(tmp.name, new FormControl(''));
  }
}
