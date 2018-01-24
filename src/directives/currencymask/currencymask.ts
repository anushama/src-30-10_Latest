import { Directive } from '@angular/core';
import { NgControl } from "@angular/forms";

@Directive({
  selector: '[currencymask]', // Attribute selector
  host: {
    '(ngModelChange)': 'onInputChange($event)'
  }
})
export class CurrencymaskDirective {
  private newVal: string = "";
  constructor(public model: NgControl) {
  }
  onInputChange(event, backspace: any) {
    this.newVal = event.replace(/\D/g, '');
    if(this.newVal != undefined && this.newVal != null && this.newVal != "")
     this.newVal = (parseInt(this.newVal.replace(/[^0-9]/g, ''))/100).toLocaleString('en-US', { minimumFractionDigits: 2 });
     setTimeout(() => this.model.valueAccessor.writeValue(this.newVal.length == 0 ? "" : "$"+this.newVal), 0);
  }

}
