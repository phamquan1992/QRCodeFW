import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { CornerDotType, CornerSquareType, DotType, NgxQrcodeStylingComponent, Options } from 'ngx-qrcode-styling';
import { optioncs } from 'src/app/models/optioncs';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css'],
  encapsulation: ViewEncapsulation.None,
  queries: {
    qrcode: new ViewChild('qrcode'),
  },
})
export class QrcodeComponent implements OnInit, OnChanges {

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.update_qr();
    if (this._is_download === 'download') {
      this.onDownload();
    }
  }

  ngOnInit(): void {
    this.config = {
      width: this._op_tion.witdth,
      height: this._op_tion.height,
      data: this.convert_data(this._op_tion.data),
      image: this._op_tion.image,
      margin: this._op_tion.margin,
      dotsOptions: {
        color: this._op_tion.dotcolor,
        type: this._op_tion.dotstyle == 'square' ? "square" : "dots",
      },
      backgroundOptions: {
        color: this._op_tion.background_color,
        round: this._op_tion.shape == 'square' ? 0 : 1000,
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 0
      },
      shape: this._op_tion.shape == 'square' ? "square" : "circle",
      qrOptions: {
        "mode": "Byte",
        "errorCorrectionLevel": "H"
      },
    };
  }
  qrcode!: NgxQrcodeStylingComponent;
  public config: Options = {

  };
  private _op_tion: optioncs = {
    data: '',
    image: '',
    witdth: 0,
    height: 0,
    margin: 0,
    dotstyle: '',
    cornersDot_type: '',
    cornerSquareType: '',
    dotcolor: '',
    background_color: '',
    shape: ''
  };

  @Input() set op_tion(value: optioncs) {
    this._op_tion = value;
  }
  _is_download: string = '';
  @Input() set is_download(value: string) {
    this._is_download = value;
  }
  onDownload(): void {
    this.qrcode.download('file-name.png').subscribe((res) => {
      // TO DO something!
      console.log('download:', res);
      this._is_download = '';
    });
  }
  convert_data(data: string) {
    return (window as any).unescape(encodeURIComponent(data));;
  }
  update_qr() {

    if (this.qrcode != undefined) {
      this.qrcode.update(this.qrcode.config, {
        width: this._op_tion.witdth,
        height: this._op_tion.height,
        data: this.convert_data(this._op_tion.data),
        image: this._op_tion.image,
        margin: this._op_tion.margin,
        dotsOptions: {
          color: this._op_tion.dotcolor,
          type: this.get_dot_style(this._op_tion.dotstyle),
        },
        cornersDotOptions: {
          type: this.get_cornersDot_type(this._op_tion.cornersDot_type),
        },
        cornersSquareOptions: {
          type: this.get_CornerSquareType(this._op_tion.cornerSquareType),
        },
        backgroundOptions: {
          color: this._op_tion.background_color,
          round: this._op_tion.shape == 'square' ? 0 : 1000,
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 0
        },
        shape: this._op_tion.shape == 'square' ? "square" : "circle",
        qrOptions: {
          "mode": "Byte",
          "errorCorrectionLevel": "H"
        },
      })
    }
  }
  get_dot_style(gt: string) {
    let result: DotType = "square";
    switch (gt) {
      case "dots":
        result = "dots";
        break;
      case "rounded":
        result = "rounded";
        break;
      case "classy":
        result = "classy";
        break;
      case "classy-rounded":
        result = "classy-rounded";
        break;
      case "square":
        result = "square";
        break;
      case "extra-rounded":
        result = "extra-rounded";
        break;
      default:
        result = "square";
        break;
    }
    return result;
  }
  get_cornersDot_type(gt: string) {
    let result: CornerDotType = "square";
    switch (gt) {
      case "None":
        result = "" as CornerDotType;
        break;
      case "dots":
        result = "dot";
        break;
      case "square":
        result = "square";
        break;
      default:
        result = "" as CornerDotType;
        break;
    }
    return result;
  }
  get_CornerSquareType(gt: string) {
    let result: CornerSquareType = "square";
    switch (gt) {
      case "None":
        result = "" as CornerSquareType;
        break;
      case "dots":
        result = "dot";
        break;
      case "square":
        result = "square";
        break;
      case "extra-rounded":
        result = "extra-rounded";
        break;
      default:
        result = "" as CornerSquareType;
        break;
    }
    return result;
  }

}
