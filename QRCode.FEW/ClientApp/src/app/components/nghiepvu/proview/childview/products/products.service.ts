import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { category } from 'src/app/models/category';
import { Inputcustom } from 'src/app/models/Inputcustom';
import { product } from 'src/app/models/product';
import { qr_enterprise, qr_enterprise_excel } from 'src/app/models/qr_enterprise';
import { DataService } from 'src/app/services/data.service';
type AOA = any[][];

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  data!: Inputcustom[];

  exist_status = false;
  private _refeshRequired = new Subject<void>();
  get RefeshRequired() {
    return this._refeshRequired;
  }
  constructor(private dataSrv: DataService) {
  }
  refeshproduct() {
    this.RefeshRequired.next();
  }
  get_product_list() {
    return this.dataSrv.get('product') as Observable<product[]>;
  }
  delete_product(arr_id: number[]) {
    return this.dataSrv.delete_array('product/delete', arr_id);
  }
  delete_obj(id: string) {
    return this.dataSrv.delete('product/delete', id);
  }
  get_product(id: string | number) {
    let pro_obj: Observable<product> = this.dataSrv.get('product/object/' + id) as Observable<product>;
    return pro_obj;
  }
  get_detail_product(id: string | number) {
    id = id == '' ? '0' : id;
    let pro_obj: Observable<Inputcustom[]> = this.dataSrv.get('product/detail/' + id) as Observable<Inputcustom[]>;
    return pro_obj;
  }
  update_product(pro_obj: product) {
    return this.dataSrv.put('product/Update', pro_obj);
  }
  update_status(arr_product: product[]) {
    return this.dataSrv.put('product/ChangeStatus', arr_product);
  }
  add_product(pro_obj: product) {
    return this.dataSrv.post('product/Add', pro_obj);
  }
  Import(list: product[]) {
    return this.dataSrv.post('product/Import', list) as Observable<boolean>;
  }
  get_category() {
    return this.dataSrv.get('product/category') as Observable<category[]>;
  }
  get_list_company() {
    return this.dataSrv.get('qr_enterprise/list') as Observable<qr_enterprise[]>;
  }
  get_view_product(id: string | number) {
    let pro_obj: Observable<product> = this.dataSrv.get('ViewData/product/' + id) as Observable<product>;
    return pro_obj;
  }
  check_data(pro_obj: qr_enterprise_excel[]) {
    return this.dataSrv.post('qr_enterprise/GetInfoLocation', pro_obj) as Observable<qr_enterprise_excel[]>;
  }

  arr_mota = [
    { name: 'code', value: 'M?? s???n ph???m', require: false },
    { name: 'name', value: 'T??n s???n ph???m(*)', require: true },
    { name: 'category', value: 'M?? danh m???c(*)', require: true },
    { name: 'price', value: 'Gi?? s???n ph???m(*)', require: true },
    { name: 'slogan', value: 'Slogan(*)', require: true },
    { name: 'enterprise', value: 'T??n doanh nghi???p(*)', require: true },
    { name: 'logo', value: '???nh ?????i di???n(*)', require: true },
    { name: 'url_img', value: '???nh s???n ph???m', require: false },
    { name: 'url_iso', value: 'Ch???ng nh???n, ch???ng ch???', require: false },
    { name: 'url_barcode', value: 'M?? v???ch', require: false },
    { name: 'url_video', value: 'Video', require: false },
    { name: 'des_story', value: 'C??u chuy???n s???n ph???m', require: false },
    { name: 'des_manufactur', value: 'Quy tr??nh s???n xu???t', require: false },
    { name: 'des_pack', value: 'Quy c??ch ????ng g??i', require: false },
    { name: 'des_element', value: 'Th??nh ph???n', require: false },
    { name: 'des_uses', value: 'C??ng d???ng', require: false },
    { name: 'des_guide', value: 'H?????ng d???n s??? d???ng', require: false },
    { name: 'des_preserve', value: 'B???o qu???n', require: false },
    { name: 'des_startdate', value: 'Ng??y s???n xu???t', require: false },
    { name: 'des_enddate', value: 'H???n s??? d???ng', require: false },
    { name: 'dynamic_1', value: 'S??? c??ng b??? ch???t l?????ng', require: false },
    { name: 'dynamic_2', value: 'S??? c??ng b??? An to??n th???c ph???m', require: false },
    { name: 'dynamic_3', value: 'S??? c??ng b??? l??u h??nh', require: false },
    { name: 'dynamic_4', value: 'Ti??u chu???n ??p d???ng', require: false },
    { name: 'dynamic_5', value: 'Quy chu???n ??p d???ng', require: false },
    { name: 'dynamic_6', value: 'Ng??y gieo tr???ng', require: false },
    { name: 'dynamic_7', value: 'Ng??y thu ho???ch', require: false },
    { name: 'dynamic_8', value: 'Ng??y ????ng g??i', require: false },
    { name: 'dynamic_9', value: 'Ng??y ????a gi???ng v??o nu??i', require: false },
    { name: 'dynamic_10', value: 'Ng??y xu???t kho/xu???t b??n', require: false },
    { name: 'dynamic_11', value: 'L?? s???n xu???t', require: false },
    { name: 'dynamic_12', value: 'Ng??y b???t ?????u SX l?? h??ng', require: false },
    { name: 'dynamic_13', value: 'Ng??y ho??n th??nh l?? SX', require: false },
  ];
}
