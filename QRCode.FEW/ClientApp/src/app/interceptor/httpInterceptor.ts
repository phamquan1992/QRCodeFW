import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ObservableService } from '../services/observable.service';

@Injectable()
export class CLIInterceptor implements HttpInterceptor {
    private token = '';
    private headers = new HttpHeaders();
    constructor(private route: Router, private sharingService: ObservableService) {
        this.sharingService.getTokenValue().subscribe(t => { this.token = `Bearer ${t}`; });
    }
    getHearder() {
        this.headers = new HttpHeaders();
        this.token = this.token.replace('"', '').replace('"', '');
        this.headers = this.headers.set('Content-Type', 'application/json');
        this.headers = this.headers.set("Authorization", this.token);
    }
    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        debugger;
        if (this.route.url.indexOf('/login') < 0) {
            this.getHearder();
            httpRequest.clone({ headers: this.headers });
            this.sharingService.setCurrentPage(this.route.url);
        }

        return next.handle(httpRequest);
    }
}
