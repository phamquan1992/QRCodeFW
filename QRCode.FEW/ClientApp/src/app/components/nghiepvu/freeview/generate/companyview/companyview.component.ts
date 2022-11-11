import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { optioncs } from 'src/app/models/optioncs';
import { DatePipe } from '@angular/common';
import { ContentdgComponent } from 'src/app/components/share/contentdg/contentdg.component';
import { CompaniesService } from '../../../proview/childview/companies/companies.service';
import { map, Observable } from 'rxjs';
import { qr_enterprise } from 'src/app/models/qr_enterprise';
import { qr_payment } from 'src/app/models/qr_payment';
import { PaynemtService } from 'src/app/services/paynemt.service';
import { ObservableService } from 'src/app/services/observable.service';

export interface item_value_obj {
  value: string;
  is_select: boolean;
}

@Component({
  selector: 'app-companyview',
  templateUrl: './companyview.component.html',
  styleUrls: ['./companyview.component.css']
})
export class CompanyviewComponent implements OnInit {
  data = ' ';
  image = '';
  witdth = 200;
  height = 200;
  margin = 0;
  dotstyle = "square"; //"square" hoặc "dots"
  dotcolor = '#000000';
  background_color = '#ffffff';
  shape = 'square' //"square" hoặc "circle"
  cornersDot_type = 'None';
  cornerSquareType = 'None';

  status = '';
  is_any_select = false;
  arr_item: item_value_obj[] = [{ value: 'Dịch vụ 1', is_select: false }, { value: 'Dịch vụ 2', is_select: false }, { value: 'Dịch vụ 3', is_select: false }];
  arr_item_vaitro: item_value_obj[] = [{ value: 'Vai trò 1', is_select: false }, { value: 'Vai trò 2', is_select: false }, { value: 'Vai trò 3', is_select: false }];
  arr_item_obj: item_value_obj[] = [{ value: 'Doanh nghiệp 1', is_select: false }, { value: 'Doanh nghiệp 2', is_select: false }, { value: 'Doanh nghiệp 3', is_select: false }];
  arr_item_ks: item_value_obj[] = [{ value: 'Khảo sát 1', is_select: false }, { value: 'Khảo sát 2', is_select: false }, { value: 'Khảo sát 3', is_select: false }];
  arr_value: item_value_obj[] = [];
  arr_value_vaitro: item_value_obj[] = [];
  arr_value_obj: item_value_obj[] = [];
  arr_value_ks: item_value_obj[] = [];
  list_enterprise!: Observable<qr_enterprise[]>;
  filter_enterprise!: Observable<qr_enterprise[]>;
  arr_payment!: Observable<qr_payment[]>;
  filter_payment!: Observable<qr_payment[]>;
  constructor(private dialog: MatDialog, private datepipe: DatePipe, private companySrc: CompaniesService, private paymentSrc: PaynemtService, private sharingSrc: ObservableService) { }

  ngOnInit(): void {
    this.status = '';
    this.arr_value = this.arr_item;
    this.arr_value_vaitro = this.arr_item_vaitro;
    this.arr_value_obj = this.arr_item_obj;
    this.arr_value_ks = this.arr_item_ks;
    this.list_enterprise = this.companySrc.get_list_cty();
    this.filter_enterprise = this.list_enterprise;
    this.sharingSrc.getUserInfo().subscribe(user => {
      this.arr_payment = this.paymentSrc.get_payment_list(user.id as unknown as number);
      this.filter_payment = this.arr_payment;
    });
  }
  now: Date = new Date();
  op_tion: optioncs = new optioncs();
  taiqr() {
    this.now = new Date();
    this.status = 'download' + this.datepipe.transform(this.now, 'yyyyMMddHHmmss');
  }
  showDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.height = "100%";
    dialogConfig.maxWidth = "95%";
    dialogConfig.maxHeight = "95%";
    dialogConfig.data = this.op_tion;
    // dialogConfig.height = "310px";
    this.dialog.open(ContentdgComponent, dialogConfig).afterClosed().subscribe(
      res => {
        // this.rowSelect = -1;
      }
    );
  }
  onchange_text(gt: any) {
    this.data = gt.value;
    if (gt.value === '' || gt.value === null)
      this.data = " ";
    //this.change_val();
  }
  change_val() {
    this.op_tion = {
      data: this.data,
      image: this.image,
      witdth: this.witdth,
      height: this.height,
      margin: this.margin,
      dotstyle: this.dotstyle,
      cornersDot_type: this.cornersDot_type,
      cornerSquareType: this.cornerSquareType,
      dotcolor: this.dotcolor,
      background_color: this.background_color,
      shape: this.shape
    };
  }
  xuat_qr(item: optioncs) {
    this.op_tion = item;
  }
  findDv(gt: item_value_obj[]): any {
    return gt.filter(t => t.is_select);
  }
  auto_change(obj_input: any) {
    let val = obj_input.value;
    this.arr_value = this.arr_item.filter(option => option.value.toLowerCase().includes(val.toLowerCase()));
  }
  auto_change_vaitro(obj_input: any) {
    let val = obj_input.value;
    this.arr_value_vaitro = this.arr_item_vaitro.filter(option => option.value.toLowerCase().includes(val.toLowerCase()));
  }
  auto_change_obj(obj_input: any) {
    let val = obj_input.value;
    this.filter_enterprise = this.list_enterprise.pipe(map(op => op.filter(t => t.name.toLowerCase().includes(val.toLowerCase()))));
  }
  auto_change_ks(obj_input: any) {
    let val = obj_input.value;
    this.filter_payment = this.arr_payment.pipe(map(op => op.filter(t => t.packname.toLowerCase().includes(val.toLowerCase()))));
  }
  displayFn(selectedoption: any) {
    return selectedoption ? selectedoption.packname : undefined;
  }
  displayenter(selectedoption: any) {
    return selectedoption ? selectedoption.name : undefined;
  }
  select_payment(evnt: any) {
    let gt = evnt.option.value.packcode;
  }
}
