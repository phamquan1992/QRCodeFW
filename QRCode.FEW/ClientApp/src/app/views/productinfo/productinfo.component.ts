import { Component, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ProductsService } from 'src/app/components/nghiepvu/proview/childview/products/products.service';
import { temp_object, value_it } from 'src/app/models/optioncs';
import { product, productview } from 'src/app/models/product';
import { CommonService } from 'src/app/services/common.service';
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
  list_img:string[]=[];
  loading$: boolean = false;
  selectSrc = '';
  errorImg=''
  constructor(private viewDataSrc: ViewdataService, private route: ActivatedRoute, private router: Router, private commonSrv: CommonService) { }

  ngOnInit(): void {

    let id = this.route.snapshot.paramMap.get('id');
    let id2 = this.route.snapshot.paramMap.get('id2');
    let value_id = id == null ? '0' : id.toString();
    let value_id2 = id2 == null ? 'all' : id2.toString();
    if (value_id2 != 'gen') {
      value_id = this.commonSrv.giaima_id(value_id);
    }
    this.product$ = this.viewDataSrc.get_view_product(value_id, value_id2);
    this.loading$ = true;
    this.product$.subscribe(t => {
      if (t.additional != null) {
        let arr_temp = JSON.parse(t.additional) as temp_object[];
        arr_temp.forEach(element => {
          let it_temp = element.values;
          this.arr_dynamic.push(it_temp);
        });
      }
      this.list_img=t.list_img;
      this.loading$ = false;
      this.onSetIndex(0);
      this.repeat();
    });
  }
  index = 0;
  repeat() {
    this.index = this.index + 1;
    if (this.index === this.list_img.length) {
      this.index = 0;
    }
    setTimeout(() => {
      this.onSetIndex(this.index);
      this.repeat();
    }, 10000);
  }
  onSetIndex(i: number) {
    this.selectSrc = this.list_img[i];
  }
  select_product(id: string) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    let gt_tmp = this.commonSrv.mahoa_id(id);
    this.router.navigate(['/views/product/' + gt_tmp + '/all']);
  }
}
