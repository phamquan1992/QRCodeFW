import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { qr_survey } from '../models/qr_survey';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private dataSrc: DataService) { }
  add_survey(data: qr_survey) {
    return this.dataSrc.post('qr_survey/AddNew', data) as Observable<boolean>;
  }
  update_survey(data: qr_survey) {
    return this.dataSrc.put('qr_survey/Update', data) as Observable<boolean>;
  }
  active_survey(data: qr_survey) {
    return this.dataSrc.put('qr_survey/KichHoat', data) as Observable<boolean>;
  }
}
