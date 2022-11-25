import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { count_obj, gencodeview, gencode_status, qr_gencode } from '../models/qr_gencode';
import { DataService } from './data.service';
import { ObservableService } from './observable.service';

@Injectable({
  providedIn: 'root'
})
export class GencodeService {

  constructor(private dataSrv: DataService) { }
  add_gencode(data: qr_gencode) {
    return this.dataSrv.post('gencode/add', data) as Observable<boolean>;
  }
  get_list(user_id: string) {
    return this.dataSrv.get('gencode/list/' + user_id) as Observable<gencodeview[]>;
  }
  get_list_id(type: string, user_id: string) {
    return this.dataSrv.get('gencode/getlist?type=' + type + '&userid=' + user_id) as Observable<number[]>;
  }
  check_obj(id: string, type_code: string) {
    return this.dataSrv.get('gencode/checkobj?id=' + id + '&type=' + type_code) as Observable<boolean>;
  }
  update_status(arr_product: gencode_status[]) {
    return this.dataSrv.put('gencode/ChangeActive', arr_product);
  }
  check_count(paymentid: number) {
    return this.dataSrv.get('gencode/CheckCount/' + paymentid) as Observable<boolean>;
  }
  sync_pack(sync_data: gencode_status[]) {
    return this.dataSrv.put('gencode/SyncPay', sync_data) as Observable<boolean>;
  }
  count_object(id: string) {
    return this.dataSrv.get('gencode/CountObject/' + id) as Observable<count_obj>;
  }
  
}
