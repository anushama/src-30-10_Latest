import { Directive } from '@angular/core';
import { NgControl } from "@angular/forms";
@Directive({
  selector: '[phonemask]', // Attribute selector
  host: {
    '(ngModelChange)': 'onInputChange($event)',
  }
})
export class PhonemaskDirective {

  constructor(public model: NgControl) {
  }
  onInputChange(event) {
    // remove all mask characters (keep only numeric)
    let newVal = event.replace(/\D/g, '');

    if (newVal.length == 0) {
      newVal = '';
    }
    // don't show braces for empty groups at the end
    else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,3})/, '$1');
    } else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
    } else if (newVal.length <= 10) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(.*)/, '($1) $2-$3');
    }
    // set the new value
    setTimeout(() => this.model.valueAccessor.writeValue(newVal), 0);
  }
}
