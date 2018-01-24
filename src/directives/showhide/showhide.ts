import { Directive, ContentChild } from '@angular/core';

/**
 * Generated class for the ShowhideDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[showhide]' // Attribute selector
})
export class ShowhideDirective {
  show = false;
  @ContentChild('showhideinput') input;

  constructor() {
    console.log('Hello ShowhideDirective Directive');
  }

  toggleShow()
  {
      this.show = !this.show;
      console.log(this.input);
      if (this.show){
          this.input.nativeElement.type='text';
      }
      else {
          this.input.nativeElement.type='password';
      }
  }

}
