import { Component, Inject, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompaniesService } from 'src/app/components/nghiepvu/proview/childview/companies/companies.service';
import { ProductsService } from 'src/app/components/nghiepvu/proview/childview/products/products.service';
import { category } from 'src/app/models/category';
import { product, product_excel } from 'src/app/models/product';
import { qr_enterprise, qr_enterprise_excel } from 'src/app/models/qr_enterprise';
import { CommonService } from 'src/app/services/common.service';
import { MessageService } from 'src/app/services/message.service';
import { SectorsService } from 'src/app/services/sectors.service';
import { location } from 'src/app/models/location';
import * as XLSX from 'xlsx';
import { nguoidung } from 'src/app/models/nguoidung';
import { ObservableService } from 'src/app/services/observable.service';
import { temp_object, value_it } from 'src/app/models/optioncs';
type AOA = any[][];
export interface item_tmp {
  index: number;
  mota: string;
  name: string;
  row_index: number;
  require: boolean;
}
@Component({
  selector: 'app-importfile',
  templateUrl: './importfile.component.html',
  styleUrls: ['./importfile.component.css'],
})
export class ImportfileComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ImportfileComponent>, @Inject(MAT_DIALOG_DATA) public type_import: string,
    private messSrv: MessageService, private commonSrv: CommonService, private productSrv: ProductsService, private companySrc: CompaniesService,
    private sectorSrc: SectorsService, private sharringSrv: ObservableService) { }

  title = 'Import tài liệu';
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  arr_product_data: product_excel[] = [];
  arr_enterprise_data: qr_enterprise_excel[] = [];
  arr_categogy: category[] = [];
  arr_doanhnghiep: qr_enterprise[] = [];
  show_bt_error = false;
  arr_tinh: location[] = [];
  arr_des_enterprise = [
    { name: 'name', value: 'Tên doanh nghiệp, cá nhân(*)', require: true },
    { name: 'taxcode', value: 'Mã số thuế', require: false },
    { name: 'tel', value: 'Điện thoại liên hệ(*)', require: true },
    { name: 'fax', value: 'Fax', require: false },
    { name: 'province', value: 'Tỉnh, thành phố(*)', require: true },
    { name: 'district', value: 'Quận, huyện(*)', require: true },
    { name: 'wards', value: 'Xã, phường(*)', require: true },
    { name: 'sectors_code', value: 'Nhóm ngành(*)', require: true },
    { name: 'occupation', value: 'Nghề nghiệp(*)', require: true },
    { name: 'url_background', value: 'Ảnh bìa', require: false },
    { name: 'url_video', value: 'Video', require: false },
    { name: 'url_img', value: 'Ảnh doanh nghiệp, cá nhân', require: false },
    { name: 'logo', value: 'Ảnh đại diện(*)', require: false },
    { name: 'email', value: 'Email(*)', require: true },
    { name: 'address', value: 'Địa chỉ(*)', require: true },
    { name: 'Website', value: 'Website', require: false },
    { name: 'Facebook', value: 'Facebook', require: false },
    { name: 'Shopee', value: 'Shopee', require: false },
    { name: 'Zalo', value: 'Zalo', require: false },
    { name: 'Instagram', value: 'Instagram', require: false },
    { name: 'Tiktok', value: 'Tiktok', require: false },
    { name: 'Tiki', value: 'Tiki', require: false },
    { name: 'Youtube', value: 'Youtube', require: false },
    { name: 'Linkedin', value: 'Linkedin', require: false },
    { name: 'Lazada', value: 'Lazada', require: false },
    { name: 'Sendo', value: 'Sendo', require: false },
  ];
  user_info!: nguoidung;
  displayedColumns: string[] = this.arr_des_enterprise.map((col) => col.name);
  ngOnInit(): void {
    this.show_bt_error = false;
    if (this.type_import === 'product') {
      this.title = "Import sản phẩm"
    }
    if (this.type_import === 'enterprise') {
      this.title = "Import doanh nghiệp cá nhân"
    }
    this.productSrv.get_category().subscribe(t => {
      this.arr_categogy = t;
    });
    this.productSrv.get_list_company().subscribe(t => {
      this.arr_doanhnghiep = t;
    });
    this.companySrc.get_location('00').subscribe(t => {
      this.arr_tinh = t;
    });
    this.sharringSrv.getUserInfo().subscribe(t => this.user_info = t);
  }
  data: AOA = [
    [1, 2],
    [3, 4],
  ];
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length > 1) {
      this.messSrv.error("Không thể chọn nhiều file import");
      return;
    }
    if (target.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>XLSX.utils.sheet_to_json(ws, { header: 1 });
      if (this.type_import == 'product')
        this.get_array_product_v2();
      if (this.type_import == 'enterprise')
        this.get_array_enterprise();
    };
    reader.readAsBinaryString(target.files[0]);
  }
  Import_data() {
    if (this.type_import == 'product') {
      let arr_product_save: product[] = [];
      this.arr_product_data.forEach((item: product_excel) => {
        let dnindex = this.arr_doanhnghiep.findIndex(t => t.name.trim().toLowerCase() == item.enterprise.trim().toLowerCase());
        let dn_id = dnindex == -1 ? 0 : this.arr_doanhnghiep[dnindex].qrenterpriseid;
        let _tmp: product = {
          qrproductid: 0,
          name: item.name,
          code: item.code,
          category: item.category,
          price: Number(item.price),
          slogan: item.slogan,
          logo: item.logo,
          url_img: item.url_iso,
          url_iso: item.url_iso,
          url_barcode: item.url_barcode,
          des_story: item.des_story,
          des_manufactur: item.des_manufactur,
          des_pack: item.des_pack,
          des_element: item.des_element,
          des_uses: item.des_uses,
          des_guide: item.des_guide,
          des_preserve: item.des_preserve,
          des_startdate: item.des_startdate,
          des_enddate: item.des_enddate,
          url_video: item.url_video,
          lastcreated_date: new Date(),
          lastcreated_by: 0,
          additional: item.additional,
          status: false,
          created_by: Number(this.user_info.id),
          created_date: new Date(),
          enterpriseid: dn_id
        };
        arr_product_save.push(_tmp)
      });
      console.log(JSON.stringify(arr_product_save));
      this.productSrv.Import(arr_product_save).subscribe(t => {
        if (t) {
          this.messSrv.success('Import dữ liệu thành công!');
          this.dialogRef.close("Success");
        } else {
          this.messSrv.error('Có lỗi trong quá trình lưu dữ liệu!');
        }
      });
    }
    if (this.type_import == 'enterprise') {
      let arr_enterprise_save: qr_enterprise[] = [];
      this.arr_enterprise_data.forEach((item: qr_enterprise_excel) => {
        let _tmp: qr_enterprise = {
          qrenterpriseid: 0,
          name: item.name,
          taxcode: item.taxcode,
          tel: item.tel,
          email: item.email,
          fax: item.fax,
          logo: item.logo,
          nation: 'Việt Nam',
          province: item.province,
          district: item.district,
          wards: item.wards,
          occupation: item.occupation,
          additional: item.additional,
          created_date: new Date(),
          created_by: Number(this.user_info.id),
          lastcreated_date: new Date(),
          lastcreated_by: 0,
          status: false,
          address: item.address,
          sectors_code: item.sectors_code,
          url_background: item.url_background,
          url_video: item.url_video,
          url_img: item.url_img
        };
        arr_enterprise_save.push(_tmp);
      });
      console.log(JSON.stringify(arr_enterprise_save));
      this.companySrc.import(arr_enterprise_save).subscribe(t => {
        if (t) {
          this.messSrv.success('Import dữ liệu thành công!');
          this.dialogRef.close("Success");
        } else {
          this.messSrv.error('Có lỗi trong quá trình lưu dữ liệu!');
        }
      });
    }
  }
  Export_error() {
    let element = document.getElementById('table_err_product');
    if (this.type_import === 'enterprise') {
      element = document.getElementById('table_err_enter');
    }
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
  get_array_product() {
    let arr1: item_tmp[] = [];
    let demrow = 0;
    let arr_mota = this.productSrv.arr_mota;
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      demrow = demrow + 1;
      for (let index = 0; index < element.length; index++) {
        const element2 = element == undefined ? '' : (element[index] === undefined ? '' : element[index].toString().trim())
        let index_mota = arr_mota.findIndex(t => t.value.toLowerCase() == element2.toLowerCase());
        let tmp_rq = arr_mota[index_mota].require || false;
        let it_tmp: item_tmp = {
          index: index,
          mota: element2,
          name: index_mota == -1 ? '' : arr_mota[index_mota].name,
          row_index: demrow,
          require: tmp_rq
        };
        arr1.push(it_tmp);
      }
    }
    arr1 = arr1.filter(t => t.mota != '');
    let arr_row_1 = arr1.filter(t => t.row_index == 1);
    let arr_row_2 = arr1.filter(t => t.row_index == 2);
    let arr_value = arr1.filter(t => t.row_index > 2);
    let arr_result: item_tmp[] = [];
    let length_arr = Math.max(...arr_row_2.map(t => t.index));
    for (let index = 0; index <= length_arr; index++) {
      let idex_row1 = arr_row_1.findIndex(t => t.index == index);
      let idex_row2 = arr_row_2.findIndex(t => t.index == index);
      if (idex_row1 !== -1 && idex_row2 == -1) {
        arr_result.push(arr_row_1[idex_row1]);
      } else if (idex_row1 !== -1 && idex_row2 !== -1) {
        arr_result.push(arr_row_2[idex_row2]);
      } else {
        arr_result.push(arr_row_2[idex_row2]);
      }
    }
    let arr_product: product_excel[] = [];
    let length_ = Math.max(...arr_value.map(t => t.row_index));
    for (let index = 3; index <= length_; index++) {
      let row_itep = arr_value.filter(t => t.row_index == index);
      let it_product = {
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
        des_manufactur: '',
        des_pack: '',
        des_element: '',
        des_uses: '',
        des_guide: '',
        des_preserve: '',
        des_startdate: '',
        des_enddate: '',
        url_video: '',
        additional: '',
        enterprise: '',
        err_str: ''
      };
      const ObjProduct = JSON.parse(JSON.stringify(it_product));
      row_itep.forEach(element => {
        let idex_result = arr_result.findIndex(t => t.index == element.index);
        if (idex_result != -1) {
          ObjProduct[arr_result[idex_result].name] = element.mota;
        }
      });
      arr_product.push(ObjProduct);
    }
    return arr_product;
  }
  arr_product_header: item_tmp[] = [];
  displayedColumns2: string[] = [];
  get_array_product_v2() {
    let arr1: item_tmp[] = [];
    let demrow = 0;
    let arr_mota = this.productSrv.arr_mota;
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      demrow = demrow + 1;
      for (let index = 0; index < element.length; index++) {
        const element2 = element == undefined ? '' : (element[index] === undefined ? '' : element[index].toString().trim())
        let index_mota = arr_mota.findIndex(t => t.value.toLowerCase() == element2.toLowerCase());
        let it_tmp: item_tmp = {
          index: index,
          mota: element2,
          name: index_mota == -1 ? '' : arr_mota[index_mota].name,
          row_index: demrow,
          require: false
        };
        arr1.push(it_tmp);
      }
    }
    arr1 = arr1.filter(t => t.mota != '');
    let arr_row_header = arr1.filter(t => t.row_index == 1);
    this.arr_product_header = arr1.filter(t => t.row_index == 1);
    this.displayedColumns2 = this.arr_product_header.map((col) => col.name);
    this.displayedColumns2.push('err_str');
    let arr_row_value = arr1.filter(t => t.row_index > 1);
    let length_ = Math.max(...arr_row_value.map(t => t.row_index));
    let arr_product: product_excel[] = [];
    for (let index = 2; index <= length_; index++) {
      let row_itep = arr_row_value.filter(t => t.row_index == index);
      let item_prise: product_excel = {
        name: '',
        code: '',
        category: '',
        price: '',
        slogan: '',
        logo: '',
        url_img: '',
        url_iso: '',
        url_barcode: '',
        des_story: '',
        des_manufactur: '',
        des_pack: '',
        des_element: '',
        des_uses: '',
        des_guide: '',
        des_preserve: '',
        des_startdate: '',
        des_enddate: '',
        url_video: '',
        additional: '',
        enterprise: '',
        err_str: ''
      };

      let arr_dynamic2: temp_object[] = [];
      const Objprise = JSON.parse(JSON.stringify(item_prise));
      row_itep.forEach(element => {
        let idex_result = arr_row_header.findIndex(t => t.index == element.index);
        if (idex_result != -1) {
          Objprise[arr_row_header[idex_result].name] = element.mota;
          if (arr_row_header[idex_result].name.indexOf('dynamic_') != -1) {
            let index_dynamic = arr_mota.findIndex(t => t.name.toLowerCase() == arr_row_header[idex_result].name.toLowerCase());
            let tm_value: value_it = {
              title: arr_mota[index_dynamic].value,
              value: element.mota
            };
            let tmp_obj: temp_object = {
              key: arr_row_header[idex_result].name,
              values: tm_value
            };
            arr_dynamic2.push(tmp_obj);
          }
        }
      });
      Objprise['additional'] = JSON.stringify(arr_dynamic2);
      arr_product.push(Objprise);
    }
    arr_product.map(t => {
      let gt1 = this.check_obj_product(t);
      t.err_str = gt1;
    });
    this.arr_product_data = arr_product;
    console.log(JSON.stringify(this.arr_product_data));
    let check_valid = arr_product.filter(t => t.err_str);
    if (check_valid.length > 0) {
      this.show_bt_error = true;
      this.messSrv.error("File excel không hợp lệ");
      return;
    }

  }
  arr_mota_product = this.productSrv.arr_mota;
  check_obj_product(obj_check: product_excel) {
    const ObjJson = JSON.parse(JSON.stringify(obj_check));
    let arr_prop_req = this.arr_mota_product;
    let str_err = '';
    arr_prop_req.forEach(element => {
      let gt_check = ObjJson[element.name];
      if (element.require) {
        if (gt_check == '') {
          str_err = str_err + element.value + ' không được để trống' + ";";
        } else {
          if (element.name === 'price') {
            let isnum = /^\d+$/.test(gt_check);
            if (!isnum) {
              str_err = str_err + element.value + ' không phải là số' + ";";
            }
          }
          if (element.name === 'category') {
            let index_cat = this.arr_categogy.findIndex(t => t.code.toLowerCase() === gt_check.toLowerCase());
            if (index_cat === -1) {
              str_err = str_err + element.value + ' không tồn tại' + ";";
            }
          }
          if (element.name === 'enterprise') {
            let index_en = this.arr_doanhnghiep.findIndex(t => t.name.toLowerCase() === gt_check.toLowerCase());
            if (index_en === -1) {
              str_err = str_err + element.value + ' không tồn tại' + ";";
            }
          }
        }
      } else {
        if (gt_check != '') {
          if (element.name === 'price') {
            let isnum = /^\d+$/.test(gt_check);
            if (!isnum) {
              str_err = str_err + element.value + ' không phải là số' + ";";
            }
          }
        }
      }
    });
    return str_err;
  }
  check_obj_enterprise(obj_check: qr_enterprise_excel) {
    const ObjJson = JSON.parse(JSON.stringify(obj_check));

    let arr_prop_req = this.arr_des_enterprise;
    let str_err = '';
    arr_prop_req.forEach(element => {
      let gt_check = ObjJson[element.name];
      if (element.require) {
        if (gt_check == '') {
          str_err = str_err + element.value + ' không được để trống' + ";";
        } else {
          if (element.name === 'Website' || element.name === 'Facebook' || element.name === 'Shopee' || element.name === 'Zalo' || element.name === 'Instagram'
            || element.name === 'Tiktok' || element.name === 'Tiki' || element.name === 'Youtube' || element.name === 'Linkedin' || element.name === 'Lazada' || element.name === 'Lazada') {
            let isUrl = this.commonSrv.isValidHttpUrl(gt_check);
            if (!isUrl) {
              str_err = str_err + element.value + ' không đúng định dạng' + ";";
            }
          }
          if (element.name === 'email') {
            let check_email = this.get_isval(gt_check);
            if (!check_email) {
              str_err = str_err + element.value + ' không đúng định dạng' + ";";
            }
          }
          if (element.name === 'tel') {
            let isnum = /^\d+$/.test(gt_check);
            if (!isnum) {
              str_err = str_err + element.value + ' có chứa ký tự không phải là số' + ";";
            } else {
              if (gt_check.length > 12) {
                str_err = str_err + element.value + ' có tối đa 12 ký tự' + ";";
              }
              else if (gt_check.length < 9) {
                str_err = str_err + element.value + ' có tối thiểu 9 ký tự' + ";";
              }
            }
          }
        }
      } else {
        if (gt_check != '') {
          if (element.name === 'Website' || element.name === 'Facebook' || element.name === 'Shopee' || element.name === 'Zalo' || element.name === 'Instagram'
            || element.name === 'Tiktok' || element.name === 'Tiki' || element.name === 'Youtube' || element.name === 'Linkedin' || element.name === 'Lazada' || element.name === 'Lazada') {
            let isUrl = this.commonSrv.isValidHttpUrl(gt_check);
            if (!isUrl) {
              str_err = str_err + element.value + ' không đúng định dạng' + ";";
            }
          }
          if (element.name === 'email') {
            let check_email = this.get_isval(gt_check);
            if (!check_email) {
              str_err = str_err + element.value + ' không đúng định dạng' + ";";
            }
          }
          if (element.name === 'taxcode') {
            let isnum = /^\d+$/.test(gt_check);
            if (!isnum) {
              str_err = str_err + element.value + ' có chứa ký tự không phải là số' + ";";
            }
          }
        }
      }
    });
    return str_err;
  }
  get_isval(email: string) {
    if (email == '') {
      return true
    } else {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
  }
  arr_exprot: any[] = [];
  get_array_enterprise() {
    let arr1: item_tmp[] = [];
    let demrow = 0;
    let arr_mota = this.arr_des_enterprise;
    for (let index = 0; index < this.data.length; index++) {
      const element = this.data[index];
      demrow = demrow + 1;
      for (let index = 0; index < element.length; index++) {
        const element2 = element == undefined ? '' : (element[index] === undefined ? '' : element[index].toString().trim())
        let index_mota = arr_mota.findIndex(t => t.value.toLowerCase() == element2.toLowerCase());
        let tmp_rq = index_mota == -1 ? false : arr_mota[index_mota].require || false;
        let it_tmp: item_tmp = {
          index: index,
          mota: element2,
          name: index_mota == -1 ? '' : arr_mota[index_mota].name,
          row_index: demrow,
          require: tmp_rq
        };
        arr1.push(it_tmp);
      }
    }

    arr1 = arr1.filter(t => t.mota != '');
    let arr_row_header = arr1.filter(t => t.row_index == 1);
    let arr_row_value = arr1.filter(t => t.row_index > 1);
    let length_ = Math.max(...arr_row_value.map(t => t.row_index));
    let arr_prise: qr_enterprise_excel[] = [];
    for (let index = 2; index <= length_; index++) {
      let row_itep = arr_row_value.filter(t => t.row_index == index);
      let item_prise: qr_enterprise_excel = {
        name: '',
        taxcode: '',
        tel: '',
        email: '',
        fax: '',
        logo: '',
        nation: 'Việt Nam',
        province: '',
        district: '',
        wards: '',
        occupation: '',
        additional: '',
        address: '',
        sectors_code: '',
        url_background: '',
        url_video: '',
        url_img: '',
        err_str: '',
        Facebook: '',
        Instagram: '',
        Lazada: '',
        Linkedin: '',
        Sendo: '',
        Shopee: '',
        Tiki: '',
        Tiktok: '',
        Website: '',
        Youtube: '',
        Zalo: ''
      };
      const Objprise = JSON.parse(JSON.stringify(item_prise));
      let arr_dynamic = {};
      row_itep.forEach(element => {
        let idex_result = arr_row_header.findIndex(t => t.index == element.index);
        if (idex_result != -1) {
          Objprise[arr_row_header[idex_result].name] = element.mota;
          let name_key = arr_row_header[idex_result].name;
          if (name_key === 'Facebook' || name_key === 'Instagram' || name_key === 'Lazada' || name_key === 'Linkedin' || name_key === 'Sendo' || name_key === 'Shopee'
            || name_key === 'Tiki' || name_key === 'Tiktok' || name_key === 'Website' || name_key === 'Youtube' || name_key === 'Zalo') {
            if (Object.keys(arr_dynamic).length === 0) {
              let obj_dynamic = {
                [name_key]: element.mota
              };
              arr_dynamic = obj_dynamic;
            }
            else {
              const obj_dy = JSON.parse(JSON.stringify(arr_dynamic));
              obj_dy[name_key] = element.mota;
              arr_dynamic = obj_dy;
            }
          }
        }
        if (Object.keys(arr_dynamic).length != 0) {
          Objprise['additional'] = JSON.stringify(arr_dynamic);
        }
      });
      arr_prise.push(Objprise);
    }
    arr_prise.map(t => {
      let gt1 = this.check_obj_enterprise(t);
      t.err_str = gt1;
    });
    this.displayedColumns.push('err_str');
    console.log(JSON.stringify(arr_prise));
    this.productSrv.check_data(arr_prise).subscribe(t => {
      arr_prise.map(v => {
        let gt_tm3 = t.findIndex(m => m.name == v.name);
        v.err_str = t[gt_tm3].err_str;
      });
      this.arr_enterprise_data = arr_prise;
      this.arr_exprot = Object.values(arr_prise);
      let check_valid = arr_prise.filter(t => t.err_str);
      if (check_valid.length > 0) {
        this.show_bt_error = true;
        this.messSrv.error("File excel không hợp lệ");
      }
    });
  }

  download_template() {
    let file_name = '';
    if (this.type_import == 'product') {
      file_name = "product_template.xlsx";
    }
    if (this.type_import == 'enterprise') {
      file_name = "enterprise_template.xlsx";
    }
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = './assets/import_file/' + file_name;
    link.download = file_name;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  close_popup(gt: any) {
    this.dialogRef.close(gt);
  }


}
