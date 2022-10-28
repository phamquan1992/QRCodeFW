import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, fromEvent } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { cutom_it } from 'src/app/models/category';



@Component({
  selector: 'app-autocompleinput',
  templateUrl: './autocompleinput.component.html',
  styleUrls: ['./autocompleinput.component.css']
})
export class AutocompleinputComponent implements OnInit {
  stateCtrl = new FormControl();
  arr_item!: cutom_it[];
  @Input() data!: cutom_it[]
  rotate_it = false;
  @ViewChild('statesAutocomplete') statesAutocompleteRef!: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger!: MatAutocompleteTrigger;
  @Output() val_out = new EventEmitter<string>();
  _value_input = '';
  @Input() set value_input(gt: string) {
    this._value_input = gt;
  }
  constructor() {  
  }
  
  ngOnInit(): void {
    this.arr_item = this.data;
  }
  close_event(gt: string) {
    //this.val_out.emit(gt);
  }
  select_it(evnt: any) {
    console.log(evnt.option.value);
    let gt = evnt.option.value.name;
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
      this.data.push(item_temp);
    };
    this.arr_item = this.data;
  }
  auto_change(obj_input: any) {
    let val = obj_input.value;
    this.arr_item = this.data.filter(option => option.mota.toLowerCase().includes(val.toLowerCase()));
  }
  displayFn(selectedoption: any) {
    return selectedoption ? selectedoption.mota : undefined;
  }
}
