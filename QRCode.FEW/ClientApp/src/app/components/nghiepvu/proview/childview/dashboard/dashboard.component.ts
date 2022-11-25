import { Component, OnInit } from '@angular/core';
import { count_obj } from 'src/app/models/qr_gencode';
import { GencodeService } from 'src/app/services/gencode.service';
import { ObservableService } from 'src/app/services/observable.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private sharingSrv: ObservableService, private gencodeSrv: GencodeService) { }
  arr_thongke = [
    {
      bg_color: 'bg-[#2F80ED]',
      name: 'Gói dịch vụ',
      so_luong: 0,
      image_src: './assets/images/diamond.png',
      url_router: '/portal/payment'
    },
    {
      bg_color: 'bg-[#85C440]',
      name: 'Sản phẩm',
      so_luong: 4,
      image_src: './assets/images/dashboard-box.png',
      url_router: '/portal/products'
    },
    {
      bg_color: 'bg-[#EB5757]',
      name: 'Doanh nghiệp',
      so_luong: 1,
      image_src: './assets/images/dashboard-house.png',
      url_router: '/portal/companies'
    },
    {
      bg_color: 'bg-[#9B51E0]',
      name: 'QR Code',
      so_luong: 5,
      image_src: './assets/images/dashboard-crown.png',
      url_router: '/portal/gencode'
    },
    {
      bg_color: 'bg-[#F7941E]',
      name: 'Khảo sát',
      so_luong: 0,
      image_src: './assets/images/dashboard-survey.png',
      url_router: '/portal/survey'
    }
  ];
  obj_count: count_obj = {
    count_enterprise: 0,
    count_gencode: 0,
    count_payment: 0,
    count_product: 0,
    count_survey: 0
  };
  loading$ = false;
  ngOnInit(): void {
    this.loading$ = true;
    this.sharingSrv.getUserInfo().subscribe(t => {
      this.gencodeSrv.count_object(t.id).subscribe(v => {
        this.obj_count = v;
        this.arr_thongke = [
          {
            bg_color: 'bg-[#2F80ED]',
            name: 'Gói dịch vụ',
            so_luong: v.count_payment,
            image_src: './assets/images/diamond.png',
            url_router: '/portal/payment'
          },
          {
            bg_color: 'bg-[#85C440]',
            name: 'Sản phẩm',
            so_luong: v.count_product,
            image_src: './assets/images/dashboard-box.png',
            url_router: '/portal/products'
          },
          {
            bg_color: 'bg-[#EB5757]',
            name: 'Doanh nghiệp',
            so_luong: v.count_enterprise,
            image_src: './assets/images/dashboard-house.png',
            url_router: '/portal/companies'
          },
          {
            bg_color: 'bg-[#9B51E0]',
            name: 'QR Code',
            so_luong: v.count_gencode,
            image_src: './assets/images/dashboard-crown.png',
            url_router: '/portal/gencode'
          },
          {
            bg_color: 'bg-[#F7941E]',
            name: 'Khảo sát',
            so_luong: v.count_survey,
            image_src: './assets/images/dashboard-survey.png',
            url_router: '/portal/survey'
          }
        ];
        this.loading$ = false;
      });
    });
  }
  sync_form() {
    this.loading$ = true;
  }
}
