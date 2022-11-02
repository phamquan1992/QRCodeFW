import { HostListener, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../components/share/login/login.component';
import { LocalStorageService } from '../services/local-storage.service';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class CanactiveGuard implements CanActivate {
  innerWidth: number = 0;
  constructor(private router: Router, private storage: LocalStorageService, private messSrc: MessageService,private dialog: MatDialog) { }
  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user = this.storage.getUserInfo();
    if (user != undefined) {
      return true;
    }
    else {
      //this.messSrc.error('Bạn cần đăng nhập để vào chức năng này');
      // this.router.navigate(['/qrcode-free']);
      console.log('Size: '+this.innerWidth);
      this.showDialog();
    }

    return false;
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }
  showDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    // dialogConfig.width = this.innerWidth >= 1024 ? '900px' : "100%";
    // dialogConfig.height = this.innerWidth >= 1024 ? '585px' : "100%";
    dialogConfig.maxWidth = this.innerWidth >= 1024 ? '' : "95%";
    dialogConfig.maxHeight = this.innerWidth >= 1024 ? '' : "95%";
    dialogConfig.panelClass =  ['md:w-[900px]','md:h-[585px]', 'w-full','h-auto'];
    dialogConfig.disableClose = true;
    this.dialog.open(LoginComponent, dialogConfig).afterClosed().subscribe(
      res => {
        //this.is_login = true;
      }
    );
  }
}
