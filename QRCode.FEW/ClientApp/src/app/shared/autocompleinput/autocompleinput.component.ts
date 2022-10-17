import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, fromEvent } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';

export interface cutom_it {
  stt: number;
  name: string;
  mota: string;
}

@Component({
  selector: 'app-autocompleinput',
  templateUrl: './autocompleinput.component.html',
  styleUrls: ['./autocompleinput.component.css']
})
export class AutocompleinputComponent implements OnInit {

  constructor() {
    this.arr_item = this.temp_item;
  }
  stateCtrl = new FormControl();
  arr_item!: cutom_it[];
  temp_item: cutom_it[] = [
    {
      stt: 1,
      name: 'Item 1',
      mota: 'Danh mục 1',
    }, 
    {
      stt: 2,
      name: 'Item 2',
      mota: 'Danh mục 2',
    },
    {
      stt: 3,
      name: 'Item 3',
      mota: 'Danh mục 3',
    },
    {
      stt: 4,
      name: 'Item 4',
      mota: 'Danh mục 4',
    },
    {
      stt: 5,
      name: 'Item 5',
      mota: 'Danh mục 5',
    },
    {
      stt: 6,
      name: 'Item 6',
      mota: 'Danh mục 6',
    },
    {
      stt: 7,
      name: 'Item 7',
      mota: 'Danh mục 7',
    },
  ];
  rotate_it = false;
  @ViewChild('statesAutocomplete') statesAutocompleteRef!: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger!: MatAutocompleteTrigger;
  @Output() val_out = new EventEmitter<string>();
  _value_input = '';
  @Input() set value_input(gt: string) {
    this._value_input = gt;
  }
  ngOnInit(): void {
  }
  close_event(gt: string) {
    this.val_out.emit(gt);
  }
  autocompleteScroll() {
    this.rotate_it = true;
    setTimeout(() => {
      if (
        this.statesAutocompleteRef &&
        this.autocompleteTrigger &&
        this.statesAutocompleteRef.panel
      ) {
        fromEvent(this.statesAutocompleteRef.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.statesAutocompleteRef.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.statesAutocompleteRef.panel.nativeElement
              .scrollTop;
            const scrollHeight = this.statesAutocompleteRef.panel.nativeElement
              .scrollHeight;
            const elementHeight = this.statesAutocompleteRef.panel.nativeElement
              .clientHeight;
            const atBottom = scrollHeight === scrollTop + elementHeight;
            if (atBottom) {
              // fetch more data
              //this.filteredStates = [...this.filteredStates, ...this.states]
              this.add_item();
            }
          });
      }
    });
  }
  add_item() {
    let max_value = Math.max(...this.arr_item.map(o => o.stt)) + 1;
    for (let index = max_value; index < max_value + 10; index++) {
      let item_temp = {
        stt: index,
        name: 'Item ' + index,
        mota: 'Danh mục ' + index,
      };
      this.temp_item.push(item_temp);
    };
    this.arr_item = this.temp_item;
  }
  auto_change(obj_input: any) {
    let val = obj_input.value;
    this.arr_item = this.temp_item.filter(option => option.mota.toLowerCase().includes(val.toLowerCase()));
  }
}
