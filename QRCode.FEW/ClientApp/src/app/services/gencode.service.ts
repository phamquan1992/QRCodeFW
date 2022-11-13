import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { gencodeview, qr_gencode } from '../models/qr_gencode';
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
}
