import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { data_dialog_input, optioncs } from 'src/app/models/optioncs';
import { DatePipe } from '@angular/common';
import { ContentdgComponent } from 'src/app/components/share/contentdg/contentdg.component';
import { qr_payment } from 'src/app/models/qr_payment';
import { map, Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { ObservableService } from 'src/app/services/observable.service';
import { PaynemtService } from 'src/app/services/paynemt.service';

export interface item_value_ks {
  value: string;
  is_select: boolean;
}
@Component({
  selector: 'app-surveyview',
  templateUrl: './surveyview.component.html',
  styleUrls: ['./surveyview.component.css']
})
export class SurveyviewComponent implements OnInit {
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
  name_qrcode='';
  qrpaymentid = '';
  surveyid='';
  status = '';
  is_any_select = false;
  arr_item: item_value_ks[] = [{ value: 'Dịch vụ 1', is_select: false }, { value: 'Dịch vụ 2', is_select: false }, { value: 'Dịch vụ 3', is_select: false }];
  arr_item_ks: item_value_ks[] = [{ value: 'Khảo sát 1', is_select: false }, { value: 'Khảo sát 2', is_select: false }, { value: 'Khảo sát 3', is_select: false }];
  arr_value: item_value_ks[] = [];
  arr_value_ks: item_value_ks[] = [];
  arr_payment!: Observable<qr_payment[]>;
  filter_payment!: Observable<qr_payment[]>;
  constructor(private dialog: MatDialog, private datepipe: DatePipe,private commonSrc:CommonService,private sharingSrc: ObservableService,
    private paymentSrc: PaynemtService) { }

  ngOnInit(): void {
    this.status = '';
    this.arr_value = this.arr_item;
    this.arr_value_ks = this.arr_item_ks;
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
    let data_input: data_dialog_input = {
      option: this.op_tion,
      status: false
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.height = "100%";
    dialogConfig.maxWidth = "95%";
    dialogConfig.maxHeight = "95%";
    dialogConfig.data = data_input;
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
  findDv(gt: item_value_ks[]): any {
    return gt.filter(t => t.is_select);
  }
  auto_change(obj_input: any) {
    let val = obj_input.value;
    this.arr_value = this.arr_item.filter(option => option.value.toLowerCase().includes(val.toLowerCase()));
  }
  auto_change_ks(obj_input: any) {
    let val = obj_input.value;
    this.filter_payment = this.arr_payment.pipe(map(ft => ft.filter(t => this.commonSrc.likevalue(t.packname, val))));
    this.filter_payment.subscribe(t => {
      if (t.length == 0) {
        val = val.substring(0, val.length - 1);
        obj_input.value = val;
        this.filter_payment = this.arr_payment.pipe(map(ft => ft.filter(t => this.commonSrc.likevalue(t.packname, val))));
      }
    });
  }
  focusFunction() {
    debugger;
    this.name_qrcode = this.name_qrcode.trim();
  }
  
  displayFn(selectedoption: any) {
    return selectedoption ? selectedoption.packname : undefined;
  }
  select_payment(evnt: any) {
    let gt = evnt.option.value.qrpaymentid;
    this.qrpaymentid = gt;
    if (this.surveyid != null && this.qrpaymentid != null)
      this.get_link_qr();
  }
  get_link_qr() {}
}
