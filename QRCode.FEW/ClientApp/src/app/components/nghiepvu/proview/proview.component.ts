import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-proview',
  templateUrl: './proview.component.html',
  styleUrls: ['./proview.component.css']
})
export class ProviewComponent implements OnInit {
  showNav = false;
  hover_status = false;
  menu_pr_select = '';
  arr_menu_select: string[] = [];
  arr_menu_temp: string[] = [];
  status_menu = false;
  ten_form_visible = '';
  ngOnInit(): void {

  }
  showtenform(gt: any) {
    debugger;
    this.ten_form_visible = gt;
  }
  hover_menu() {
    this.hover_status = true;
    this.arr_menu_select.forEach(element => {
      this.check_visible(element);
    });
    this.arr_menu_select = this.arr_menu_temp;
  }
  leave_menu() {
    if (!this.showNav) {
      this.hover_status = false;
      this.arr_menu_temp = this.arr_menu_select;
      this.arr_menu_select = [];
    }
  }
  drawer_menu() {
    this.showNav = !this.showNav;
    if (!this.showNav) {
      this.hover_status = false;
      this.arr_menu_temp = this.arr_menu_select;
      this.arr_menu_select = [];
    }
  }
  onButtonClick(gt: string) {
    const index = this.arr_menu_select.findIndex(t => t == 'doituong');
    if (index == -1)
      this.arr_menu_select.push(gt);
    else
      this.arr_menu_select.splice(index);
  }
  check_visible(gt: string) {
    const index = this.arr_menu_select.findIndex(t => t == gt);
    return index > -1 ? true : false;
  }
}
