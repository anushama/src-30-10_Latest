import { Directive, ElementRef, Renderer, Input } from '@angular/core';

/**
 * Generated class for the AnimateItemSlideDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[animate-item-slide]' // Attribute selector
})
export class AnimateItemSlideDirective {
  @Input('animate-item-slide') shouldAnimate: boolean;
  
  constructor(public element: ElementRef, public renderer: Renderer) {
    console.log('Hello AnimateItemSlideDirective Directive');
  }

  ngOnInit() {
    if (this.shouldAnimate) {
      this.renderer.setElementClass(this.element.nativeElement, 'active-slide', true);
      this.renderer.setElementClass(this.element.nativeElement, 'active-options-right', true);
      // Wait to apply animation
      setTimeout(() => {
        this.renderer.setElementClass(this.element.nativeElement.firstElementChild, 'itemSlidingAnimation', true);
      }, 2000);
    }
  }
}
