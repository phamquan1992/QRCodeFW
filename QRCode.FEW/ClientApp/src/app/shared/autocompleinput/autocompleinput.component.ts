import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, fromEvent } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { cutom_it } from 'src/app/models/category';
import { CommonService } from 'src/app/services/common.service';



@Component({
  selector: 'app-autocompleinput',
  templateUrl: './autocompleinput.component.html',
  styleUrls: ['./autocompleinput.component.css']
})
export class AutocompleinputComponent implements OnInit {
  stateCtrl = new FormControl();
  arr_item!: cutom_it[];
  @Input() data!: cutom_it[];
  @Input() placeholder_str = 'Danh mục';
  _ischeck: boolean = false;
  @Input() set ischeck(gt: boolean) {
    this._ischeck = gt;
  }
  rotate_it = false;
  @ViewChild('statesAutocomplete') statesAutocompleteRef!: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger!: MatAutocompleteTrigger;
  @Output() val_out = new EventEmitter<string>();
  _value_input = '';
  isequ = false;
  @Input() set value_input(gt: string) {
    this._value_input = gt;
    if (gt != null && gt != '')
      this.isequ = true;
    else { 
      this.arr_item = this.data;
    }
  }
  constructor(private commonSrc: CommonService) {
  }

  ngOnInit(): void {
    this.arr_item = this.data;
  }
  close_event(obj_input: HTMLInputElement) {
    this.rotate_it = false;
    let val = obj_input.value;
    if (val != null && val != '')
      this.isequ = true;
    else {
      this.val_out.emit('');
      this.isequ = false;
    }
    this.arr_item = this.data.filter(option => option.mota.toLowerCase() == val.toLowerCase());
    if (this.arr_item.length == 0) {
      val = '';
      obj_input.value = val;
      this.isequ = false;
      this.arr_item = this.data;
    }
  }
  // get isValid() { return this.isequ; }
  get isValid() {
    if (this._ischeck)
      return this.isequ;
    else
      return true;
  }


  select_it(evnt: any, data: string) {
    if (data != null)
      this.isequ = true;
    else
      this.isequ = false;
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
  auto_change(obj_input: HTMLInputElement) {
    let val = obj_input.value;
    if (val != null && val != '')
      this.isequ = true;
    else {
      this.val_out.emit('');
      this.isequ = false;
    }

    //this.arr_item = this.data.filter(option => option.mota.toLowerCase().includes(val.toLowerCase()));//commonSrc
    this.arr_item = this.data.filter(option => this.commonSrc.likevalue(option.mota, val));
    if (this.arr_item.length == 0) {
      val = val.substring(0, val.length - 1);
      obj_input.value = val;
      this.arr_item = this.data.filter(option => this.commonSrc.likevalue(option.mota, val));
    }

  }
  displayFn(selectedoption: any) {
    return selectedoption ? selectedoption.mota : undefined;
  }
  openPanel(evt: any): void {
    evt.stopPropagation();
    if (!this.autocompleteTrigger.panelOpen)
      this.autocompleteTrigger.openPanel();
    else
      this.autocompleteTrigger.closePanel();
  }
}
