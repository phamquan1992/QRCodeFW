import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { location } from 'src/app/models/location';
import { qr_enterprise } from 'src/app/models/qr_enterprise';
import { MessageService } from 'src/app/services/message.service';
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
    tel: new FormControl(''),
    email: new FormControl(''),
    fax: new FormControl(''),
    logo: new FormControl(''),
    nation: new FormControl(''),
    province: new FormControl(''),
    district: new FormControl(''),
    wards: new FormControl(''),
    occupation: new FormControl(''),
    address: new FormControl(''),
  });
  constructor(private dialog: MatDialog, private companySrc: CompaniesService, private messSrc: MessageService, private route: ActivatedRoute, private router: Router) { }
  gt_id!: Observable<string>;
  value_id = '';
  val_tinh = '';
  val_huyen = '';
  val_xa = '';
  
  arr_dynamic: item_dropdown_cp[] = [];
  src_daidien = '';
  src_bia = '';
  src_image: string[] = [];
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
  arr_nhomnganh = [
    {
      ma: 'Nganh1',
      ten: 'Nhóm ngành 1'
    },
    {
      ma: 'Nganh2',
      ten: 'Nhóm ngành 2'
    },
    {
      ma: 'Nganh3',
      ten: 'Nhóm ngành 3'
    },
    {
      ma: 'Nganh4',
      ten: 'Nhóm ngành 4'
    },
    {
      ma: 'Nganh5',
      ten: 'Nhóm ngành 5'
    },
    {
      ma: 'Nganh6',
      ten: 'Nhóm ngành 6'
    },
  ];
  data_update!: qr_enterprise;
  ngOnInit(): void {
    this.array_quocgia = this.companySrc.array_quocgia;
    this.companySrc.get_location('00').subscribe(t => {
      this.arr_tinh_tmp = t;
      this.arr_tinh = this.arr_tinh_tmp;
    });
    let id = this.route.snapshot.paramMap.get('id');
    this.value_id = id == null ? '0' : id.toString();
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
    this.DataForm.controls['nation'].setValue(data_edit.nation);
    this.DataForm.controls['province'].setValue(data_edit.province);
    this.DataForm.controls['district'].setValue(data_edit.district);
    this.DataForm.controls['wards'].setValue(data_edit.wards);
    this.DataForm.controls['occupation'].setValue(data_edit.occupation);
    this.DataForm.controls['address'].setValue(data_edit.address);
    if (this.value_id != '0') {
      this.src_daidien = data_edit.logo;
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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "520px";
    dialogConfig.panelClass = "pd_dialog_none";
    dialogConfig.data = 'qr_enterprise';
    this.dialog.open(DialogUploadComponent, dialogConfig).afterClosed().subscribe(
      res => {
        if (res != null && res != '' && res != undefined) {
          if (gt == 'daidien') {
            this.src_daidien = res;
            this.DataForm.controls['logo'].setValue(res);
          }
          if (gt == 'bia') {
            this.src_bia = res;
          }
          if (gt == 'thuvienanh') {
            this.src_image.push(res);
          }
          if (gt == 'video') {
            this.src_video = '';
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
    console.log(evnt.option.value);
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
  auto_tinh_change(obj_input: any) {
    let val = obj_input.value;
    this.arr_tinh = this.arr_tinh_tmp.filter(option => option.name.toLowerCase().includes(val.toLowerCase()));
  }
  auto_huyen_chang(obj_input: any) {
    let val = obj_input.value;
    this.array_huyen = this.array_huyen_tmp.filter(option => option.name.toLowerCase().includes(val.toLowerCase()));
  }
  auto_xa_chang(obj_input: any) {
    let val = obj_input.value;
    this.array_xa = this.array_xa_tmp.filter(option => option.name.toLowerCase().includes(val.toLowerCase()));
  }
  UpdateData() {
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
    });

    console.log(arr_dynamic);
    if (Object.keys(arr_dynamic).length != 0) {
      myObj['additional'] = JSON.stringify(arr_dynamic);
    }
    myObj['nation'] = 'Việt Nam'
    console.log(myObj);
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
  name_change() {

  }
  taxcode_change() {

  }
  add_dynamic(name: string) {
    let index_dynamic = this.arr_dynamic.map(t => t.key).indexOf(name);
    if (index_dynamic == -1) {
      this.DataForm.addControl(name, new FormControl(''));
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

}
