import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompaniesService } from 'src/app/components/nghiepvu/proview/childview/companies/companies.service';
import { ProductsService } from 'src/app/components/nghiepvu/proview/childview/products/products.service';
import { category } from 'src/app/models/category';
import { product_excel } from 'src/app/models/product';
import { qr_enterprise, qr_enterprise_excel } from 'src/app/models/qr_enterprise';
import { CommonService } from 'src/app/services/common.service';
import { MessageService } from 'src/app/services/message.service';
import { SectorsService } from 'src/app/services/sectors.service';
import { location } from 'src/app/models/location';
import * as XLSX from 'xlsx';
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
  styleUrls: ['./importfile.component.css']
})
export class ImportfileComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ImportfileComponent>, private productSrv: ProductsService, @Inject(MAT_DIALOG_DATA) public type_import: string,
    private messSrv: MessageService, private commonSrv: CommonService, private producSrc: ProductsService, private companySrc: CompaniesService,
    private sectorSrc: SectorsService) { }

  title = 'Import tài liệu';
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  arr_product_data: product_excel[] = [];
  arr_enterprise_data: qr_enterprise_excel[] = [];
  arr_categogy: category[] = [];
  arr_doanhnghiep: qr_enterprise[] = [];
  arr_tinh: location[] = [];
  ngOnInit(): void {
    if (this.type_import === 'product') {
      this.title = "Import sản phẩm"
    }
    if (this.type_import === 'enterprise') {
      this.title = "Import doanh nghiệp cá nhân"
    }
    this.producSrc.get_category().subscribe(t => {
      this.arr_categogy = t;
    });
    this.producSrc.get_list_company().subscribe(t => {
      this.arr_doanhnghiep = t;
    });
    this.companySrc.get_location('00').subscribe(t => {
      this.arr_tinh = t;
    });
  }
  data: AOA = [
    [1, 2],
    [3, 4],
  ];
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
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
      //console.log(this.get_array_product());
      //
      if (this.type_import == 'product')
        this.get_array_product_v2();
      if (this.type_import == 'enterprise')
        this.get_array_enterprise();
    };
    reader.readAsBinaryString(target.files[0]);
  }
  Import_data() {
    if (this.type_import == 'product') {

    }
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

      const Objprise = JSON.parse(JSON.stringify(item_prise));
      row_itep.forEach(element => {
        let idex_result = arr_row_header.findIndex(t => t.index == element.index);
        if (idex_result != -1) {
          Objprise[arr_row_header[idex_result].name] = element.mota;
        }
      });
      arr_product.push(Objprise);
    }
    arr_product.map(t => {
      let gt1 = this.check_obj_product(t);
      t.err_str = gt1;
    });
    let check_valid = arr_product.filter(t => t.err_str);
    if (check_valid.length > 0) {
      this.messSrv.error("File excel không hợp lệ");
      return;
    }
    this.arr_product_data = arr_product;
    console.log(arr_product);
  }
  arr_mota_product = this.productSrv.arr_mota;
  check_obj_product(obj_check: product_excel) {
    const ObjJson = JSON.parse(JSON.stringify(obj_check));
    // let arr_prop_req = this.arr_mota_product.filter(t => t.require);
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
            let index_cat = this.arr_categogy.findIndex(t => t.name.toLowerCase() === gt_check.toLowerCase());
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
      console.log(element.require);
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
        }
      } else {
        if (gt_check != '') {
          console.log(element.name);
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
        err_str: ''
      };
      const Objprise = JSON.parse(JSON.stringify(item_prise));
      row_itep.forEach(element => {
        let idex_result = arr_row_header.findIndex(t => t.index == element.index);
        if (idex_result != -1) {
          Objprise[arr_row_header[idex_result].name] = element.mota;
        }
      });
      arr_prise.push(Objprise);
    }
    arr_prise.map(t => {
      let gt1 = this.check_obj_enterprise(t);
      t.err_str = gt1;     
    });
    let check_valid = arr_prise.filter(t => t.err_str);
    if (check_valid.length > 0) {
      this.messSrv.error("File excel không hợp lệ");
    }
    this.arr_enterprise_data = arr_prise;
    console.log(arr_prise);
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
}
