import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { qr_his_scan } from '../models/qr_his_scan';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class HisscanService {

  constructor(private dataSrv: DataService) { }
  get_list(type: string, dataid: string) {
    return this.dataSrv.get('qr_his_scan/list?typecode=' + type + '&dataid=' + dataid) as Observable<qr_his_scan[]>;
  }
}
