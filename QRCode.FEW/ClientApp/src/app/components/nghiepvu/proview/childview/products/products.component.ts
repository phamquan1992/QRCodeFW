import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { product } from 'src/app/models/product';
import { ImportfileComponent } from 'src/app/shared/importfile/importfile.component';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const data_product: product[] = [
  {
    qrproductid: 1,
    name: 'Sản phẩm 1',
    code: '06475222',
    category: '',
    url_img: '',
    url_video: '',
    url_iso: '',
    url_barcode: '',
    price: 20000,
    slogan: '',
    logo: '',
    des_story: '',
    des_pack: '',
    des_element: '',
    des_uses: '',
    des_guide: '',
    des_preserve: '',
    lastcreated_date: '',
    lastcreated_by: 1,
    status: false
  },
  {
    qrproductid: 1,
    name: 'Sản phẩm 2',
    code: '06475222',
    category: '',
    url_img: '',
    url_video: '',
    url_iso: '',
    url_barcode: '',
    price: 20000,
    slogan: '',
    logo: '',
    des_story: '',
    des_pack: '',
    des_element: '',
    des_uses: '',
    des_guide: '',
    des_preserve: '',
    lastcreated_date: '',
    lastcreated_by: 1,
    status: false
  },
]

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'status', 'lastcreated_date', 'action'];
  dataSource = new MatTableDataSource<product>(data_product);
  selection = new SelectionModel<product>(true, []);

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  createQR() {
    console.log(this.selection.selected);
  }
  Import_sp() {
    this.showDialog('');
  }
  showDialog(gt: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "520px";
    dialogConfig.panelClass = "pd_dialog_none";
    this.dialog.open(ImportfileComponent, dialogConfig).afterClosed().subscribe(
      res => {
      }
    );
  }
}
