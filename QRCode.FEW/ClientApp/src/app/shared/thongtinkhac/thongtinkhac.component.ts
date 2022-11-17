import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { fromEvent, map, takeUntil } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';

export interface it_ttkhac {
  name: string;
  value: string;
}

@Component({
  selector: 'app-thongtinkhac',
  templateUrl: './thongtinkhac.component.html',
  styleUrls: ['./thongtinkhac.component.css']
})
export class ThongtinkhacComponent implements OnInit {

  constructor(private commonSrc: CommonService) { }
  @Input() dataSource: it_ttkhac[] = [];
  @Output() select_value = new EventEmitter();
  arr_data: it_ttkhac[] = [];
  rotate_it = false;
  @ViewChild('khacAutocomplete') khacAutocompleteRef!: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger!: MatAutocompleteTrigger;
  @ViewChild("ipauto") ipautoRef!: ElementRef;

  @Input() set input_value(gt: string) {
  }
  ngOnInit(): void {
    this.arr_data = this.dataSource;
  }
  auto_change(obj_input: HTMLInputElement) {
    let val = obj_input.value;
    this.arr_data = this.dataSource.filter(option => option.value.toLowerCase().includes(val.toLowerCase()));
    this.arr_data = this.dataSource.filter(option => this.commonSrc.likevalue(option.value, val));
    if (this.arr_data.length == 0) {
      val = val.substring(0, val.length - 1);
      obj_input.value = val;
      this.arr_data = this.dataSource.filter(option => this.commonSrc.likevalue(option.value, val));
    }
  }
  close_auto(obj_input: HTMLInputElement) {
    this.rotate_it = false;
    let val = obj_input.value;
    this.arr_data = this.dataSource.filter(option => option.value.toLowerCase() == val.toLowerCase());
    if (this.arr_data.length == 0) {
      val = '';
      obj_input.value = val;
      this.arr_data = this.dataSource;
    }
  }
  displayFn(selectedoption: any) {
    return selectedoption ? selectedoption.value : undefined;
  }
  select_it(evnt: any) {
    console.log(evnt.option.value);
    let gt = evnt.option.value;
    this.select_value.emit(gt);
  }
  autocompleteScroll() {
    this.rotate_it = true;
    setTimeout(() => {
      if (
        this.khacAutocompleteRef &&
        this.autocompleteTrigger &&
        this.khacAutocompleteRef.panel
      ) {
        fromEvent(this.khacAutocompleteRef.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.khacAutocompleteRef.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.khacAutocompleteRef.panel.nativeElement
              .scrollTop;
            const scrollHeight = this.khacAutocompleteRef.panel.nativeElement
              .scrollHeight;
            const elementHeight = this.khacAutocompleteRef.panel.nativeElement
              .clientHeight;
            const atBottom = scrollHeight === scrollTop + elementHeight;
            if (atBottom) {
              // fetch more data
              //this.filteredStates = [...this.filteredStates, ...this.states]
            }
          });
      }
    });
  }
}
