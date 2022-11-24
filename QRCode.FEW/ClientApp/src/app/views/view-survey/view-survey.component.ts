import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { LoginComponent } from 'src/app/components/share/login/login.component';
import { cauhoi } from 'src/app/models/cauhoi';
import { nguoidung } from 'src/app/models/nguoidung';
import { ObservableService } from 'src/app/services/observable.service';
import { SurveyService } from 'src/app/services/survey.service';
import { ViewdataService } from 'src/app/services/viewdata.service';

@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.css']
})
export class ViewSurveyComponent implements OnInit {

  constructor(private viewSrv: ViewdataService, private route: ActivatedRoute, private sharingSrc: ObservableService, private dialog: MatDialog) { }
  array_cauhoi: cauhoi[] = [];
  value_id = '';
  titile_ks = '';
  user_info!: nguoidung;
  ngOnInit(): void {
    console.log(this.route);
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
      this.array_cauhoi = t.list_cauhoi;
      this.titile_ks = t.object_edit.name;
    });
  }
  gui_traloi() {
    console.log(JSON.stringify(this.array_cauhoi));
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
