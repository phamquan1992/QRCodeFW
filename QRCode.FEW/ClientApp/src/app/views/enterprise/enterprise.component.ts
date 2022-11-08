import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CompaniesService } from 'src/app/components/nghiepvu/proview/childview/companies/companies.service';
import { qr_enterprise } from 'src/app/models/qr_enterprise';
export interface view_link_web {
  link: string;
  url_img: string;
  name: string;
}
@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.css']
})
export class EnterpriseComponent implements OnInit {

  arr_url = [
    { name: 'Website', url: './assets/images/icon-add-website.svg' },
    { name: 'Facebook', url: './assets/images/icon-facebook.svg' },
    { name: 'Shopee', url: './assets/images/icon-shopee.svg' },
    { name: 'Zalo', url: './assets/images/icon-zalo.svg' },
    { name: 'Instagram', url: './assets/images/icon-ig.svg' },
    { name: 'Tiktok', url: './assets/images/icon-tiktok.svg' },
    { name: 'Tiki', url: './assets/images/icon-tiki.svg' },
    { name: 'Youtube', url: './assets/images/icon-youtube.svg' },
    { name: 'Linkedin', url: './assets/images/icon-linkedin.svg' },
    { name: 'Lazada', url: './assets/images/icon-lazada.svg' },
    { name: 'Sendo', url: './assets/images/icon-sendo.svg' },
  ];
  arr_link!: view_link_web[];
  constructor(private congtySrc: CompaniesService) { }
  companyObj$!: Observable<qr_enterprise>;
  ngOnInit(): void {
    this.companyObj$ = this.congtySrc.get_object_cty('26');
    this.arr_link = [];
    this.companyObj$.subscribe(t => {
      if (t.additional != null && t.additional != '') {        
        const myObj = JSON.parse(t.additional);
        let arr_key = Object.keys(myObj);
        arr_key.forEach(element => {
          console.log(element + ' - ' + myObj[element]);
          let it_m: view_link_web = {
            link: '',
            url_img: '',
            name: ''
          };
          it_m.name = element;
          it_m.link = myObj[element];
          it_m.url_img = this.get_url(element);
          this.arr_link.push(it_m);
        });
      }
    });
  }
  get_url(name: string) {
    let index_tem = this.arr_url.findIndex(t => t.name == name);
    return this.arr_url[index_tem].url;
  }
}
