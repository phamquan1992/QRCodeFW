import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { productview } from '../models/product';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ViewdataService {

  constructor(private dataSrv: DataService) { }
  get_view_product(id: string | number){
    let pro_obj: Observable<productview> = this.dataSrv.get('ViewData/product/' + id) as Observable<productview>;
    return pro_obj;
  }
}
