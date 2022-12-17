import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { menu } from 'src/app/models/menu';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  showNav = false;
  arr_slect: menu[] = [];
  parent_select!:menu;
  Menus: menu[] = [
    { title: 'Trang chủ', icon: 'fa fa-home', url: '/home' },
    {
      title: 'Danh mục', icon: 'fa fa-calendar-o', submenu: true, submenuItem: [
        { title: 'Danh mục đơn vị', icon: 'fa fa-industry', url: '/danhmuc/congty' },
        { title: 'Danh mục phòng ban', icon: 'fa fa-window-restore', url: '/danhmuc/phongban' },
        { title: 'Danh mục chức vụ', icon: 'fa fa-address-card', url: '/danhmuc/chucvu' },
        { title: 'Danh mục khách hàng/nhà cung cấp', icon: 'fa fa-shopping-bag', url: '/danhmuc/khachhang' },
        { title: 'Danh mục chuyên ngành', icon: 'fa fa-id-card', url: '/danhmuc/chuyennganh' },
        { title: 'Danh mục địa bàn hành chính', icon: 'fa fa-map-marker', url: '/danhmuc/diabanhc' },
        { title: 'Danh mục nhóm quản lý (team)', icon: 'fa fa-users', url: '/danhmuc/nhomqly' },
        { title: 'Danh mục phân loại dịch vụ', icon: 'fa fa-filter', url: '/danhmuc/pldichvu' },
        { title: 'Danh mục cấu hình hệ thống', icon: 'fa fa-cog', url: '/danhmuc/cauhinhht' },
      ]
    },
    { title: 'Quản lý nhân viên', icon: 'fa fa-user' },
    {
      title: 'Quản lý khách hàng', icon: 'fa fa-shopping-basket', submenu: true, submenuItem: [
        { title: 'Nhập dữ liêu', icon: 'fa fa-pencil-square',url: '/qlkhachhang/nhapdulieu' },
        { title: 'Phân công', icon: 'fa fa-sort-amount-asc' },
        { title: 'Báo cáo xử lý', icon: 'fa fa-flag' },
        { title: 'Đánh giá', icon: 'fa fa-calendar-check-o' },
      ]
    },
    {
      title: 'Quản lý hợp đồng mua/bán', icon: 'fa fa-newspaper-o', submenu: true, submenuItem: [
        { title: 'Tra cứu hợp đồng', icon: 'fa fa-file' },
        { title: 'Nhập dữ liệu hợp đồng mua/bán', icon: 'fa fa-pencil-square-o' },
        { title: 'Chi tiết hợp đồng', icon: 'fa fa-info-circle' },
        { title: 'Ghi doanh số hợp đồng', icon: 'fa fa-pencil' },

      ]
    },
    {
      title: 'Quản lý hệ thống', icon: 'fa fa-server', submenu: true, submenuItem: [
        { title: 'Quản lý người dùng', icon: 'fa fa-user' },
        { title: 'Quản lý chức năng', icon: 'fa fa-list-ul' },
        { title: 'Quản lý tác vụ, quyền hạn', icon: 'fa fa-list-ol' },
        { title: 'Quản lý vai trò', icon: 'fa fa-book' },
        { title: 'Quản lý phạm vi dữ liệu', icon: 'fa fa-compass' },
        { title: 'Lịch sử người dùng hệ thống', icon: 'fa fa-history' },
      ]
    },
  ];
  @Input() set drawer_status(gt: boolean) {
    this.showNav = gt;
    this.arr_slect = [];
  };
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    ;
  }
  name_link = '';
  ishover = false;
  ngOnInit(): void {
  }
  menu_click(gt: menu) {
    if (this.showNav && gt.submenu) {
      // let index = this.arr_slect.findIndex(t => t.title == gt.title);
      // if (index === -1)
      //   this.arr_slect.push(gt);
      // else
      //   this.arr_slect.splice(index, 1);
      if (this.arr_slect.length === 0)
        this.arr_slect.push(gt);
      else {
        let index = this.arr_slect.findIndex(t => t.title == gt.title);
        if (index !== -1) {
          this.arr_slect = [];
        } else {
          this.arr_slect = [];
          this.arr_slect.push(gt);
        }
      }
    }
  }
  hover_item(gt: menu) {
    if (!this.showNav) {
      if (this.arr_slect.length === 0)
        this.arr_slect.push(gt);
      else {
        this.arr_slect = [];
        this.arr_slect.push(gt);
      }
    }
  }
  leave_item() {
    if (!this.showNav) {
      this.arr_slect = [];
    }
  }

  get_item(gt: menu) {
    let index = this.arr_slect.findIndex(t => t.title == gt.title);
    return index !== -1;
  }

}
