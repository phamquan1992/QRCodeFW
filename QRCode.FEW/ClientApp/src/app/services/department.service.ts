import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { result_object } from '../models/branch';
import { department } from '../models/department';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private dataSrv: DataService) { }
  get_list() {
    return this.dataSrv.get('department') as Observable<department[]>;
  }
  get_byid(id: number) {
    return this.dataSrv.get('department/GetByID/' + id);
  }
  add_department(department_obj: department) {
    return this.dataSrv.post('department/Add', department_obj) as Observable<result_object>;
  }
  update_department(department_obj: department) {
    return this.dataSrv.put('department/Update', department_obj) as Observable<result_object>;
  }
  update_status(arr_department: department[]) {
    return this.dataSrv.put('department/ChangeStatus', arr_department);
  }
  delete_obj(id: string) {
    return this.dataSrv.delete('department/delete', id) as Observable<result_object>;
  }
  delete_arr(arr_id: number[]) {
    return this.dataSrv.delete_array('department/delete', arr_id) as Observable<result_object>;
  }
  f5_service() {
    return this.dataSrv.Refeshrequired;
  }
}
