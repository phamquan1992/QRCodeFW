import { HostListener, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { CompaniesService } from '../components/nghiepvu/proview/childview/companies/companies.service';
import { LoginComponent } from '../components/share/login/login.component';
import { CommonService } from '../services/common.service';
import { LocalStorageService } from '../services/local-storage.service';
import { MessageService } from '../services/message.service';
import { ObservableService } from '../services/observable.service';
import { PaynemtService } from '../services/paynemt.service';

@Injectable({
  providedIn: 'root'
})
export class CanactiveGuard implements CanActivate {
  constructor(private router: Router, private storage: LocalStorageService, private messSrc: MessageService, private dialog: MatDialog,
    private _sharingService: ObservableService, private enterpriseSrc: CompaniesService, private commonSrv: CommonService) { }
  canActivate(
    route: ActivatedRouteSnapshot, state1: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let check_timeout = this.commonSrv.check_timeout();
    if (check_timeout) {
      this.router.navigate(['/qrcode-free']);
      return false;
    }
    let user = this.storage.getUserInfo();
    if (user != undefined) {
      this.enterpriseSrc.check_401().pipe(
        map(
          response => {
            return response;
          }),
        catchError(error => {
          this.messSrc.handError(error);
          this.router.navigate(['/qrcode-free']);
          return error;
        }));

      if (state1.url.indexOf('portal') > -1) {
        if (!user.active) {
          this.messSrc.warn('Bạn không có quyền hạn thực hiện chức năng này!');
        } else {
          if (!user.isadmin && state1.url.indexOf('portal/payment') > -1) {
            this.messSrc.warn('Bạn không có quyền hạn thực hiện chức năng này!');
            return false;
          }
          return user.active;
        }
      } else
        return true;
    }
    else {
      this.storage.removeTokenValue();
      this.storage.removeUserValue();
      this._sharingService.reMoveUserValue();
      this._sharingService.reMoveTokenValue();
      this.showDialog(state1);
    }

    return false;
  }
  showDialog(state1: RouterStateSnapshot) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = "95%";
    dialogConfig.panelClass = ['md:w-[900px]', 'md:h-[585px]', 'w-full', 'h-[95%]', 'magrin_pane'];
    dialogConfig.disableClose = true;
    this.dialog.open(LoginComponent, dialogConfig).afterClosed().subscribe(
      res => {
        this._sharingService.getUserInfo();
        this.router.navigate(['/qrcode-free']);
      }
    );
  }
}
