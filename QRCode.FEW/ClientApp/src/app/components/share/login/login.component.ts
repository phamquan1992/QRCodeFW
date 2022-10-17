import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SigninComponent } from '../signin/signin.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<LoginComponent>, private router: Router) { }
    public innerWidth: any;
    show_icon = "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z";
    is_showpass = false;
    ngOnInit(): void {
        this.innerWidth = window.innerWidth;
    }
    @HostListener('window:resize', ['$event'])
    onResize() {
        this.innerWidth = window.innerWidth;
    }
    onClose() {
        this.dialogRef.close();
    }
    show_pass() {
        this.is_showpass = !this.is_showpass;
    }
    showDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = this.innerWidth >= 1024 ? '560px' : "95%";
        dialogConfig.height = this.innerWidth >= 1024 ? '736px' : "95%";
        dialogConfig.maxWidth = this.innerWidth >= 1024 ? '' : "95%";
        dialogConfig.maxHeight = this.innerWidth >= 1024 ? '' : "95%";
        dialogConfig.panelClass = "magrin_pane";
        this.dialog.open(SigninComponent, dialogConfig).afterClosed().subscribe(
            res => {
                // this.rowSelect = -1;
            }
        );
    }
    dang_nhap() {
        this.router.navigate(['/portal']);
        this.onClose();
    }
}
