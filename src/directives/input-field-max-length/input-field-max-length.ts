import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
/**
 * Generated class for the InputFieldMaxLengthDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[inputMaxLength]'
})
export class InputFieldMaxLengthDirective {

  @Input('inputMaxLength') inputMaxLength:any;
  @Output() ngModelChange:EventEmitter<any> = new EventEmitter();

  constructor() { //
    console.log('Hello InputFieldMaxLengthDirective Directive');
  }

  @HostListener('keyup',['$event']) onKeyup(event) {
    // if (this.platform.is('android')) {
      // Get the value 
    const element = event.target as HTMLInputElement;
    const limit = this.inputMaxLength;
    const value = element.value.substr(0, limit);
    if (value.length <= limit) {
      element.value = value;
    } else {
      element.value = value.substr(0, limit-1);
    }
    // Set the value
    this.ngModelChange.emit(element.value);
    // } 
  }

}
