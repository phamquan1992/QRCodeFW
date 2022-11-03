import { HostListener, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../components/share/login/login.component';
import { LocalStorageService } from '../services/local-storage.service';
import { MessageService } from '../services/message.service';
import { ObservableService } from '../services/observable.service';

@Injectable({
  providedIn: 'root'
})
export class CanactiveGuard implements CanActivate {
  constructor(private router: Router, private storage: LocalStorageService, private messSrc: MessageService, private dialog: MatDialog, private _sharingService: ObservableService) { }
  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(state.url);
    let user = this.storage.getUserInfo();
    if (user != undefined) {
      return true;
    }
    else {
      this.showDialog();
    }

    return false;
  }
  showDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = "95%";
    dialogConfig.panelClass = ['md:w-[900px]', 'md:h-[585px]', 'w-full', 'h-[95%]', 'magrin_pane'];
    dialogConfig.disableClose = true;
    this.dialog.open(LoginComponent, dialogConfig).afterClosed().subscribe(
      res => {
        this._sharingService.getUserInfo();
      }
    );
  }
}
