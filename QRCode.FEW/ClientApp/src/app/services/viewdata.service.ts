import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { productview } from '../models/product';
import { enterprisview } from '../models/qr_enterprise';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ViewdataService {

  constructor(private dataSrv: DataService) { }
  get_view_product(id: string | number, id2: string | number) {
    let pro_obj: Observable<productview> = this.dataSrv.get('ViewData/product/' + id + '/' + id2) as Observable<productview>;
    return pro_obj;
  }
  get_view_enterprise(id: string | number) {
    let pro_obj: Observable<enterprisview> = this.dataSrv.get('ViewData/enterprise/' + id) as Observable<enterprisview>;
    return pro_obj;
  }
}
