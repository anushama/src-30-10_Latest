import { Directive } from '@angular/core';

/**
 * Generated class for the BillpayDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[billpay]' // Attribute selector
})
export class BillpayDirective {

  constructor() {
    console.log('Hello BillpayDirective Directive');
  }

}
