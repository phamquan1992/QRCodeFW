import { FormGroup } from "@angular/forms";

export interface Inputcustom {
  Title: string;
  name: string;
  is_require: boolean;
  is_visible: boolean;
  type: string;
  nhom: string;
  is_delete: boolean;
  value_ip: string;
}
export interface Elemet_input {
  key: string;
  value: string;
}
export interface Text_custom {
  Title: string;
  name: string;
  is_require: boolean;
  is_visible: boolean;
}