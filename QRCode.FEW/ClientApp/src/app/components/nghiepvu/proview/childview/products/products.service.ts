import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Inputcustom } from 'src/app/models/Inputcustom';

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
  constructor() {
    this.data = [{
      Title: 'Mã sản phẩm',
      name: 'Ma_sp',
      is_require: true,
      is_visible: true,
      type: 'text',
      element: [],
      is_delete: false,
      value_ip: ''
    },
    {
      Title: 'Tên sản phẩm',
      name: 'Ten_sp',
      is_require: true,
      is_visible: true,
      type: 'text',
      element: [],
      is_delete: false,
      value_ip: ''
    }];
  }
  refeshproduct() {
    this.RefeshRequired.next();
  }
  showHideadd() {
    this.exist_status = !this.exist_status;
  }

}
