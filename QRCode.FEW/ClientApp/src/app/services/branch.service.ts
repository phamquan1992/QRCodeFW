import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { branch, result_object } from '../models/branch';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private dataSrv: DataService) { }
  get_list() {
    return this.dataSrv.get('branch') as Observable<branch[]>;
  }
  get_byid(id: number) {
    return this.dataSrv.get('branch/GetByID/' + id);
  }
  add_branch(branch_obj: branch) {
    return this.dataSrv.post('branch/Add', branch_obj) as Observable<result_object>;
  }
  update_branch(branch_obj: branch) {
    return this.dataSrv.put('branch/Update', branch_obj) as Observable<result_object>;
  }
  update_status(arr_product: branch[]) {
    return this.dataSrv.put('branch/ChangeStatus', arr_product);
  }
  delete_obj(id: string) {
    return this.dataSrv.delete('branch/delete', id) as Observable<result_object>;
  }
  delete_arr(arr_id: number[]) {
    return this.dataSrv.delete_array('branch/delete', arr_id) as Observable<result_object>;
  }
}
