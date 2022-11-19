import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { category } from 'src/app/models/category';
import { Inputcustom } from 'src/app/models/Inputcustom';
import { product } from 'src/app/models/product';
import { qr_enterprise } from 'src/app/models/qr_enterprise';
import { DataService } from 'src/app/services/data.service';

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
  update_status(arr_product: product[]){
    return this.dataSrv.put('product/ChangeStatus',arr_product);
  }
  add_product(pro_obj: product) {
    return this.dataSrv.post('product/Add', pro_obj);
  }
  get_category() {
    return this.dataSrv.get('product/category') as Observable<category[]>;
  }
  get_list_company(){
    return this.dataSrv.get('qr_enterprise/list') as Observable<qr_enterprise[]>;
  }
  get_view_product(id: string | number){
    let pro_obj: Observable<product> = this.dataSrv.get('ViewData/product/' + id) as Observable<product>;
    return pro_obj;
  }
}
