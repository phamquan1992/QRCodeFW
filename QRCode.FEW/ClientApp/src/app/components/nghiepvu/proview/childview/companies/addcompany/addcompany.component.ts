import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { location } from 'src/app/models/location';
import { nguoidung } from 'src/app/models/nguoidung';
import { data_upload } from 'src/app/models/optioncs';
import { qr_enterprise } from 'src/app/models/qr_enterprise';
import { sectors } from 'src/app/models/sectors';
import { CommonService } from 'src/app/services/common.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MessageService } from 'src/app/services/message.service';
import { ObservableService } from 'src/app/services/observable.service';
import { SectorsService } from 'src/app/services/sectors.service';
import { DialogUploadComponent } from 'src/app/shared/dialog-upload/dialog-upload.component';
import { CompaniesService } from '../companies.service';

export interface item_dropdown_cp {
  key: string;
  value: string;
}

@Component({
  selector: 'app-addcompany',
  templateUrl: './addcompany.component.html',
  styleUrls: ['./addcompany.component.css']
})
export class AddcompanyComponent implements OnInit {
  DataForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    taxcode: new FormControl(''),
    tel: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(11)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    fax: new FormControl(''),
    logo: new FormControl('', Validators.required),
    nation: new FormControl('', Validators.required),
    province: new FormControl('', Validators.required),
    district: new FormControl('', Validators.required),
    wards: new FormControl('', Validators.required),
    occupation: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    sectors_code: new FormControl('', Validators.required),
    url_background: new FormControl(''),
    url_video: new FormControl(''),
    url_img: new FormControl(''),
  });
  constructor(private dialog: MatDialog, private companySrc: CompaniesService, private sharingSrc: ObservableService,
    private messSrc: MessageService, private route: ActivatedRoute, private router: Router,
    private sectorSrc: SectorsService, private datepipe: DatePipe, private commonSrc: CommonService, private localSrv: LocalStorageService) { }
  gt_id!: Observable<string>;
  value_id = '';
  val_tinh = '';
  val_huyen = '';
  val_xa = '';
  val_sector = '';

  arr_dynamic: item_dropdown_cp[] = [];
  src_daidien = '';
  src_bia = '';
  src_image: string[] = [];
  src_image_any = '';
  src_video = '';
  str_st = '';
  rotate_it = false;
  array_quocgia = [{
    key: '', value: '--Quốc gia--'
  }];
  arr_tinh!: location[];
  arr_tinh_tmp!: location[];
  array_huyen: location[] = [];
  array_huyen_tmp: location[] = [];
  array_xa_tmp: location[] = [];
  array_xa: location[] = [];
  array_sectors: sectors[] = [];
  array_sectors_core: sectors[] = [];
  data_update!: qr_enterprise;
  user_info!: nguoidung;
  @ViewChild('input_tinh_none') tinhtRef!: ElementRef<HTMLInputElement>;
  @ViewChild('input_huyen') huyenRef!: ElementRef<HTMLInputElement>;
  @ViewChild('input_xa') xaRef!: ElementRef<HTMLInputElement>;
  ngOnInit(): void {
    this.sharingSrc.getUserInfo().subscribe(t => this.user_info = t);
    this.array_quocgia = this.companySrc.array_quocgia;
    this.companySrc.get_location('00').subscribe(t => {
      this.arr_tinh_tmp = t;
      this.arr_tinh = this.arr_tinh_tmp;
    });
    let id = this.route.snapshot.paramMap.get('id');
    this.value_id = id == null ? '0' : id.toString();
    if (this.value_id != '0') {
      this.value_id = this.commonSrc.giaima_id(this.value_id);
    }
    this.sectorSrc.getList().subscribe(t => {
      this.array_sectors_core = t;
      this.array_sectors = t;
    });
    this.companySrc.get_object_cty(this.value_id).subscribe(t => {
      this.data_update = t;
      this.get_data_edit(t);
    });

  }
  get_data_edit(data_edit: qr_enterprise) {
    this.DataForm.controls['name'].setValue(data_edit.name);
    this.DataForm.controls['taxcode'].setValue(data_edit.taxcode);
    this.DataForm.controls['tel'].setValue(data_edit.tel);
    this.DataForm.controls['email'].setValue(data_edit.email);
    this.DataForm.controls['fax'].setValue(data_edit.fax);
    this.DataForm.controls['logo'].setValue(data_edit.logo);
    this.DataForm.controls['nation'].setValue('Việt Nam');
    this.DataForm.controls['province'].setValue(data_edit.province);
    this.DataForm.controls['district'].setValue(data_edit.district);
    this.DataForm.controls['wards'].setValue(data_edit.wards);
    this.DataForm.controls['sectors_code'].setValue(data_edit.sectors_code);
    this.DataForm.controls['occupation'].setValue(data_edit.occupation);
    this.DataForm.controls['address'].setValue(data_edit.address);
    this.DataForm.controls['url_background'].setValue(data_edit.url_background);
    this.DataForm.controls['url_video'].setValue(data_edit.url_video);
    this.DataForm.controls['url_img'].setValue(data_edit.url_img);

    if (this.value_id != '0') {
      this.src_daidien = data_edit.logo;
      this.src_bia = data_edit.url_background;
      this.src_image_any = data_edit.url_img;
      this.src_video = data_edit.url_video;

      this.companySrc.get_location(data_edit.province).subscribe(t => {
        this.array_huyen_tmp = t;
        this.array_huyen = this.array_huyen_tmp;
        this.val_tinh = this.arr_tinh_tmp.filter(t1 => t1.code == data_edit.province)[0].name;
        this.val_huyen = this.array_huyen_tmp.filter(tv => tv.code == data_edit.district)[0].name;
        this.companySrc.get_location(data_edit.district).subscribe(t2 => {
          this.array_xa_tmp = t2;
          this.array_xa = this.array_xa_tmp;
          this.val_xa = this.array_xa_tmp.filter(tk => tk.code == data_edit.wards)[0].name;
        });
        let idex_tmp = t.findIndex(k => k.code == data_edit.sectors_code);
        if (idex_tmp != -1)
          this.val_sector = this.array_sectors[idex_tmp].name;
      });
      if (data_edit.additional != null && data_edit.additional != '') {
        let arr_temp = JSON.parse(data_edit.additional);
        let arr_key = Object.keys(arr_temp);
        arr_key.forEach(element => {
          let ite_tmp: item_dropdown_cp = {
            key: element,
            value: arr_temp[element]
          };
          this.arr_dynamic.push(ite_tmp);
          this.DataForm.addControl(element, new FormControl(''));
          this.DataForm.controls[element].setValue(arr_temp[element]);
        });
      }
    }
  }
  showDialog(gt: string) {
    let data_show: data_upload = {
      type_file: 'image',
      forder_save: 'qr_enterprise'
    }
    if (gt == 'video')
      data_show.type_file = 'video';
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "520px";
    dialogConfig.panelClass = "pd_dialog_none";
    dialogConfig.data = data_show;
    this.dialog.open(DialogUploadComponent, dialogConfig).afterClosed().subscribe(
      res => {
        if (res != null && res != '' && res != undefined) {
          if (gt == 'daidien') {
            this.src_daidien = res;
            this.DataForm.controls['logo'].setValue(res);
          }
          if (gt == 'bia') {
            this.src_bia = res;
            this.DataForm.controls['url_background'].setValue(res);
          }
          if (gt == 'thuvienanh') {
            // this.src_image.push(res);
            this.src_image_any = res;
            this.DataForm.controls['url_img'].setValue(res);
          }
          if (gt == 'video') {
            this.src_video = res;
            this.DataForm.controls['url_video'].setValue(res);
          }
        }
      }
    );
  }
  _tinh_val = '';
  tinh_close(gt: any) {

  }
  displayFn(selectedoption: any) {
    return selectedoption ? selectedoption.name : undefined;
  }
  displayFn_nganh(selectedoption: any) {
    return selectedoption ? selectedoption.name : undefined;
  }
  set_gt(gt: any) {
    this.companySrc.get_location(gt).subscribe(t => {
      this.array_huyen_tmp = t;
      this.array_huyen = this.array_huyen_tmp;
      this.val_tinh = this.arr_tinh_tmp.filter(t => t.code == gt)[0].name;
    });
  }
  set_gt_xa(gt: any) {
    this.companySrc.get_location(gt).subscribe(t => {
      this.array_xa_tmp = t;
      this.array_xa = this.array_xa_tmp;
    });
  }
  select_it(evnt: any) {
    let gt = evnt.option.value.code;
    this.DataForm.controls['province'].setValue(gt);
    this.set_gt(gt);
  }
  select_it_huyen(evnt: any) {
    let gt = evnt.option.value.code;
    this.DataForm.controls['district'].setValue(gt);
    this.set_gt_xa(gt);
  }
  select_it_xa(evnt: any) {
    let gt = evnt.option.value.code;
    this.DataForm.controls['wards'].setValue(gt);
  }
  setEmpty_location(obj_tem: HTMLInputElement, name_obj: string) {
    //obj_tem.value = '';
    this.DataForm.controls[name_obj].setValue('');
    if (name_obj == 'province') {
      this.DataForm.controls['district'].setValue('');
      this.DataForm.controls['wards'].setValue('');
      this.array_huyen = [];
      this.array_xa = [];
      this.huyenRef.nativeElement.value = '';
      this.xaRef.nativeElement.value = '';
    } else if (name_obj == 'district') {
      this.DataForm.controls['wards'].setValue('');
      this.array_xa = [];
      this.xaRef.nativeElement.value = '';
    }
  }
  auto_tinh_change(obj_input: any) {
    let val = obj_input.value;
    if (val == '' || val == null) {
      this.DataForm.controls['province'].setValue('');
    }
    this.arr_tinh = this.arr_tinh_tmp.filter(option => this.commonSrc.likevalue(option.name, val));
    if (this.arr_tinh.length == 0) {
      val = val.substring(0, val.length - 1);
      obj_input.value = val;
      this.setEmpty_location(obj_input, 'province');
      this.arr_tinh = this.arr_tinh_tmp.filter(option => this.commonSrc.likevalue(option.name, val));
    }
  }
  auto_huyen_chang(obj_input: any) {
    let val = obj_input.value;
    this.array_huyen = this.array_huyen_tmp.filter(option => this.commonSrc.likevalue(option.name, val));
    if (val == '' || val == null) {
      this.DataForm.controls['district'].setValue('');
    }
    if (this.array_huyen.length == 0) {
      val = val.substring(0, val.length - 1);
      obj_input.value = val;
      this.setEmpty_location(obj_input, 'district');
      this.array_huyen = this.array_huyen_tmp.filter(option => this.commonSrc.likevalue(option.name, val));
    }
  }
  auto_xa_chang(obj_input: any) {
    let val = obj_input.value;
    this.array_xa = this.array_xa_tmp.filter(option => this.commonSrc.likevalue(option.name, val));
    if (val == '' || val == null) {
      this.DataForm.controls['wards'].setValue('');
    }
    if (this.array_xa.length == 0) {
      val = val.substring(0, val.length - 1);
      obj_input.value = val;
      this.setEmpty_location(obj_input, 'wards');
      this.array_xa = this.array_xa_tmp.filter(option => this.commonSrc.likevalue(option.name, val));
    }
  }
  auto_sector_change(obj_input: any) {
    let val = obj_input.value;
    this.array_sectors = this.array_sectors_core.filter(option => this.commonSrc.likevalue(option.name, val));
    if (val == '' || val == null) {
      this.DataForm.controls['sectors_code'].setValue('');
    }
    if (this.array_sectors.length == 0) {
      val = val.substring(0, val.length - 1);
      obj_input.value = val;
      this.array_sectors = this.array_sectors_core.filter(option => this.commonSrc.likevalue(option.name, val));
    }
  }
  select_it_sectors(evnt: any) {
    let gt = evnt.option.value.code;
    this.DataForm.controls['sectors_code'].setValue(gt);
  }
  focusFunction(event: any, ten: string) {
    this.DataForm.controls[ten].setValue(event.target.value.trim());
  }
  UpdateData() {
    if (this.DataForm.invalid) {
      return;
    }
    const myObj = JSON.parse(JSON.stringify(this.data_update));
    let arr_key = Object.keys(myObj);
    let arr_dynamic = {};
    Object.keys(this.DataForm.controls).forEach(key => {
      if (key != 'additional' && key != 'qrenterpriseid' && key != 'created_date' && key != 'created_by'
        && key != 'lastcreated_date' && key != 'lastcreated_by') {
        let check = arr_key.indexOf(key);
        if (check > -1)
          myObj[key] = this.DataForm.controls[key].value;
        else {
          debugger;
          if (Object.keys(arr_dynamic).length === 0) {
            let obj_dynamic = {
              [key]: this.DataForm.controls[key].value
            };
            arr_dynamic = obj_dynamic;
          }
          else {
            const obj_dy = JSON.parse(JSON.stringify(arr_dynamic));
            obj_dy[key] = this.DataForm.controls[key].value;
            arr_dynamic = obj_dy;
          }
        }
      }
      let time_now = new Date();
      if (myObj['qrenterpriseid'] != 0 && myObj['qrenterpriseid'] != null) {
        myObj['lastcreated_by'] = this.user_info.id;
        myObj['lastcreated_date'] = time_now;
      } else {
        myObj['created_by'] = this.user_info.id;
        myObj['created_date'] = time_now;
      }
    });
    if (Object.keys(arr_dynamic).length != 0) {
      myObj['additional'] = JSON.stringify(arr_dynamic);
    }
    myObj['nation'] = 'Việt Nam';
    if (this.value_id != '0')
      this.companySrc.update_company(myObj).subscribe(t => {
        if (t) {
          this.messSrc.success('Bạn đã thực hiện thành công!');
          this.router.navigate(['/portal/companies']);
        } else {
          this.messSrc.error('Có lỗi trong quá trình lưu dữ liệu');
        }
      });
    else
      this.companySrc.add_company(myObj).subscribe(
        t => {
          if (t) {
            this.messSrc.success('Bạn đã thực hiện thành công!');
            this.router.navigate(['/portal/companies']);
          } else {
            this.messSrc.error('Có lỗi trong quá trình lưu dữ liệu');
          }
        }
      );
  }
  add_dynamic(name: string) {
    let index_dynamic = this.arr_dynamic.map(t => t.key).indexOf(name);
    if (index_dynamic == -1) {
      this.DataForm.addControl(name, new FormControl('', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]));
      let gt_tem: item_dropdown_cp = { key: name, value: '' };
      this.arr_dynamic.push(gt_tem);
    } else {
      this.DataForm.removeControl(name);
      this.arr_dynamic.splice(index_dynamic, 1);
    }

  }
  select_dynamic(name: string) {
    return this.arr_dynamic.map(t => t.key).indexOf(name) > -1 ? true : false;
  }
  xoa_dynamic(name: string) {
    this.DataForm.removeControl(name);
    let index_dynamic = this.arr_dynamic.map(t => t.key).indexOf(name);
    this.arr_dynamic.splice(index_dynamic, 1);
  }
  focusOutFunction(obj_input: any, name: string) {
    let gt = obj_input.value.trim();
    obj_input.value = gt;
  }
  close_select(obj_input: any, name: string) {
    let val = obj_input.value.trim();
    if (name == 'province') {
      this.arr_tinh = this.arr_tinh_tmp.filter(option => option.name.toLowerCase() == val.toLowerCase());
      if (this.arr_tinh.length == 0) {
        obj_input.value = '';
        this.arr_tinh = this.arr_tinh_tmp;
        this.setEmpty_location(obj_input, name);
      }
    } else if (name == 'district') {
      this.array_huyen = this.array_huyen_tmp.filter(option => option.name.toLowerCase() == val.toLowerCase());
      if (this.array_huyen.length == 0) {
        obj_input.value = '';
        this.array_huyen = this.array_huyen_tmp;
        this.setEmpty_location(obj_input, name);
      }
    } else if (name == 'wards') {
      this.array_xa = this.array_xa_tmp.filter(option => option.name.toLowerCase() == val.toLowerCase());
      if (this.array_xa.length == 0) {
        obj_input.value = '';
        this.array_xa = this.array_xa_tmp;
        this.setEmpty_location(obj_input, name);
      }
    } else {
      this.array_sectors = this.array_sectors_core.filter(option => option.name.toLowerCase() == val.toLowerCase());
      if (this.array_sectors.length == 0) {
        obj_input.value = '';
        this.array_sectors = this.array_sectors_core;
      }
    }
  }
}
