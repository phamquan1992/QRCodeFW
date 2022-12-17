import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, shareReplay, Subject, tap } from 'rxjs';
import { ObservableService } from './observable.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url_str!: string;
  private headers = new HttpHeaders();
  private token = '';
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private sharingService: ObservableService, private mess: MessageService) {
    this.url_str = baseUrl + 'api/';
    this.sharingService.getTokenValue().subscribe(t => { this.token = `Bearer ${t}`; });
  }
  private _refeshrequired = new Subject<void>();
  get Refeshrequired() {
    return this._refeshrequired;
  }
  getHearder() {
    this.headers = new HttpHeaders();
    this.token = this.token.replace('"', '').replace('"', '');
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set("Authorization", this.token);
  }
  get(uri: string) {
    this.getHearder();
    const link = this.url_str + uri;
    return this.http.get(link, { headers: this.headers }).pipe(
      map(
        response => {
          return response;
        }),
      shareReplay(),
      catchError(error => {
        this.mess.handError(error);
        return error;
      }));
  }

  post(uri: string, data?: any) {

    this.getHearder();
    return this.http.post(this.url_str + uri, data, { headers: this.headers }).pipe(
      map(
        response => {
          return response;
        }
      ),
      tap(() => {
        this.Refeshrequired.next();
      }),
      catchError(error => {
        this.mess.handError(error);
        return error;
      })
    );
  }
  put(uri: string, data?: any) {
    this.getHearder();

    return this.http.put(this.url_str + uri, data, { headers: this.headers }).pipe(
      map(
        response => {
          return response;
        }
      ),
      tap(() => {
        this.Refeshrequired.next();
      }),
      catchError(error => {
        this.mess.handError(error);
        return error;
      })
    );
  }
  delete_array(uri: string, data?: any) {
    this.getHearder();
    const options = {
      headers: this.headers,
      body: JSON.stringify(data)
    }
    return this.http.delete(this.url_str + uri, options).pipe(
      map(
        response => {
          return response;
        }
      ),
      tap(() => {
        this.Refeshrequired.next();
      }),
      catchError(error => {
        this.mess.handError(error);
        return error;
      })
    );
  }
  delete(uri: string, id: string) {
    this.getHearder();
    return this.http.delete(this.url_str + uri + "/" + id, { headers: this.headers }).pipe(
      map(
        response => {
          return response;
        }
      ),
      tap(() => {
        this.Refeshrequired.next();
      }),
      catchError(error => {
        this.mess.handError(error);
        return error;
      })
    );
  }
}
