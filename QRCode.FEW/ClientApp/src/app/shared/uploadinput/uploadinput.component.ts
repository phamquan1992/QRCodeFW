import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-uploadinput',
  templateUrl: './uploadinput.component.html',
  styleUrls: ['./uploadinput.component.css']
})
export class UploadinputComponent implements OnInit {
  url_string = '';
  progress!: number;
  message!: string;
  @Output() public onUploadFinished = new EventEmitter();
  fileToUpload!: File;
  @Input() save_upload = '';
  @Input() type_upload = '';
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private messSrc: MessageService) {
    this.url_string = baseUrl;
  }

  ngOnInit(): void {
  }

  handleFileInput(gt: any) {
    this.fileToUpload = gt.files.item(0);
    console.log(this.fileToUpload);
    this.uploadFile(this.fileToUpload);
  }
  str_img: any;
  uploadFile = (fileToUpload: File) => {
    if (fileToUpload.type.indexOf(this.type_upload) == -1) {
      this.messSrc.error('File không đúng định dạng');
      this.onUploadFinished.emit('');
    } else {
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      this.http.post(this.url_string + 'api/' + this.save_upload, formData, { reportProgress: true, observe: 'events' })
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(event.loaded / fileToUpload.size * 100);

            }
            else if (event.type === HttpEventType.Response) {
              this.message = 'Upload success.';
              let gt = JSON.stringify(event.body);
              let js_object = gt.split(':');
              let src_img = this.replaceAll_char('"', '', js_object[1]);
              src_img = this.replaceAll_char('}', '', src_img);
              src_img = this.replaceAll_char('ClientApp/src', '.', src_img);
              console.log(src_img);
              this.str_img = src_img;
              this.onUploadFinished.emit(src_img);
              console.log('Uppload success');
            }
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });
    }
  }
  replaceAll_char(gt_old: string, gt_new: string, str_any: string) {
    if (gt_old != gt_new && gt_old != '')
      while (str_any.indexOf(gt_old) > -1) {
        str_any = str_any.replace(gt_old, gt_new);
      }
    return str_any;
  }
}
