import { Component, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ProductsService } from 'src/app/components/nghiepvu/proview/childview/products/products.service';
import { temp_object, value_it } from 'src/app/models/optioncs';
import { product, productview } from 'src/app/models/product';
import { ViewdataService } from 'src/app/services/viewdata.service';

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
  product$!: Observable<productview>;
  arr_dynamic: value_it[] = [];
  data1!: string;
  constructor(private viewDataSrc: ViewdataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    debugger;
    let id = this.route.snapshot.paramMap.get('id');
    let id2 = this.route.snapshot.paramMap.get('id2');
    let value_id = id == null ? '0' : id.toString();
    let value_id2 = id2 == null ? 'all' : id2.toString();
    this.product$ = this.viewDataSrc.get_view_product(value_id, value_id2);
    this.product$.subscribe(t => {
      if (t.additional != null) {
        let arr_temp = JSON.parse(t.additional) as temp_object[];
        arr_temp.forEach(element => {
          let it_temp = element.values;
          this.arr_dynamic.push(it_temp);
        });
      }
    });
  }
  select_product(id: number) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate(['/views/product/' + id + '/all']);
  }
}
