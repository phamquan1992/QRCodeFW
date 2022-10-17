import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnChanges {
  showNav = true;
  hover_status = false;
  menu_pr_select = '';
  arr_menu_select: string[] = [];
  arr_menu_temp: string[] = [];
  status_menu = false;
  _drawer_status = false;
  @Input() set drawer_status(gt: boolean) {
    this._drawer_status = gt;
  };
  @Output() ten_form = new EventEmitter();
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.drawer_menu();
  }
  name_link = '';
  ngOnInit(): void {
  }
  menu_click(gt: string) {
    this.ten_form.emit(gt);
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
  select_link(gt: string) {
    this.name_link = gt;
  }
}
