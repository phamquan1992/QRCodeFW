import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { result_object, userdata } from '../models/optioncs';
import { productview, user_reset } from '../models/product';
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
  get_change_password(email: string) {
    let pro_obj: Observable<userdata> = this.dataSrv.get('SendMail/GetbyEmail/' + email) as Observable<userdata>;
    return pro_obj;
  }
  change_password(data: user_reset) {
    let pro_obj: Observable<result_object> = this.dataSrv.put('SendMail/ChangePass', data) as Observable<result_object>;
    return pro_obj;
  }
}
