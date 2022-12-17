import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { nguoidung } from '../models/nguoidung';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {
  private userInfo: BehaviorSubject<nguoidung>;
  private isAuthenticated: BehaviorSubject<boolean>;
  private currentPage: BehaviorSubject<string>;
  private currentToken: BehaviorSubject<string>;

  constructor(private storage: LocalStorageService) {
    let currUser = storage.getUserInfo();
    let curToken = storage.getTokenInfo();
    this.userInfo = new BehaviorSubject<nguoidung>(currUser);
    this.isAuthenticated = new BehaviorSubject<boolean>(currUser != undefined);
    this.currentPage = new BehaviorSubject<string>("");
    this.currentToken = new BehaviorSubject<string>(curToken);
  }
  getCurrentPage(): Observable<string> {
    return this.currentPage.asObservable();
  }

  setCurrentPage(newValue: any): void {
    this.currentPage.next(newValue);
  }

  getUserInfo(): Observable<nguoidung> {
    // let currUser = this.storage.getUserInfo();
    // this.userInfo = new BehaviorSubject<nguoidung>(currUser);
    return this.userInfo.asObservable();
  }

  setUserValue(newValue: nguoidung): void {
    this.userInfo.next(newValue);
    if (newValue == undefined) {
      this.setAuthenState(false);
      this.storage.removeUserValue();
    }
    else {
      this.setAuthenState(true);
      this.storage.setUserInfo(newValue);
    }
  }
  reMoveUserValue() {
    this.storage.removeUserValue();
    let currUser = this.storage.getUserInfo();
    this.userInfo = new BehaviorSubject<nguoidung>(currUser);
  }
  getTokenValue(): Observable<string> {
    return this.currentToken;
  }
  setTokenValue(str_token: string): void {
    this.currentToken.next(str_token);
    if (str_token == "")
      this.storage.removeTokenValue();
    else
      this.storage.setTokenInfo(str_token);
  }
  reMoveTokenValue() {
    this.storage.removeTokenValue();
  }
  removeLoginTime() {
    this.storage.removeLoginTime();
  }
  getAuthenState(): Observable<boolean> {
    let currUser = this.storage.getUserInfo();
    this.isAuthenticated = new BehaviorSubject<boolean>(currUser != undefined);
    this.isAuthenticated.asObservable().subscribe(t => console.log(' '));
    return this.isAuthenticated.asObservable();
  }

  private setAuthenState(newValue: any): void {
    this.isAuthenticated.next(newValue);
  }
}
