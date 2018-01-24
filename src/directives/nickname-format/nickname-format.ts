import { Directive } from '@angular/core';
import { NgControl } from "@angular/forms";

@Directive({
  selector: '[nickname-format]', // Attribute selector
  host: {
    '(ngModelChange)': 'onInputChange($event)',
  }
})
export class NicknameFormatDirective {

  constructor(public model: NgControl) {

  }
  onInputChange(event) {
    let newVal;
    if (event) {
      // remove all mask characters (keep only numeric)
      newVal = event.replace(/[^a-zA-Z0-9 ]/, '');
    } else {
      newVal = '';
    }
    // set the new value
    setTimeout(() => this.model.valueAccessor.writeValue(newVal), 0);
    //   if (newVal !== event) {
    //     // TODO: add a function to trigger onchange
    //   } else {
    //     setTimeout(() => this.model.valueAccessor.writeValue(newVal), 0);
    //   }
    // }
  }

}
