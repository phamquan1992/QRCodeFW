import { Component, HostListener, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { nguoidung } from 'src/app/models/nguoidung';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ObservableService } from 'src/app/services/observable.service';
import { LoginComponent } from '../../share/login/login.component';
import { SigninComponent } from '../../share/signin/signin.component';

@Component({
  selector: 'app-freeview',
  templateUrl: './freeview.component.html',
  styleUrls: ['./freeview.component.css']
})
export class FreeviewComponent implements OnInit {
  shownav: boolean = false;
  status = '';
  is_login = false;
  public nguoidung: nguoidung = {
    email: '',
    id: '',
    sodt: '',
    token: ''
  };
  currUser!: Observable<nguoidung>;

  public innerWidth: any;
  constructor(private dialog: MatDialog, private route: ActivatedRoute, private router: Router, private _sharingService: ObservableService, private storage: LocalStorageService) {

  }
  ngOnInit(): void {
    this.currUser = this._sharingService.getUserInfo();
    this.currUser.subscribe(
      t => {
        if (t != undefined) {
          this.nguoidung = t;
        }
        else {
          this.nguoidung = {
            email: '',
            id: '',
            sodt: '',
            token: ''
          };
        }
      }
    );
    this._sharingService.getAuthenState().subscribe(
      t => this.is_login = t
    );

    this.innerWidth = window.innerWidth;
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }
  drawer_click() {
    this.shownav = !this.shownav;
  }
  onRouterLinkActive(event: any) {
    console.log(event);
  }
  dang_nhap() {
    //this.is_login = false;
    if (this.is_login === false)
      this.showDialog('login');
  }
  tao_db() {
    this.router.navigate(['/portal']);
  }
  log_out() {
    this.is_login = false;
    this._sharingService.reMoveUserValue();
    this.router.navigate(['/qrcode-free']);
    this.nguoidung = {
      email: '',
      id: '',
      sodt: '',
      token: ''
    };
  }
  showDialog(status: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = this.innerWidth >= 1024 ? '900px' : "100%";
    dialogConfig.height = this.innerWidth >= 1024 ? '585px' : "100%";
    dialogConfig.maxWidth = this.innerWidth >= 1024 ? '' : "95%";
    dialogConfig.maxHeight = this.innerWidth >= 1024 ? '' : "95%";
    dialogConfig.panelClass = "magrin_pane";
    dialogConfig.disableClose = true;
    this.dialog.open(LoginComponent, dialogConfig).afterClosed().subscribe(
      res => {
        this._sharingService.getUserInfo();
      }
    );
  }

}
