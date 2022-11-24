import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { data_dialog_input, optioncs } from 'src/app/models/optioncs';
import { DatePipe } from '@angular/common';
import { ContentdgComponent } from 'src/app/components/share/contentdg/contentdg.component';
import { qr_payment } from 'src/app/models/qr_payment';
import { map, Observable } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { ObservableService } from 'src/app/services/observable.service';
import { PaynemtService } from 'src/app/services/paynemt.service';
import { SurveyService } from 'src/app/services/survey.service';
import { nguoidung } from 'src/app/models/nguoidung';
import { qr_survey } from 'src/app/models/qr_survey';
import { GencodeService } from 'src/app/services/gencode.service';
import { MessageService } from 'src/app/services/message.service';
import { qr_gencode } from 'src/app/models/qr_gencode';

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
  name_qrcode = '';
  qrpaymentid = '';
  surveyid = '';
  status = '';
  is_any_select = false;
  arr_value: item_value_ks[] = [];
  arr_value_ks: item_value_ks[] = [];
  arr_payment!: Observable<qr_payment[]>;
  filter_payment!: Observable<qr_payment[]>;
  arr_survey!: Observable<qr_survey[]>;
  filter_survey!: Observable<qr_survey[]>;
  user_info!: nguoidung;
  code_tmp: string = '';
  str_url = '';
  constructor(private dialog: MatDialog, private datepipe: DatePipe, private commonSrc: CommonService, private sharingSrc: ObservableService,
    private paymentSrc: PaynemtService, private surveySrv: SurveyService, @Inject('BASE_URL') baseUrl: string, private gencodeSrc: GencodeService,
    private mesSrc: MessageService) {
    this.str_url = baseUrl;
  }

  ngOnInit(): void {
    this.status = '';
    this.sharingSrc.getUserInfo().subscribe(user => {
      this.user_info = user;
      this.arr_payment = this.paymentSrc.get_payment_list(Number(user.id));
      this.filter_payment = this.arr_payment;
      this.arr_survey = this.surveySrv.get_list_ks(user.id);
      this.filter_survey = this.arr_survey;
    });
  }
  now: Date = new Date();
  op_tion: optioncs = new optioncs();
  op_tion_temp: optioncs = new optioncs();
  taiqr() {
    if (this.name_qrcode == '' || this.qrpaymentid == '' || this.qrsurveyid == '') {
      this.mesSrc.error('Chưa đầy đủ thông tin để tạo QR Code');
      return;
    }
    let user_id: string = '';
    this.sharingSrc.getUserInfo().subscribe(t => user_id = t.id);
    let gencode_obj: qr_gencode = {
      qrgencodeid: 0,
      typecode: '',
      dataid: 0,
      image: '',
      name: '',
      code: '',
      status: 0,
      created_date: new Date(),
      created_by: 0,
      lastcreated_date: new Date(),
      lastcreated_by: 0,
      qrpaymentid: 0
    };
    gencode_obj.code = this.code_tmp;
    gencode_obj.typecode = "product";
    gencode_obj.dataid = Number(this.qrsurveyid);
    gencode_obj.qrpaymentid = Number(this.qrpaymentid);
    gencode_obj.name = this.name_qrcode;
    gencode_obj.image = this.convert_img_qrcode();
    gencode_obj.status = 1;
    gencode_obj.created_by = Number(user_id);
    this.gencodeSrc.add_gencode(gencode_obj).subscribe(t => {
      if (t) {
        this.mesSrc.success('Tạo QR code thành công');
        let time_now = new Date();
        this.status = 'download' + this.datepipe.transform(time_now, 'yyyyMMddHHmmss');
      } else {
        this.mesSrc.error('Có lỗi trong quá trình xử lý dữ liệu');
      }
    });
  }
  convert_img_qrcode() {
    let dt = document.getElementById('qrcontset') as HTMLElement;
    let canvas = dt.getElementsByTagName('canvas');
    let tmp = canvas[0] as HTMLCanvasElement;
    const data = tmp.toDataURL();
    return data;
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
    this.op_tion_temp = {
      data: ' ',
      image: item.image,
      witdth: item.witdth,
      height: item.height,
      margin: item.margin,
      dotstyle: item.dotstyle,
      cornersDot_type: item.cornersDot_type,
      cornerSquareType: item.cornerSquareType,
      dotcolor: item.dotcolor,
      background_color: item.background_color,
      shape: item.shape
    };
  }
  findDv(gt: item_value_ks[]): any {
    return gt.filter(t => t.is_select);
  }
  focus_input(event: any, gt: string) {
    let val = event.value.trim();
    event.value = val;
    if (gt === 'payment') {
      let gt_tmp = this.check_payment(val);
      this.filter_payment = this.arr_payment;
      event.value = gt_tmp;
    } else {
      let gt_tmp = this.check_survey(val);
      this.filter_survey = this.arr_survey;
      event.value = gt_tmp;
    }
  }
  check_payment(gt: string) {
    let gt_tmp = gt;
    this.filter_payment = this.arr_payment.pipe(map(ft => ft.filter(t => this.commonSrc.likevalue(t.packname, gt))));
    this.filter_payment.subscribe(t => {
      if (t.length === 0) {
        gt_tmp = '';
      }
    });
    return gt_tmp;
  }
  check_survey(gt: string) {
    let gt_tmp = gt;
    this.filter_survey = this.arr_survey.pipe(map(ft => ft.filter(t => this.commonSrc.likevalue(t.name, gt))));
    this.filter_survey.subscribe(t => {
      if (t.length === 0) {
        gt_tmp = '';
      }
    });
    return gt_tmp;
  }
  auto_change(obj_input: any) {
    let val = obj_input.value;
    this.filter_survey = this.arr_survey.pipe(map(ft => ft.filter(t => this.commonSrc.likevalue(t.name, val))));
    this.filter_survey.subscribe(t => {
      if (t.length == 0) {
        val = val.substring(0, val.length - 1);
        obj_input.value = val;
        this.filter_survey = this.arr_survey.pipe(map(ft => ft.filter(t => this.commonSrc.likevalue(t.name, val))));
      }
    });
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
  displayKhaoSat(selectedoption: any) {
    return selectedoption ? selectedoption.name : undefined;
  }
  select_payment(evnt: any) {
    let gt = evnt.option.value.qrpaymentid;
    this.qrpaymentid = gt;
    if (this.surveyid != null && this.qrpaymentid != null)
      this.get_link_qr();
  }
  qrsurveyid = '';
  select_survey(event: any) {
    let gt = event.option.value.qrsurveyid;
    this.qrsurveyid = gt;
    if (this.surveyid != null && this.qrsurveyid != null)
      this.get_link_qr();
  }
  get_link_qr() {
    this.now = new Date();
    let user_id: string = '';
    let typecode = 'survey';
    this.sharingSrc.getUserInfo().subscribe(t => user_id = t.id);
    let dataid = this.qrsurveyid;
    let paymentid = this.qrpaymentid;
    let time_gen = this.datepipe.transform(this.now, 'yyyyMMddHHmmss');
    let id_str = time_gen + dataid + paymentid;
    this.code_tmp = 'S' + id_str;
    let url = this.str_url + 'views/' + typecode + '/' + this.code_tmp;
    this.data = url;
  }
}
