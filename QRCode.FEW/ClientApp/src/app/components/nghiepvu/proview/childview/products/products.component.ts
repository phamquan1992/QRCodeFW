import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable } from 'rxjs';
import { product } from 'src/app/models/product';
import { MessageService } from 'src/app/services/message.service';
import { ImportfileComponent } from 'src/app/shared/importfile/importfile.component';
import { ProductsService } from './products.service';

const data_product: product[] = [];

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  data_pr: product[] = [];
  displayedColumns: string[] = ['select', 'name', 'status', 'lastcreated_date', 'action'];
  dataSource = new MatTableDataSource<product>(data_product);
  selection = new SelectionModel<product>(true, []);
  filterProduct = {
    name: '',
    status: ''
  };
  value_select = 'all';
  name_filter = '';
  constructor(private dialog: MatDialog, private productSrc: ProductsService, private mesSrc: MessageService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<product>(data_product);
    this.productSrc.get_product_list().pipe().subscribe(t => {
      this.data_pr = t as product[];
      this.dataSource = new MatTableDataSource<product>(this.data_pr);
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
  }
  reload_grid() {
    this.filterProduct['name'] = '';
    this.filterProduct['status'] = '';
    this.name_filter = '';
    this.value_select = 'all';
    this.dataSource.filter = JSON.stringify(this.filterProduct);
    this.selection.clear();
  }
  applyFilter() {
    this.filterProduct['name'] = this.name_filter;
    this.filterProduct['status'] = this.value_select == 'all' ? '' : this.value_select;
    console.log(JSON.stringify(this.filterProduct));
    this.dataSource.filter = JSON.stringify(this.filterProduct);
  }
  customFilterPredicate() {
    const myFilterPredicate = (data: product, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      return data.name.toString().trim().indexOf(searchString.name) !== -1 &&
        data.status.toString().trim().toLowerCase().indexOf(searchString.status.toLowerCase()) !== -1;
    }
    return myFilterPredicate;
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
  Xoa_sp_arr() {
    let arrID = this.selection.selected.map(t => t.qrproductid);
    this.productSrc.delete_product(arrID).subscribe(t => {
      if (t) {
        this.mesSrc.success('Bạn đã thực hiện thành công!');
        this.selection.clear();
        this.get_data();
      } else {
        this.mesSrc.error('Có lỗi trong quá trình lưu dữ liệu');
      }
    });

  }
  xoa_sp(id: any) {
    this.productSrc.delete_obj(id).subscribe(t => {
      if (t) {
        this.mesSrc.success('Bạn đã thực hiện thành công!');
        this.selection.clear();
        this.get_data();
      } else {
        this.mesSrc.error('Có lỗi trong quá trình lưu dữ liệu');
      }
    });
  }
  get_data() {
    this.dataSource = new MatTableDataSource<product>(data_product);
    this.productSrc.get_product_list().pipe().subscribe(t => {
      this.data_pr = t as product[];
      this.dataSource = new MatTableDataSource<product>(this.data_pr);
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
  }
  showhide_product(trangthai: boolean) {
    this.selection.selected.forEach(element => {
      element.status = trangthai;
    });
    this.productSrc.update_status(this.selection.selected).subscribe(
      t => {
        if (t) {
          this.mesSrc.success('Bạn đã thực hiện thành công!');
          this.selection.clear();
          this.get_data();
        } else {
          this.mesSrc.error('Có lỗi trong quá trình lưu dữ liệu');
        }
      }
    );
  }
}
