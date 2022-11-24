import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { reset_obj, result_object } from '../models/optioncs';
import { qr_survey, survey_view } from '../models/qr_survey';
import { qr_survey_dtl } from '../models/qr_survey_dtl';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private dataSrc: DataService) { }
  add_survey(data: qr_survey) {
    return this.dataSrc.post('qr_survey/AddNew', data) as Observable<result_object>;
  }
  update_survey(data: qr_survey) {
    return this.dataSrc.put('qr_survey/Update', data) as Observable<result_object>;
  }
  active_survey(data: qr_survey) {
    return this.dataSrc.put('qr_survey/KichHoat', data) as Observable<boolean>;
  }
  get_object(id: string) {
    return this.dataSrc.get('qr_survey/GetObject/' + id) as Observable<survey_view>;
  }
  get_list(id: string) {
    return this.dataSrc.get('qr_survey/list/' + id) as Observable<survey_view[]>;
  }
  add_detail(data:qr_survey_dtl){
    return this.dataSrc.post('qr_survey/answer', data) as Observable<result_object>;
  }
  check_survey(id: string) {
    return this.dataSrc.get('qr_survey/CheckSurvey/' + id) as Observable<string>;
  }
  get_list_ks(id: string) {
    return this.dataSrc.get('qr_survey/Getsurveys/' + id) as Observable<qr_survey[]>;
  }
}
