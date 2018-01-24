import { Directive } from '@angular/core';
import { NgControl } from "@angular/forms";

@Directive({
  selector: '[zipcode]', // Attribute selector
  host: {
    '(ngModelChange)': 'onInputChange($event)',
  }
})
export class ZipcodeDirective {

  constructor(public model: NgControl) {
    console.log('Hello ZipcodeDirective Directive');
  }

  onInputChange(event) {
    // remove all mask characters (keep only numeric)
    let newVal = event.replace(/\D/g, '');

    if (newVal.length == 0) {
      newVal = '';
    }
    // don't show braces for empty groups at the end
    else if (newVal.length <= 5) {
      newVal = newVal.replace(/^(\d{0,5})/, '$1');
    } else if (newVal.length <= 9 && newVal.length > 5) {
      newVal = newVal.replace(/^(\d{0,5})(\d{0,4})/, '$1-$2');
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
