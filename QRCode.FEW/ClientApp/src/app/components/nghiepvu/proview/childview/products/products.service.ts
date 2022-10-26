import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Inputcustom } from 'src/app/models/Inputcustom';
import { product } from 'src/app/models/product';
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
    return this.dataSrv.get('product');
  }
  delete_product(arr_id: number[]) {
    return this.dataSrv.delete_array('product/delete', arr_id);
  }
  delete_obj(id: string) {
    return this.dataSrv.delete('product/delete', id);
  }
  get_product(id: string | number) {
    console.log(id);
    let pro_obj: Observable<product> = this.dataSrv.get('product/' + id) as Observable<product>;
    return pro_obj;
  }
  get_detail_product(id: string | number) {
    id = id == '' ? '0' : id;
    let pro_obj: Observable<Inputcustom[]> = this.dataSrv.get('product/detail/' + id) as Observable<Inputcustom[]>;
    return pro_obj;
  }
}
