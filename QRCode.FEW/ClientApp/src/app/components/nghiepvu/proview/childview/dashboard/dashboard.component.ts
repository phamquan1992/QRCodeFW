import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  arr_thongke = [
    {
      bg_color: 'bg-[#2F80ED]',
      name: 'Gói dịch vụ',
      so_luong: 2,
      image_src: './assets/images/diamond.png'
    },
    {
      bg_color: 'bg-[#85C440]',
      name: 'Sản phẩm',
      so_luong: 4,
      image_src: './assets/images/dashboard-box.png'
    },
    {
      bg_color: 'bg-[#EB5757]',
      name: 'Doanh nghiệp',
      so_luong: 1,
      image_src: './assets/images/dashboard-house.png'
    },
    {
      bg_color: 'bg-[#9B51E0]',
      name: 'QR Code',
      so_luong: 5,
      image_src: './assets/images/dashboard-crown.png'
    },
    {
      bg_color: 'bg-[#518AE0]',
      name: 'QR code miễm phí',
      so_luong: 0,
      image_src: './assets/images/dashboard-app.png'
    },
    {
      bg_color: 'bg-[#F7941E]',
      name: 'Khảo sát',
      so_luong: 0,
      image_src: './assets/images/dashboard-survey.png'
    }
  ];
  ngOnInit(): void {
  }

}
