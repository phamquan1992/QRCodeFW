import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
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
  delete_obj(id:string){
    return this.dataSrv.delete('product/delete',id);
  }
  get_product(id: string | number) {
    let pro_obj: product = {
      qrproductid: 0,
      name: '',
      code: '',
      category: '',
      url_img: '',
      url_video: '',
      url_iso: '',
      url_barcode: '',
      price: 0,
      slogan: '',
      logo: '',
      des_story: '',
      des_pack: '',
      des_element: '',
      des_uses: '',
      des_guide: '',
      des_preserve: '',
      lastcreated_date: null as any,
      lastcreated_by: 0,
      status: false
    };
    this.dataSrv.get('product/' + id).subscribe(t => pro_obj = t as product);
    return pro_obj;
  }
}
