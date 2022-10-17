import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acountinfo',
  templateUrl: './acountinfo.component.html',
  styleUrls: ['./acountinfo.component.css']
})
export class AcountinfoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  show_info = false;
  dang_xuat() {
    this.router.navigate(['/qrcode-free']);
  }
}
