import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { invalid } from 'moment';
import { cauhoi } from 'src/app/models/cauhoi';
import { nguoidung } from 'src/app/models/nguoidung';
import { result_object } from 'src/app/models/optioncs';
import { qr_survey } from 'src/app/models/qr_survey';
import { MessageService } from 'src/app/services/message.service';
import { ObservableService } from 'src/app/services/observable.service';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-addsurvey',
  templateUrl: './addsurvey.component.html',
  styleUrls: ['./addsurvey.component.css']
})
export class AddsurveyComponent implements OnInit {
  arr_cauhoi: cauhoi[] = [];
  DataForm: FormGroup = new FormGroup({});
  ten_khao_sat = '';
  user_info!: nguoidung;
  ngay_bd = '';
  ngay_kt = '';
  value_id = '';
  objec_edit!: qr_survey;
  str_title='Thêm mới khảo sát';
  constructor(private sharingSrv: ObservableService, private surveySrv: SurveyService, private messSrv: MessageService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.sharingSrv.getUserInfo().subscribe(t => {
      this.user_info = t;
    });
    let id = this.route.snapshot.paramMap.get('id');
    this.value_id = id == null ? '0' : id.toString();
    if (this.value_id !== '0') {
      this.str_title='Cập nhật khảo sát';
      this.surveySrv.get_object(this.value_id).subscribe(t => {
        this.objec_edit = t.object_edit;
        this.ten_khao_sat = t.object_edit.name;
        this.ngay_bd = t.object_edit.start_date.toString();
        this.ngay_kt = t.object_edit.end_date.toString();
        this.arr_cauhoi = t.list_cauhoi;
      });
    }
  }
  show_menu = false;
  them_cauhoi(type_ip: string) {
    let max_val = this.arr_cauhoi.length == 0 ? 1 : Math.max(...this.arr_cauhoi.map(t => t.visible_index)) + 1;
    let key_cauhoi = 'cau' + max_val;
    let tmpIit: cauhoi = {
      noidung: '',
      dapan: { key: '', value: '', mota: '' },
      element: [{ key: 'dapan1', value: '', mota: '' }],
      name: key_cauhoi,
      type: type_ip,
      visible_index: max_val
    };
    if (type_ip == 'dropdown' || type_ip == 'luachon' || type_ip == 'images') {
      tmpIit.element.push({ key: 'dapan2', value: '', mota: '' });
    }
    this.DataForm.addControl(key_cauhoi, new FormControl(tmpIit, null));
    this.arr_cauhoi.push(tmpIit);
    this.show_menu = false;
  }
  xoa_cauhoi(ch: cauhoi) {

    this.update_index(ch.visible_index);

  }
  update_index(vitri: number) {
    let index_last = this.arr_cauhoi.length;
    let item_next = vitri + 1;
    let idex_temp = vitri;
    while (item_next <= index_last) {
      let cur_index = this.arr_cauhoi.findIndex(t => t.visible_index == item_next);
      if (cur_index > -1) {
        this.arr_cauhoi[cur_index].visible_index = idex_temp;
        idex_temp = idex_temp + 1;
      }
      item_next = item_next + 1;
    }
    let index_del = this.arr_cauhoi.findIndex(t => t.visible_index == vitri);
    if (index_del > -1)
      this.arr_cauhoi.splice(index_del, 1);
  }
  move_index(vt: number, act: string) {
    let cur_id = this.arr_cauhoi.findIndex(t => t.visible_index == vt);
    console.log(vt);
    if (act == 'up') {
      if (vt != 1) {
        this.arr_cauhoi[cur_id].visible_index = vt - 1;
        this.arr_cauhoi[cur_id].name = 'cau' + (vt - 1);
        let cur_pre = this.arr_cauhoi.findIndex(t => t.visible_index == vt - 1);
        this.arr_cauhoi[cur_pre].visible_index = vt;
        this.arr_cauhoi[cur_pre].name = 'cau' + vt;
      }
    }
    if (act == 'down') {
      if (vt != this.arr_cauhoi.length) {
        let id_tem = vt + 1
        let cur_next = this.arr_cauhoi.findIndex(t => t.visible_index == id_tem);
        this.arr_cauhoi[cur_id].visible_index = id_tem;
        this.arr_cauhoi[cur_id].name = 'cau' + id_tem;
        this.arr_cauhoi[cur_next].visible_index = vt;
        this.arr_cauhoi[cur_next].name = 'cau' + vt;
      }
    }
    this.arr_cauhoi = this.arr_cauhoi.sort((a, b) => (a.visible_index > b.visible_index) ? 1 : -1);
  }
  get invalid_cauhoi() {
    let count_arr = this.arr_cauhoi.filter(t => t.noidung === '' || (t.noidung !== "" && t.type !== 'text' && t.type != 'textarea' && t.element.filter(v => v.value === '').length != 0));
    if (this.ten_khao_sat === '' || count_arr.length !== 0) {
      return false;
    } else
      return true;
  }
  isvalid_khaosat = true;
  invaild_tenkhaosat() {
    this.ten_khao_sat = this.ten_khao_sat.trim();
    this.isvalid_khaosat = this.ten_khao_sat === "" ? false : true;
  }
  khaosat_keyup() {
    this.isvalid_khaosat = this.ten_khao_sat === "" ? false : true;
  }
  save_cauhoi() {
    console.log(JSON.stringify(this.arr_cauhoi));
    let count_arr = this.arr_cauhoi.filter(t => t.noidung === '' || (t.noidung !== "" && t.type !== 'text' && t.type != 'textarea' && t.element.filter(v => v.value === '').length != 0));
    if (this.ten_khao_sat === '' || count_arr.length != 0) {
      this.messSrv.error("Bạn chưa nhập đầy đủ thông tin!");
      return;
    }
    let dt_ngaybd = new Date();
    let dt_ngaykt = new Date();
    if (this.ngay_bd !== '') {
      dt_ngaybd = new Date(this.ngay_bd);
      dt_ngaybd.setHours(23, 59, 59);
    }
    if (this.ngay_bd !== '') {
      dt_ngaykt = new Date(this.ngay_kt);
      dt_ngaykt.setHours(23, 59, 59);
    }
    if (this.value_id == '0') {
      let obj_new: qr_survey = {
        qrsurveyid: 0,
        name: this.ten_khao_sat,
        code: '',
        status: true,
        additional: JSON.stringify(this.arr_cauhoi),
        start_date: this.ngay_bd !== '' ? dt_ngaybd : new Date(0),
        end_date: this.ngay_kt !== '' ? dt_ngaykt : new Date(0),
        created_date: new Date(),
        created_by: Number(this.user_info.id),
        lastcreated_date: new Date(),
        lastcreated_by: 0
      };
      let kq: result_object = {
        result: '',
        error: ''
      };
      this.surveySrv.add_survey(obj_new).subscribe(t => {
        kq = t as result_object;
        if (kq.result === "Success") {
          this.messSrv.success("Bạn đã thực hiện thành công!");
          this.router.navigate(['/portal/survey/list']);
        } else if (kq.result === "ErrorIns" || kq.result === "ErrorImg") {
          this.messSrv.success("Có lỗi trong quá trình lưu dữ liệu!");
        }
        else {
          console.log("Exeption: " + kq.error);
          this.messSrv.error("Có lỗi trong quá trình xử lý dữ liệu!");
        }
      });
    } else {
      let kq: result_object = {
        result: '',
        error: ''
      };
      let obj_update: qr_survey = {
        qrsurveyid: this.objec_edit.qrsurveyid,
        name: this.ten_khao_sat,
        code: '',
        status: true,
        additional: JSON.stringify(this.arr_cauhoi),
        start_date: this.ngay_bd !== '' ? dt_ngaybd : new Date(0),
        end_date: this.ngay_kt !== '' ? dt_ngaykt : new Date(0),
        created_date: new Date(),
        created_by: Number(this.user_info.id),
        lastcreated_date: new Date(),
        lastcreated_by: 0
      };
      this.surveySrv.update_survey(obj_update).subscribe(t => {
        kq = t as result_object;
        if (kq.result === "Success") {
          this.messSrv.success("Bạn đã thực hiện thành công!");
          this.router.navigate(['/portal/survey/list']);
        } else if (kq.result === "ErrorUdp" || kq.result === "ErrorImg") {
          this.messSrv.success("Có lỗi trong quá trình lưu dữ liệu!");
        }
        else {
          console.log("Exeption: " + kq.error);
          this.messSrv.error("Có lỗi trong quá trình xử lý dữ liệu!");
        }
      });
    }
  }
  number_change(event: Event) {
    var inputData = (<HTMLInputElement>event.target).value;

    //replace more than one dot
    var extractedFte = inputData.replace(/[^0-9.]/g, '').replace('.', '')
      .replace(/\./g, '').replace('x', '.');

    //Extract nuber Values
    extractedFte = extractedFte.replace(/^(\d+)\d*$/, "$1");

    //Reasign to same control
    (<HTMLInputElement>event.target).value = extractedFte;
  }
  checkinput_date(gt: any) {
    let isValid = moment(gt.value, 'DD/MM/YYYY', true).isValid()
    if (!isValid) {
      gt.value = null;
    }
  }
  back_home(){
    this.router.navigate(['/portal/survey/list']);
  }
}
