import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/components/nghiepvu/proview/childview/products/products.service';
import { cutom_it } from 'src/app/models/category';
import { Inputcustom } from 'src/app/models/Inputcustom';



@Component({
  selector: 'app-custominput',
  templateUrl: './custominput.component.html',
  styleUrls: ['./custominput.component.css'],

})
export class CustominputComponent implements OnInit {
  @Input() data = '';
  @Input() form!: FormGroup;
  @Input() lb_text = '';
  @Input() values!: Inputcustom;
  @Output() out_delete = new EventEmitter<string>();
  arr_cs: cutom_it[] = [];
  str_val = '';
  constructor(private producSrc: ProductsService) { }
  ngOnInit(): void {
    // this.values.value_ip = this.values.value_ip == null ? ' ' : this.values.value_ip;
    // this.form.controls[this.values.name].setValue(this.values.value_ip || null);

    if (this.values.name == 'category') {
      this.producSrc.get_category().subscribe(t => {
        let dem = 1;
        t.forEach(element => {
          let it = { stt: dem, name: element.code, mota: element.name };
          this.arr_cs.push(it);
          dem = dem + 1;
          if (this.values.value_ip == element.code) {
            this.str_val = element.name
          }
        });
      });
    }
    if (this.values.name == 'enterpriseid') {
      this.producSrc.get_list_company().subscribe(t => {
        let dem = 1;
        t.forEach(element => {
          let it = { stt: dem, name: element.qrenterpriseid.toString(), mota: element.name };
          this.arr_cs.push(it);
          dem = dem + 1;
          if (this.values.value_ip == element.qrenterpriseid.toString()) {
            this.str_val = element.name
          }
        });
      });
    }
  }
  focusFunction(event: any, ten: string) {
    this.form.controls[this.values.name].setValue(event.target.value.trim());
  }
  delete_input(gt: string) {
    this.out_delete.emit(gt);
  }
  setval_out(gt: any) {
    this.form.controls[this.values.name].setValue(gt);
  }
  get isValid() { return this.form.controls[this.values.name].valid; }
  
}
