import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { fromEvent, map, takeUntil } from 'rxjs';

@Component({
  selector: 'app-thongtinkhac',
  templateUrl: './thongtinkhac.component.html',
  styleUrls: ['./thongtinkhac.component.css']
})
export class ThongtinkhacComponent implements OnInit {

  constructor() { }
  @Input() dataSource: string[] = [];
  @Output() select_value = new EventEmitter();
  arr_data: string[] = [];
  rotate_it = false;
  @ViewChild('khacAutocomplete') khacAutocompleteRef!: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger!: MatAutocompleteTrigger;
  @ViewChild("ipauto") ipautoRef!: ElementRef;
  
  @Input() set input_value(gt: string) {
  }
  ngOnInit(): void {
    this.arr_data = this.dataSource;
  }
  auto_change(val: string) {
    this.arr_data = this.dataSource.filter(option => option.toLowerCase().includes(val.toLowerCase()));
  }
  close_auto(gt: string) {
    this.rotate_it = false;
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
