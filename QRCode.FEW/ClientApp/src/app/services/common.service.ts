import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { ObservableService } from './observable.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private localSrv: LocalStorageService, private _sharingService: ObservableService) { }
  convertnotdau(str: string) {
    str = str.toLowerCase().trim();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    return str;
  }
  likevalue(str_first: string, str_second: string) {
    let gt_temp1 = this.convertnotdau(str_first);
    let gt_tem2 = this.convertnotdau(str_second);
    return gt_temp1.includes(gt_tem2);
  }
  equalvalue(str_first: string, str_second: string) {
    let gt_temp1 = this.convertnotdau(str_first);
    let gt_tem2 = this.convertnotdau(str_second);
    return gt_temp1 === gt_tem2;
  }
  isValidHttpUrl(gt: string) {
    let url;
    try {
      url = new URL(gt);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }
  replaceAll_char(gt_old: string, gt_new: string, str_any: string) {
    debugger;
    let gt_tmp = str_any;
    if (gt_old != gt_new && gt_old != '')
      while (gt_tmp.indexOf(gt_old) > -1) {
        gt_tmp = gt_tmp.replace(gt_old, gt_new);
      }
    console.log(gt_tmp);

    return gt_tmp;
  }
  mahoa_id(data: string) {
    let encrypt = this.localSrv.encryptUsingAES256(data);
    let gt_tmp = this.replaceAll_char("/", "|a|", encrypt);
    return gt_tmp;
  }
  giaima_id(data: string) {
    let gt_tmp = this.replaceAll_char("|a|", "/", data);
    let result = this.localSrv.decryptUsingAES256(gt_tmp);
    result = this.replaceAll_char('"', '', result);
    return result;
  }
  check_timeout() {
    let result = false;
    let time_save = this.localSrv.getStringValue('Login_Time');
    if (time_save != '') {
      let time_now = new Date();
      let time_cv = new Date(time_save);
      let time_count = time_now.getTime() - time_cv.getTime();
      let gt = this.convertMsToTime(time_count);
      console.log(gt);
      if (Number(gt) > 59) {
        result = true;
      }
    }
    return result;
  }
  convertMsToTime(milliseconds: number) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    // seconds = seconds % 60;
    // minutes = minutes % 60;
    // 👇️ If you want to roll hours over, e.g. 00 to 24
    // 👇️ uncomment the line below
    // uncommenting next line gets you `00:00:00` instead of `24:00:00`
    // or `12:15:31` instead of `36:15:31`, etc.
    // 👇️ (roll hours over)
    hours = hours % 24;
    //return `${this.padTo2Digits(hours)}:${this.padTo2Digits(minutes)}:${this.padTo2Digits( seconds,)}`;
    return `${this.padTo2Digits(minutes)}`;
  }
  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
}
