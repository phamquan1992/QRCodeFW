import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService, StorageTranscoders } from 'ngx-webstorage-service';
import { nguoidung } from '../models/nguoidung';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  
  private numberStorage!: StorageService<number>;
  private stringStorage!: StorageService<string>;
  public UI: string = '996F1E39-17E2-4171-963A-F21B92E1228A';
  private SK = '2FA7DCC4-0E8B-461E-AD06-120C7A9E6D59';
  private TOKEN_KEY = '2FA7DCC4-0E8B-461E-AD06-120C7A9B54ER';
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.numberStorage = storage.withDefaultTranscoder(StorageTranscoders.NUMBER);
    this.stringStorage = storage.withDefaultTranscoder(StorageTranscoders.STRING);
  }
  public encrypt(data: any): string {
    data = JSON.stringify(data);
    data = CryptoJS.AES.encrypt(data, this.SK);
    return data.toString();
  }

  public decrypt(data: any): string {
    data = CryptoJS.AES.decrypt(data, this.SK);
    return data.toString(CryptoJS.enc.Utf8);
  }
  public getUserInfo(): nguoidung {
    let user = this.stringStorage.get(this.UI);
    if (user) {
      let userInfo = this.decrypt(user);
      return JSON.parse(JSON.parse(userInfo));
    }
    else {
      return undefined as unknown as nguoidung;
    }
  }

  public setUserInfo(user: nguoidung): void {
    return this.stringStorage.set(this.UI, this.encrypt(JSON.stringify(user)));
  }
  public getTokenInfo(): string {
    let token_value = this.stringStorage.get(this.TOKEN_KEY);
    if (token_value) {
      return this.decrypt(token_value);
    }
    else {
      return "";
    }
  }
  public setTokenInfo(token: string): void {
    return this.stringStorage.set(this.TOKEN_KEY, this.encrypt(token));
  }

  public getStringValue(key: string): string {
    return this.stringStorage.get(key) || '';
  }

  public removeUserValue(): void {
    ;
    return this.storage.remove(this.UI);
  }
  public removeTokenValue(): void {
    return this.storage.remove(this.TOKEN_KEY);
  }
  public removeLoginTime(): void {
    return this.storage.remove('Login_Time');
  }

  public setStringValue(key: string, value: string): void {
    return this.stringStorage.set(key, value);
  }

  public getNumberValue(key: string): number {
    return this.numberStorage.get(key) || 0;
  }

  public setNumberValue(key: string, value: number): void {
    return this.numberStorage.set(key, value);
  }

  public getAnyValue(key: string): any {
    return this.storage.get(key);
  }

  public setAnyValue(key: string, value: any): void {
    return this.storage.set(key, value);
  }

  public clear(): void {
    return this.storage.clear();
  }
  encryptUsingAES256(data: any) {
    let _key = CryptoJS.enc.Utf8.parse(this.SK);
    let _iv = CryptoJS.enc.Utf8.parse(this.SK);
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data), _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    let gt_tmp = encrypted.toString();
    return gt_tmp;
  }
  decryptUsingAES256(data: any) {
    let _key = CryptoJS.enc.Utf8.parse(this.SK);
    let _iv = CryptoJS.enc.Utf8.parse(this.SK);

    let gt_tmp = CryptoJS.AES.decrypt(
      data, _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
    return gt_tmp;
  }
}
