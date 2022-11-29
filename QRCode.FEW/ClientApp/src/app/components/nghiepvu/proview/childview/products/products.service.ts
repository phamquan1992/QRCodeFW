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
    { name: 'code', value: 'Mã sản phẩm', require: false },
    { name: 'name', value: 'Tên sản phẩm(*)', require: true },
    { name: 'category', value: 'Mã danh mục(*)', require: true },
    { name: 'price', value: 'Giá sản phẩm(*)', require: true },
    { name: 'slogan', value: 'Slogan(*)', require: true },
    { name: 'enterprise', value: 'Tên doanh nghiệp(*)', require: true },
    { name: 'logo', value: 'Ảnh đại diện(*)', require: true },
    { name: 'url_img', value: 'Ảnh sản phẩm', require: false },
    { name: 'url_iso', value: 'Chứng nhận, chứng chỉ', require: false },
    { name: 'url_barcode', value: 'Mã vạch', require: false },
    { name: 'url_video', value: 'Video', require: false },
    { name: 'des_story', value: 'Câu chuyện sản phẩm', require: false },
    { name: 'des_manufactur', value: 'Quy trình sản xuất', require: false },
    { name: 'des_pack', value: 'Quy cách đóng gói', require: false },
    { name: 'des_element', value: 'Thành phần', require: false },
    { name: 'des_uses', value: 'Công dụng', require: false },
    { name: 'des_guide', value: 'Hướng dẫn sử dụng', require: false },
    { name: 'des_preserve', value: 'Bảo quản', require: false },
    { name: 'des_startdate', value: 'Ngày sản xuất', require: false },
    { name: 'des_enddate', value: 'Hạn sử dụng', require: false },
    { name: 'dynamic_1', value: 'Số công bố chất lượng', require: false },
    { name: 'dynamic_2', value: 'Số công bố An toàn thực phẩm', require: false },
    { name: 'dynamic_3', value: 'Số công bố lưu hành', require: false },
    { name: 'dynamic_4', value: 'Tiêu chuẩn áp dụng', require: false },
    { name: 'dynamic_5', value: 'Quy chuẩn áp dụng', require: false },
    { name: 'dynamic_6', value: 'Ngày gieo trồng', require: false },
    { name: 'dynamic_7', value: 'Ngày thu hoạch', require: false },
    { name: 'dynamic_8', value: 'Ngày đóng gói', require: false },
    { name: 'dynamic_9', value: 'Ngày đưa giống vào nuôi', require: false },
    { name: 'dynamic_10', value: 'Ngày xuất kho/xuất bán', require: false },
    { name: 'dynamic_11', value: 'Lô sản xuất', require: false },
    { name: 'dynamic_12', value: 'Ngày bắt đầu SX lô hàng', require: false },
    { name: 'dynamic_13', value: 'Ngày hoàn thành lô SX', require: false },
  ];
}
