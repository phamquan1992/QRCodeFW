import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { qr_enterprise_excel } from '../models/qr_enterprise';
import { sectors } from '../models/sectors';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SectorsService {

  constructor(private dataSrc: DataService) { }
  getList() {
    return this.dataSrc.get('sectors/list/') as Observable<sectors[]>;
  }
  
}
