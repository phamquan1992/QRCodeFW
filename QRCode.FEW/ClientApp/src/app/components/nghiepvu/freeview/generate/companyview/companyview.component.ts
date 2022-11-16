import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { data_dialog_input, optioncs } from 'src/app/models/optioncs';
import { DatePipe } from '@angular/common';
import { ContentdgComponent } from 'src/app/components/share/contentdg/contentdg.component';
import { CompaniesService } from '../../../proview/childview/companies/companies.service';
import { map, Observable } from 'rxjs';
import { qr_enterprise } from 'src/app/models/qr_enterprise';
import { qr_payment } from 'src/app/models/qr_payment';
import { PaynemtService } from 'src/app/services/paynemt.service';
import { ObservableService } from 'src/app/services/observable.service';
import { qr_gencode } from 'src/app/models/qr_gencode';
import { MessageService } from 'src/app/services/message.service';
import { GencodeService } from 'src/app/services/gencode.service';
import { CommonService } from 'src/app/services/common.service';

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
  name_qrcode = '';
  qrpaymentid = '';
  code_tmp = '';
  str_url = '';
  enterprise_id = '';
  op_tion_temp: optioncs = new optioncs();
  constructor(private dialog: MatDialog, private datepipe: DatePipe, private companySrc: CompaniesService,
    private paymentSrc: PaynemtService, private sharingSrc: ObservableService, @Inject('BASE_URL') baseUrl: string,
    private gencodeSrc: GencodeService, private mesSrc: MessageService,private commonSrc:CommonService) {
    this.str_url = baseUrl;
  }

  ngOnInit(): void {
    this.status = '';
    this.arr_value = this.arr_item;
    this.arr_value_vaitro = this.arr_item_vaitro;
    this.arr_value_obj = this.arr_item_obj;
    this.arr_value_ks = this.arr_item_ks;
    this.list_enterprise = this.companySrc.get_list_cty().pipe(map(m => m.filter(t => t.status)));
    this.filter_enterprise = this.list_enterprise;
    this.sharingSrc.getUserInfo().subscribe(user => {
      this.arr_payment = this.paymentSrc.get_payment_list(user.id as unknown as number);
      this.filter_payment = this.arr_payment;
    });
  }
  now: Date = new Date();
  op_tion: optioncs = new optioncs();
  taiqr() {
    // this.now = new Date();
    // this.status = 'download' + this.datepipe.transform(this.now, 'yyyyMMddHHmmss');
    if (this.name_qrcode == '' || this.qrpaymentid == '' || this.enterprise_id == '') {
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
    gencode_obj.typecode = "enterprise";
    gencode_obj.dataid = Number(this.enterprise_id);
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
  showDialog() {
    if (this.name_qrcode == '' || this.qrpaymentid == '' || this.enterprise_id == '') {
      this.mesSrc.error('Chưa đầy đủ thông tin để tạo QR Code');
      return;
    }
    let data_input: data_dialog_input = {
      option: this.op_tion,
      status: true
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
        gencode_obj.typecode = "enterprise";
        gencode_obj.dataid = Number(this.enterprise_id);
        gencode_obj.qrpaymentid = Number(this.qrpaymentid);
        gencode_obj.name = this.name_qrcode;
        gencode_obj.image = res;
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
    this.filter_enterprise = this.list_enterprise.pipe(map(op => op.filter(t => this.commonSrc.likevalue(t.name, val))));
    this.filter_enterprise.subscribe(t => {
      if (t.length == 0) {
        val = val.substring(0, val.length - 1);
        obj_input.value = val;
        this.filter_enterprise = this.list_enterprise.pipe(map(ft => ft.filter(t => this.commonSrc.likevalue(t.name, val))));
      }
    });
  }
  auto_change_ks(obj_input: any) {
    let val = obj_input.value;
    this.filter_payment = this.arr_payment.pipe(map(op => op.filter(t => this.commonSrc.likevalue(t.packname, val))));
    this.filter_payment.subscribe(t => {
      if (t.length == 0) {
        val = val.substring(0, val.length - 1);
        obj_input.value = val;
        this.filter_payment = this.arr_payment.pipe(map(op => op.filter(t => this.commonSrc.likevalue(t.packname, val))));
      }
    });
  }
  displayFn(selectedoption: any) {
    return selectedoption ? selectedoption.packname : undefined;
  }
  displayenter(selectedoption: any) {
    return selectedoption ? selectedoption.name : undefined;
  }
  select_payment(evnt: any) {
    let gt = evnt.option.value.qrpaymentid;
    this.qrpaymentid = gt;
    if (this.enterprise_id != null && this.qrpaymentid != null)
      this.get_link_qr();

  }
  select_enterprise(evnt: any) {
    let gt = evnt.option.value.qrenterpriseid;
    this.enterprise_id = gt;
    if (this.enterprise_id != null && this.qrpaymentid != null)
      this.get_link_qr();
  }
  get_link_qr() {
    this.now = new Date();
    let user_id: string = '';
    let typecode = 'enterprise';
    this.sharingSrc.getUserInfo().subscribe(t => user_id = t.id);
    let dataid = this.enterprise_id;
    let paymentid = this.qrpaymentid;
    let time_gen = this.datepipe.transform(this.now, 'yyyyMMddHHmmss');
    let id_str = time_gen + dataid + paymentid;
    this.code_tmp = 'E' + id_str;
    let url = this.str_url + 'views/' + typecode + '/' + id_str;
    this.data = url;
  }
  convert_img_qrcode() {
    let dt = document.getElementById('qrcontset') as HTMLElement;
    let canvas = dt.getElementsByTagName('canvas');
    let tmp = canvas[0] as HTMLCanvasElement;
    const data = tmp.toDataURL();
    return data;
  }
  focusFunction() {
    this.name_qrcode = this.name_qrcode.trim();
  }
}
