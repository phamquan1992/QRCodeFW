import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { LoginComponent } from 'src/app/components/share/login/login.component';
import { cauhoi } from 'src/app/models/cauhoi';
import { nguoidung } from 'src/app/models/nguoidung';
import { result_object } from 'src/app/models/optioncs';
import { qr_survey } from 'src/app/models/qr_survey';
import { qr_survey_dtl } from 'src/app/models/qr_survey_dtl';
import { MessageService } from 'src/app/services/message.service';
import { ObservableService } from 'src/app/services/observable.service';
import { SurveyService } from 'src/app/services/survey.service';
import { ViewdataService } from 'src/app/services/viewdata.service';

@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.css']
})
export class ViewSurveyComponent implements OnInit {

  constructor(private viewSrv: ViewdataService, private route: ActivatedRoute, private sharingSrc: ObservableService, private dialog: MatDialog, private surveySrv: SurveyService, private messSrv: MessageService, private router: Router) { }
  array_cauhoi: cauhoi[] = [];
  value_id = '';
  titile_ks = '';
  user_info!: nguoidung;
  survey_id_tmp = 0;

  ngOnInit(): void {
    this.sharingSrc.getUserInfo().pipe(
      map(obj => obj == null)
    );
    this.sharingSrc.getUserInfo().subscribe(t => {
      this.get_data();
      this.user_info = t;
    });
  }
  get_data() {
    let id = this.route.snapshot.paramMap.get('id');
    this.value_id = id == null ? '0' : id.toString();

    this.viewSrv.get_object(this.value_id).subscribe(t => {
      if(t.error!=='Success'){
        this.router.navigate(['/views/end/' + t.error]);
      }else{
        this.array_cauhoi = t.result.list_cauhoi;
        this.titile_ks = t.result.object_edit.name;
        this.survey_id_tmp = t.result.object_edit.qrsurveyid;
      }
     
      
      // this.surveySrv.check_survey(this.survey_id_tmp.toString()).subscribe(t => {
      //   if (t !== 'Success') {
      //     this.router.navigate(['end/' + t]);
      //   }
      // });
    });
  }
  gui_traloi() {
    let detail_sur: qr_survey_dtl = {
      qrsurveydtlid: 0,
      qrsurveyid: this.survey_id_tmp,
      userid: Number(this.user_info.id),
      additional: JSON.stringify(this.array_cauhoi),
      created_date: new Date(),
      created_by: Number(this.user_info.id)
    };
    this.surveySrv.add_detail(detail_sur).subscribe(t => {
      if (t.result == 'ErrorEx') {
        console.log(t.error);
      }
      this.router.navigate(['/views/end/' + t.result]);
    });
  }
  dang_nhap() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = "95%";
    dialogConfig.panelClass = ['md:w-[900px]', 'md:h-[585px]', 'w-full', 'h-[95%]', 'magrin_pane'];
    dialogConfig.disableClose = true;
    dialogConfig.data = 'views/survey';
    this.dialog.open(LoginComponent, dialogConfig).afterClosed().subscribe(
      res => {
        //this.sharingSrc.getUserInfo();
      }
    );
  }
  log_out() {
    //this.is_login = false;    
    this.sharingSrc.reMoveUserValue();
    this.sharingSrc.reMoveTokenValue();
    this.sharingSrc.getUserInfo().pipe(
      map(obj => obj == null)
    );
    this.sharingSrc.getUserInfo().subscribe(t => {
      this.get_data();
      this.user_info = t;
    });
  }
}
