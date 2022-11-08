import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/components/share/login/login.component';
import { package_objet } from 'src/app/models/qr_payment';
import { ObservableService } from 'src/app/services/observable.service';
import { PaynemtService } from 'src/app/services/paynemt.service';
import { DangkyComponent } from './dangky/dangky.component';

@Component({
  selector: 'app-dichvu',
  templateUrl: './dichvu.component.html',
  styleUrls: ['./dichvu.component.css']
})
export class DichvuComponent implements OnInit {

  constructor(private sharingSrc: ObservableService, private dialog: MatDialog, private paymentSrc: PaynemtService) { }

  showdv1 = false;
  showdv2 = false;
  showdv3 = false;
  showdv4 = false;
  arr_pack!: package_objet[];
  pkg_code = '';
  pkg_time = '';
  pkg_price = '0';
  src_img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAWCAYAAADTlvzyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJ3SURBVHgBtVavdxpBEJ69NZVXV4mMpC5VHChw1NU1ca1KcDXAHSDqoKqyQVaRqhB1F9VK6uKCjLz8AUC+yZvLGy7LBfJj3tt3u7Oz+83OfLN7pt/vx6vVKiCiVqfTGdErCDCOgBGim3jolEQ/xESXXlh4T2DwQXy0sq1UKn+MMU1RBNVq1Y/j+JyeKWEY+rVa7Se6xzwG6AytYbJJz/N+odtUkx+hn9MTBOtKOMQErSyq0+VyeQh9arRhFEUhjLKwzmFU3RWUweB8jG5JnP/R7XaPs3mrjRNIEATANAGGPocaIb+A+pq2EICVAfYX3XcCFgHsm7ax+UUMCpD/AKvzQny/IK83yOu/AiwaDAaf8ZmivUFL0b4C7AHrrWsxMC8Bei6gTKY6CEAAvXDZKyaycCoaAJu6bA0Thjd15SqfD8gItdrSNr1eb0jCRCrIO4eb5w0WXPGGOE3YbrcjF6hmHE6SMIO5b62dyKVBmE8WiwUzO83voZyaGzAzFpKw3NM3vwh2I9gdZSeRb0mcWGOictbXTnG5WeRrDGa+xWb70O3h+4kvA+jXQDGeagZLczJRReYM3X2xG8OuYV2bSTm4QBNmLLp1UR26mCjlcYZ99pRTdxFYK3zEmpVDGaYS3lOX9zzvCj10AcAmWQQo9yiYxxZsIpNL5FUYKYeZRIm2cRX+HOH8rS/0ohpUYFyL32XI5fEBYLO8ndm0gaMGT7BJKx9Gufg5DQc8fuzi92gzIHv5Ht0shwc4dSz5u3eKdQpsjFZ44W88oRbXK3LnbcGr8CxAFyipWqQdfk+2BmRBqJryUGdAqYCdbLvHToACmpGJhPazXdbfAtKgiXcsDjC6AAAAAElFTkSuQmCC';
  src_img_late = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAWCAYAAADTlvzyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJqSURBVHgBrVUtd9swFJVsMmgYGDjYwqI4QS1LWNnaX9CEDcXOBxhLxsZ2xsqysQ45YxtqxzpUw7JlbCRJ7815OkdVZMfu6TtHlqyPd9+T7pW0qmlpmh4FQbBge7PZtPGf11kf1Jk8nU7fASxDs8mC9i0Au3V8hFUnTiaTq+12+wnNNygrlEeUhtb6vNPpqCzLflTxUynD8Xg8A9hcfnNs5TG3k212YCxFQEkVX7psENsVYdtmaF6I4zuUnjk31E1kuEA5kiVfEcgl+ldFPoMSMDrLLLAvKM9Iwjb7OCZdXTnXpqqTIRdY5CDYKEmSVJXYaDRKEaDZ1ryIwaEHLBawhnQNAPZBHbAlLI5jYOoYvxHqi1ar9QvdeSEgmYiJ10qYiCjPAHbtCSqC8wacrVxQgPyGj1MD2m63/4HBP82cwAJLHCZyS5YumGjxL8oD2Nv3BEPiHCthMGxmM3iXIRZ+RrVbLEw8w8J715kTFO3Up0Fmjky/IUNeChFKjEwjzPuucdi3htaol+v1uuejNbVogrKib0o9Hw6HA7WfLWXFZLqSzFLD0QMX4ucjzsu3RVEYhguMx3ZQ0l4ISfY0apvF4FzTIQFR33nAXHnsBQVnczi7MpkXyUG0uSq8aaxXoSlghVr0aLDnS4DmvbzJRFSUg9HiJcDmqsAoB9IfTSOHc5DmD7rvDwJaTDRaPAHYjTpg1Jowk6CFr8gzQGHie/nl1pz45FGS6aMrBxd0d4Ye+hYyroqVvSLaHZRXoV/2xFQ1H4NDpEzhvxUwMrGPrfmvXsHg58a50LsBPqQvsxkceoJeYuJzdwsBK38C39ib4BsgkMgAAAAASUVORK5CYII=';
  src_img_check = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADnSURBVHgBjZBLEsFAEIa7RyUpuxzBAbyy81i5gY1HWXEDbsANOAF27NwgKyxHeezdgGUIaTOJpCKUZKqmu2vm+6v+vwESnjrnuuyYBO6sefGJiinoXaygveUZIoULWBf3irEwqCYAZTw7To9Jb76/v7BDo0U5P2OapXLNUi7Nzb4OoYBfcDU3lDMDIi89Y9PG+liUs3pTAhgIJj7sChCdwftDZykwW9vTFAlcoejzZSXbD1tl0pdIE4hE6bqjWKGVtvvRbEyWZSk7RqBR6P181+zayjCuUQF+buYwJIIC4mOwKBtn+HFeflpdA71E3i0AAAAASUVORK5CYII=';
  ngOnInit(): void {
    this.paymentSrc.Getpack().subscribe(t => this.arr_pack = t);
  }
  showmore(dv: string) {
    if (dv == 'div1') {
      this.showdv1 = !this.showdv1;
      this.showdv2 = false;
      this.showdv3 = false;
      this.showdv4 = false;
    }
    else if (dv == 'div2') {
      this.showdv2 = !this.showdv2;
      this.showdv1 = false;
      this.showdv3 = false;
      this.showdv4 = false;
    }
    else if (dv == 'div3') {
      this.showdv3 = !this.showdv3;
      this.showdv1 = false;
      this.showdv2 = false;
      this.showdv4 = false;
    } else {
      this.showdv4 = !this.showdv4;
      this.showdv1 = false;
      this.showdv2 = false;
      this.showdv3 = false;
    }
  }
  dangky(pack_select: string) {
    this.sharingSrc.getAuthenState().subscribe(t => {
      if (t) {
        this.thanhtoan(pack_select);
      } else {
        this.login();
      }
    });
  }
  dangky_tuychon() {
    if (this.pkg_code == '' || this.pkg_time == '') {
      return;
    }
    this.sharingSrc.getAuthenState().subscribe(t => {
      if (t) {
        this.thanhtoan(this.pkg_code);
      } else {
        this.login();
      }
    });
  }
  login() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = "95%";
    dialogConfig.panelClass = ['md:w-[900px]', 'md:h-[585px]', 'w-full', 'h-[95%]', 'magrin_pane'];
    dialogConfig.disableClose = true;
    this.dialog.open(LoginComponent, dialogConfig).afterClosed().subscribe(
      res => {
        this.sharingSrc.getUserInfo();
      }
    );
  }
  thanhtoan(gt: any) {
    let ten = '';
    let gia = '';
    let code = '';
    if (gt == 'Pack1') {
      ten = 'Gói 5 mã 1 năm';
      gia = '2.500.000 vnđ';
    } else if (gt == 'Pack2') {
      ten = 'Gói 10 mã 1 năm';
      gia = '3.000.000 vnđ';
    } else if (gt == 'Pack3') {
      ten = 'Gói 20 mã 1 năm';
      gia = '4.000.000 vnđ';
    }
    let data_pack = {
      pack_name: ten,
      price: gia,
      pack_code: gt
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = "95%";
    dialogConfig.panelClass = ['md:w-[500px]', 'md:h-[472px]', 'w-full', 'h-auto'];
    dialogConfig.disableClose = false;
    dialogConfig.data = data_pack;
    this.dialog.open(DangkyComponent, dialogConfig).afterClosed().subscribe(
      res => {
        this.xacnhan_thanhtoan(gt);
      }
    );
  }
  xacnhan_thanhtoan(gt: string) {

  }
  maSelect(value: any) {
    this.pkg_code = value;
    if (this.pkg_code != '' && this.pkg_time != '') {
      if (this.pkg_code == 'Pack1') {
        this.pkg_price = '2.500.000';
      } else if (this.pkg_code == 'Pack2') {
        this.pkg_price = '3.000.000';
      } else if (this.pkg_code == 'Pack3') {
        this.pkg_price = '4.000.000';
      }
    }
    this.pkg_time = '';
    this.pkg_price = '0';
  }
  timeSelect(value: any) {
    this.pkg_time = value;
    if (this.pkg_code != '' && this.pkg_time != '') {
      if (this.pkg_code == 'Pack1') {
        this.pkg_price = '2.500.000';
      } else if (this.pkg_code == 'Pack2') {
        this.pkg_price = '3.000.000';
      } else if (this.pkg_code == 'Pack3') {
        this.pkg_price = '4.000.000';
      }
    }
  }
}
