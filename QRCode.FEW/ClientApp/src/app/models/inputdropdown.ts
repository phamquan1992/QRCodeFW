import { Inputbase } from "./input-base";

export class InputDropdown extends Inputbase<string> {
  override controlType = 'dropdown';
}