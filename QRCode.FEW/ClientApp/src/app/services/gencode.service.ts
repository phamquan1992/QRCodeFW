import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { qr_gencode } from '../models/qr_gencode';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class GencodeService {

  constructor(private dataSrv: DataService) { }
  add_gencode(data: qr_gencode) {
    return this.dataSrv.post('gencode/add', data) as Observable<boolean>;
  }
}
