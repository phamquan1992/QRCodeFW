import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Inputcustom } from 'src/app/models/Inputcustom';

@Component({
  selector: 'app-editorlayout',
  templateUrl: './editorlayout.component.html',
  styleUrls: ['./editorlayout.component.css']
})
export class EditorlayoutComponent implements OnInit {
  @Input() data = '';
  @Input() form!: FormGroup;
  @Input() lb_text = '';
  @Input() values!: Inputcustom;
  @Output() out_delete = new EventEmitter<string>();
  out_html='';
  constructor() { }

  ngOnInit(): void {
    this.form.controls[this.values.name].setValue(this.values.value_ip);
  }
  get isValid() { return this.form.controls[this.values.name].valid; }
  delete_input(gt: string) {
    this.out_delete.emit(gt);
  }
  setval_out(gt: any) {
    this.form.controls[this.values.name].setValue(gt);
  }
  show_html(){
    console.log(this.form.controls[this.values.name]);
  }
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '300px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Nhập văn bản tại đây...',
    defaultParagraphSeparator: '',
    defaultFontName: 'Times New Roman',
    defaultFontSize: '',
    outline:false,
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    // upload: (file: File) => { ... }
    // uploadWithCredentials: false,
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['link',
        'unlink',
        'insertImage',
        'insertVideo','customClasses'],
    ]
  };
}
