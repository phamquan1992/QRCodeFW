import { Component, HostListener, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
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
