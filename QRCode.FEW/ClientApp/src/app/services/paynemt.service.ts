import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { package_objet, qr_payment } from '../models/qr_payment';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PaynemtService {

  constructor(private dataSrv: DataService) { }
  get_payment_list(userid: number) {
    return this.dataSrv.get('qr_payment/GetListPay/' + userid) as Observable<qr_payment[]>;
  }
  add_payment(pqy_obj: qr_payment) {
    return this.dataSrv.post('qr_payment/Add', pqy_obj) as Observable<boolean>;
  }
  check_payment_user(userid: string) {
    return this.dataSrv.get('qr_payment/CheckpayUser/'+userid) as Observable<boolean>;
  }
  active_payment(pqy_obj: qr_payment) {
    return this.dataSrv.post('qr_payment/Active', pqy_obj);
  }
  Getpack() {
    return this.dataSrv.get('qr_payment/Getpack') as Observable<package_objet[]>;
  }
}
