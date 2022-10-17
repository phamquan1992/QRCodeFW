import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Inputcustom } from 'src/app/models/Inputcustom';



@Component({
  selector: 'app-custominput',
  templateUrl: './custominput.component.html',
  styleUrls: ['./custominput.component.css']
})
export class CustominputComponent implements OnInit {
  @Input() data = '';
  @Input() form!: FormGroup;
  @Input() lb_text = '';
  @Input() values!: Inputcustom;
  @Output() out_delete = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
    this.form.controls[this.values.name].setValue(this.values.value_ip);
  }
  delete_input(gt: string) {
    this.out_delete.emit(gt);
  }
  setval_out(gt:any){
    this.form.controls[this.values.name].setValue(gt);
  }
}
