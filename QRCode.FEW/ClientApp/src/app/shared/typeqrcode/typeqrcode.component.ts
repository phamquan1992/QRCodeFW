import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { image_obj } from 'src/app/models/image_obj';
import { optioncs } from 'src/app/models/optioncs';

@Component({
  selector: 'app-typeqrcode',
  templateUrl: './typeqrcode.component.html',
  styleUrls: ['./typeqrcode.component.css']
})
export class TypeqrcodeComponent implements OnInit, OnChanges {

  constructor(private datepipe: DatePipe) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.change_val();
  }
  _mau_chon = 'exist';
  img_select = '';
  @ViewChild("file")
  file!: ElementRef;
  @ViewChild("filepro")
  filepro!: ElementRef;
  openfile() {
    this.file.nativeElement.click();
  }
  openfilepro() {
    this.filepro.nativeElement.click();
  }
  options_circle: image_obj[] = [
    {
      name: 'IMG1',
      link_img: './assets/images/download20221006083333.png',
      dotstyle: 'dots',
      cornerSquareType: 'dots',
      cornersDot_type: 'dots',
      background_color: '#229b30',
      dotcolor: '#ffffff'
    },
    {
      name: 'IMG2',
      link_img: './assets/images/download20221006083517.png',
      dotstyle: 'classy',
      cornerSquareType: 'extra-rounded',
      cornersDot_type: 'None',
      background_color: '#2874af',
      dotcolor: '#ffffff'
    },
    {
      name: 'IMG3',
      link_img: './assets/images/download20221006083723.png',
      dotstyle: 'square',
      cornerSquareType: 'None',
      cornersDot_type: 'dots',
      background_color: '#b35719',
      dotcolor: '#ffffff'
    },
    {
      name: 'IMG4',
      link_img: './assets/images/download20221006083849.png',
      dotstyle: 'classy-rounded',
      cornerSquareType: 'None',
      cornersDot_type: 'None',
      background_color: '#cc1414',
      dotcolor: '#ffffff'
    },
    {
      name: 'IMG5',
      link_img: './assets/images/download20221006083919.png',
      dotstyle: 'rounded',
      cornerSquareType: 'None',
      cornersDot_type: 'None',
      background_color: '#4853ea',
      dotcolor: '#d79523'
    },
    {
      name: 'IMG6',
      link_img: './assets/images/download20221006083945.png',
      dotstyle: 'dots',
      cornerSquareType: 'extra-rounded',
      cornersDot_type: 'None',
      background_color: '#201980',
      dotcolor: '#e7dfe7'
    },
  ];
  options_square: image_obj[] = [
    {
      name: 'IMG1',
      link_img: './assets/images/download20221006084746.png',
      dotstyle: 'square',
      cornerSquareType: 'square',
      cornersDot_type: 'square',
      background_color: '#229b30',
      dotcolor: '#ffffff'
    },
    {
      name: 'IMG2',
      link_img: './assets/images/download20221006085220.png',
      dotstyle: 'classy',
      cornerSquareType: 'extra-rounded',
      cornersDot_type: 'None',
      background_color: '#2874af',
      dotcolor: '#ffffff'
    },
    {
      name: 'IMG3',
      link_img: './assets/images/download20221006085319.png',
      dotstyle: 'square',
      cornerSquareType: 'None',
      cornersDot_type: 'dots',
      background_color: '#b35719',
      dotcolor: '#ffffff'
    },
    {
      name: 'IMG4',
      link_img: './assets/images/download20221006085339.png',
      dotstyle: 'classy-rounded',
      cornerSquareType: 'None',
      cornersDot_type: 'None',
      background_color: '#cc1414',
      dotcolor: '#ffffff'
    },
    {
      name: 'IMG5',
      link_img: './assets/images/download20221006085357.png',
      dotstyle: 'rounded',
      cornerSquareType: 'None',
      cornersDot_type: 'None',
      background_color: '#4853ea',
      dotcolor: '#d79523'
    },
    {
      name: 'IMG6',
      link_img: './assets/images/download20221006085413.png',
      dotstyle: 'dots',
      cornerSquareType: 'extra-rounded',
      cornersDot_type: 'None',
      background_color: '#201980',
      dotcolor: '#e7dfe7'
    },
  ];

  option_defalut: image_obj[] = [
    {
      name: 'IMG_DF1',
      link_img: './assets/images/IMGDF_1.png',
      dotstyle: 'square',
      cornerSquareType: 'None',
      cornersDot_type: 'None',
      background_color: '#efecec',
      dotcolor: '#000000'
    },
    {
      name: 'IMG_DF2',
      link_img: './assets/images/IMGDF_2.png',
      dotstyle: 'dots',
      cornerSquareType: 'square',
      cornersDot_type: 'dots',
      background_color: '#efecec',
      dotcolor: '#000000'
    },
    {
      name: 'IMG_DF3',
      link_img: './assets/images/IMGDF_3.png',
      dotstyle: 'dots',
      cornerSquareType: 'None',
      cornersDot_type: 'None',
      background_color: '#efecec',
      dotcolor: '#000000'
    }
  ];
  option_icon = [
    {
      name: 'IMG_IC1',
      link_img: './assets/images/ic_facebook.png'
    },
    {
      name: 'IMG_IC2',
      link_img: './assets/images/ic_instagram.png'
    },
    {
      name: 'IMG_IC3',
      link_img: './assets/images/ic_zalo.png'
    }
  ];

  profesional = true;

  @Input() data = ' ';
  image = '';
  witdth = 300;
  height = 300;
  margin = 0;
  dotstyle = "square"; //"square" hoặc "dots"
  dotcolor = '#000000';
  background_color = '#ffffff';
  shape = 'square' //"square" hoặc "circle"
  cornersDot_type = 'None';
  cornerSquareType = 'None';
  op_tion: optioncs = new optioncs();
  thietke_draw = true;
  chon_icon = '';
  icon_count = 0;
  ngOnInit(): void {
    this.shape = this.profesional ? 'circle' : 'square';
    this._mau_chon = this.profesional ? 'exist' : 'self';
    this.select_img(this.profesional ? 'IMG1' : 'IMG_DF1');
  }
  onHinhChange(gt: string) {
    this.shape = gt;
    this.change_val();
  }
  onMauChange(gt: string) {
    this._mau_chon = gt;
    if (this._mau_chon == 'exist')
      this.select_img('IMG1');
    else
      this.select_img('IMG_DF1');
  }
  change_maunen() {
    this.change_val();
  }
  change_maucode() {
    this.change_val();
  }
  select_img(img_name: string) {
    this.img_select = img_name;
    if (this._mau_chon == 'exist') {
      this.chon_mau_exist(img_name);
    } else {
      this.chon_mau_self(img_name);
    }
  }
  chon_mau_exist(temlate_name: string) {
    if (this.shape == 'circle') {
      let temp_data = this.options_circle.filter(ft => ft.name == temlate_name);
      this.setpro_template(temp_data[0]);
    }
    else {
      let temp_data = this.options_square.filter(ft => ft.name == temlate_name);
      this.setpro_template(temp_data[0]);
    }
  }
  chon_mau_self(temlate_name: string) {
    let temp_data = this.option_defalut.filter(ft => ft.name == temlate_name);
    this.setpro_template(temp_data[0]);
  }

  setpro_template(obj_template: image_obj) {
    this.dotstyle = obj_template.dotstyle;
    this.cornerSquareType = obj_template.cornerSquareType;
    this.cornersDot_type = obj_template.cornersDot_type;
    this.background_color = obj_template.background_color;
    this.dotcolor = obj_template.dotcolor;
    this.change_val();
  }
  @Output() option_output = new EventEmitter<optioncs>();

  change_val() {
    this.op_tion = {
      data: this.data,
      image: this.image,
      witdth: this.witdth,
      height: this.height,
      margin: this.margin,
      dotstyle: this.dotstyle,
      cornersDot_type: this.cornersDot_type,
      cornerSquareType: this.cornerSquareType,
      dotcolor: this.dotcolor,
      background_color: this.background_color,
      shape: this.shape
    };
    this.option_output.emit(this.op_tion);
  }
  getFiles(event: any) {
    var newFileList = Array.from(event.target.files);
    console.log(newFileList);
    if (event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event2: any) => { // called once readAsDataURL is completed
        debugger;
        this.image = event2.target.result;
        let date_now = new Date();
        let _dem = 'IMG_TEMP' + this.datepipe.transform(date_now, 'yyyyMMddHHmmss');
        let it = {
          name: _dem,
          link_img: event2.target.result
        };
        this.chon_icon = _dem;
        this.option_icon.push(it);
        this.change_val();
      }
    }
  }
  drawer_card(gt: string) {
    this.thietke_draw = !this.thietke_draw;
  }

  action_select_ic(name_ic: string) {
    this.chon_icon = name_ic;
    let temp_data = this.option_icon.filter(ft => ft.name == name_ic);
    this.image = temp_data[0].link_img;
    this.change_val();
  }
  action_remove_ic(name_ic: string) {
    this.chon_icon = '';
    this.image = '';
    this.reset();
    this.change_val();
    if (name_ic.indexOf('IMG_TEMP') > -1) {
      const index = this.option_icon.findIndex(t => t.name == name_ic)
      if (index > -1) {
        this.option_icon.splice(index, 1);
      }
    }
  }
  reset() {
    if (this.profesional) {
      this.filepro.nativeElement.value = "";
    } else {
      this.file.nativeElement.value = "";
    }

  }
}
