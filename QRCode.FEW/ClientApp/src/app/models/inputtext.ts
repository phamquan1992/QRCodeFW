import { Inputbase } from "./input-base";

export class InputText extends Inputbase<string> {
  override controlType = 'textbox';
}