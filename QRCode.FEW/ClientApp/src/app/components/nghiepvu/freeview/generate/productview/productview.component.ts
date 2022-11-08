import { Component, ElementRef, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { optioncs } from 'src/app/models/optioncs';
import { DatePipe } from '@angular/common';
import { ContentdgComponent } from 'src/app/components/share/contentdg/contentdg.component';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, Observable, startWith } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { product } from 'src/app/models/product';
import { ProductsService } from '../../../proview/childview/products/products.service';
import { PaynemtService } from 'src/app/services/paynemt.service';
import { qr_payment } from 'src/app/models/qr_payment';
import { ObservableService } from 'src/app/services/observable.service';
export interface item_value {
  value: string;
  is_select: boolean;
}
@Component({
  selector: 'app-productview',
  templateUrl: './productview.component.html',
  styleUrls: ['./productview.component.css']
})

export class ProductviewComponent implements OnInit {
  title = 'ngxqrcodeex';
  data = ' ';
  image = '';
  witdth = 200;
  height = 200;
  margin = 0;
  dotstyle = "square"; //"square" hoặc "dots"
  dotcolor = '#000000';
  background_color = '#ffffff';
  shape = 'square' //"square" hoặc "circle"
  cornersDot_type = 'None';
  cornerSquareType = 'None';

  status = '';
  is_any_select = false;
  arr_item: item_value[] = [{ value: 'Dịch vụ 1', is_select: false }, { value: 'Dịch vụ 2', is_select: false }, { value: 'Dịch vụ 3', is_select: false }];
  arr_item_ks: item_value[] = [{ value: 'Khảo sát 1', is_select: false }, { value: 'Khảo sát 2', is_select: false }, { value: 'Khảo sát 3', is_select: false }];
  arr_value: item_value[] = [];
  arr_value_ks: item_value[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  arr_product_core!: Observable<product[]>;
  arr_chip_product: product[] = [];
  filter_product!: Observable<product[]>;
  arr_payment!: Observable<qr_payment[]>;
  filter_payment!: Observable<qr_payment[]>;
  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  constructor(private dialog: MatDialog, private datepipe: DatePipe, private productSrc: ProductsService, private paymentSrc: PaynemtService, private sharingSrc: ObservableService) {

  }

  ngOnInit(): void {
    this.status = '';
    this.arr_value = this.arr_item;
    this.arr_value_ks = this.arr_item_ks;
    this.arr_product_core = this.productSrc.get_product_list();
    this.filter_product = this.arr_product_core;
    this.sharingSrc.getUserInfo().subscribe(user => {
      this.arr_payment = this.paymentSrc.get_payment_list(user.id as unknown as number);
      this.filter_payment = this.arr_payment;
    });
  }
 
  now: Date = new Date();
  op_tion: optioncs = new optioncs();
  taiqr() {
    this.now = new Date();
    this.status = 'download' + this.datepipe.transform(this.now, 'yyyyMMddHHmmss');
  }
  filter_payment_action(evet:any){

  }
  displayFn(selectedoption: any) {
    return selectedoption ? selectedoption.packname : undefined;
  }
  select_payment(evnt: any) {
    let gt = evnt.option.value.packcode;
  }
  showDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "100%";
    dialogConfig.height = "100%";
    dialogConfig.maxWidth = "95%";
    dialogConfig.maxHeight = "95%";
    dialogConfig.data = this.op_tion;
    // dialogConfig.height = "310px";
    this.dialog.open(ContentdgComponent, dialogConfig).afterClosed().subscribe(
      res => {
        // this.rowSelect = -1;
      }
    );
  }
  onchange_text(gt: any) {
    this.data = gt.value;
    if (gt.value === '' || gt.value === null)
      this.data = " ";
    //this.change_val();
  }
  change_val() {
    this.op_tion = {
      data: this.data,
      image: this.image,
      witdth: this.witdth,
      height: this.height,
      margin: this.margin,
      dotstyle: this.dotstyle,
      cornersDot_type: this.cornersDot_type,
      cornerSquareType: this.cornerSquareType,
      dotcolor: this.dotcolor,
      background_color: this.background_color,
      shape: this.shape
    };
  }
  xuat_qr(item: optioncs) {
    this.op_tion = item;
  }
  openOrClosePanel(evt: any, trigger: MatAutocompleteTrigger): void {
    evt.stopPropagation();
    if (trigger.panelOpen)
      trigger.closePanel();
    else
      trigger.openPanel();
  }
  getDichvu(gt: any, trigger: MatAutocompleteTrigger) {
    let index_dv = this.arr_value.findIndex(t => t.value == gt);
    let gt_old = this.arr_value[index_dv].is_select;
    this.arr_value[index_dv].is_select = !gt_old;
    if (!trigger.panelOpen)
      trigger.closePanel();
    trigger.openPanel();
    trigger.writeValue('');
  }
  findDv(gt: item_value[]): any {
    return gt.filter(t => t.is_select);
  }
  auto_change(obj_input: any) {
    let val = obj_input.value;
    this.arr_value = this.arr_item.filter(option => option.value.toLowerCase().includes(val.toLowerCase()));
  }
  auto_change_ks(obj_input: any) {
    let val = obj_input.value;
    this.arr_value_ks = this.arr_item_ks.filter(option => option.value.toLowerCase().includes(val.toLowerCase()));
  }

  add(event: MatChipInputEvent): void {
    console.log(event);
    const value = (event.value || {}) as product;
    // Add our fruit
    if (value) {
      this.arr_chip_product.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: product): void {
    const index = this.arr_chip_product.findIndex(t => t == fruit);

    if (index >= 0) {
      this.arr_chip_product.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event);
    let object_select = event.option.value as product;
    let idex_product = this.arr_chip_product.findIndex(t => t == object_select);
    if (idex_product == -1)
      this.arr_chip_product.push(object_select);
    else
      this.arr_chip_product.splice(idex_product, 1);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }
  check_select(gt: product) {
    const index = this.arr_chip_product.indexOf(gt);
    return index == -1 ? false : true;
  }
  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  // }
}
