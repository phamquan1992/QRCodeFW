import { Component, HostListener, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginComponent } from './components/share/login/login.component';
import { SigninComponent } from './components/share/signin/signin.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ClientApp';
  shownav: boolean = false;
  status = '';
  is_login = false;
  public innerWidth: any;
  constructor(private dialog: MatDialog, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
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
  log_out() {
    this.is_login = false;
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
    if (status === 'login') {
      this.dialog.open(LoginComponent, dialogConfig).afterClosed().subscribe(
        res => {
          console.log('aaaaa');
          this.is_login = true;
        }
      );
    }
    if (status === 'singin') {
      this.dialog.open(SigninComponent, dialogConfig).afterClosed().subscribe(
        res => {
          // this.rowSelect = -1;
        }
      );
    }
  }
}
