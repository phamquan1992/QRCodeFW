import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Inputbase } from 'src/app/models/input-base';

@Component({
  selector: 'app-filterrow',
  templateUrl: './filterrow.component.html',
  styleUrls: ['./filterrow.component.css']
})
export class FilterrowComponent {
  @Input() iteminput!: Inputbase<string>;
  @Input() form!: FormGroup;
  private _value!: { key: string, value: string };
  isMenuOpened: boolean = false;
  @Input() set value(value: { key: string, value: string }) {
    this._value = value;
    this.get_keyparent.emit(this._value.key);
    this.propagateChange(value);
  }
  @Output() get_keyparent = new EventEmitter<string>();
  get value() { return this._value; }
  propagateChange: (val: any) => void = () => { };
  constructor() { }
  ngOnInit(): void {
    if (this.iteminput !== undefined) {       
      if (this.iteminput.controlType == 'dropdown') {
        console.log(this.iteminput.options);    
        this.arr_dropdown = this.iteminput.options;
        let gt_temp = this.arr_dropdown.findIndex(t => t.key == this.iteminput.value);
        this.form.controls[this.iteminput.key].setValue(this.arr_dropdown[gt_temp]);
      }
    }
  }
  get isValid() { return this.form.controls[this.iteminput.key].valid; }
  get dirty() { return this.form.controls[this.iteminput.key].dirty; }
  get touched() { return this.form.controls[this.iteminput.key].touched; }
  get required() { return this.form.controls[this.iteminput.key].errors?.['required']; }
  get errMinLength() { return this.form.controls[this.iteminput.key].hasError('minlength'); }
  get errMaxLength() { return this.form.controls[this.iteminput.key].hasError('maxlength'); }
  get errLink() { return this.form.controls[this.iteminput.key].errors?.['pattern']; }
  get errEmail() { return this.form.controls[this.iteminput.key].errors?.['email']; }
  toggleMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
  }
  arr_dropdown: { key: string, value: string }[] = [];
  clickedOutside(): void {
    this.isMenuOpened = false;
  }
  getLabel(value: { key: string, value: string }) {
    return value && value.value || '';
  }
  change_dropdown(gt: any) {
    this.arr_dropdown = this.iteminput.options.filter(t => t.value.toLowerCase().includes(gt.value.toLowerCase()))
  }
  close_event(gt: any) {
    let val = gt.value;

    let arr_tmp = this.iteminput.options.filter(t => t.value == val);
    if (arr_tmp.length == 0) {
      this.arr_dropdown = this.iteminput.options;
      gt.value = "";
      this.form.controls[this.iteminput.key].setValue("");
    }
  }
  openOrClosePanel(evt: any, trigger: MatAutocompleteTrigger): void {
    evt.stopPropagation();
    if (trigger.panelOpen)
      trigger.closePanel();
    else {
      trigger.openPanel();
    }

  }
}
