import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/components/nghiepvu/proview/childview/products/products.service';
import { temp_object, value_it } from 'src/app/models/optioncs';
import { product } from 'src/app/models/product';

@Pipe({ name: "safeHtml" })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value: any) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
@Component({
  selector: 'app-productinfo',
  templateUrl: './productinfo.component.html',
  styleUrls: ['./productinfo.component.css']
})
export class ProductinfoComponent implements OnInit {
  product$!: Observable<product>;
  arr_dynamic: value_it[] = [];
  data1!: string;
  constructor(private productSrc: ProductsService) { }

  ngOnInit(): void {
    this.product$ = this.productSrc.get_product(4);
    this.product$.subscribe(t => {
      let arr_temp = JSON.parse(t.additional) as temp_object[];
      arr_temp.forEach(element => {
        let it_temp = element.values;
        this.arr_dynamic.push(it_temp);
      });
    });
  }


}
