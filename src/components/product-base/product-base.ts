import { Component,Input } from '@angular/core';

/**
 * Generated class for the ProductBaseComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'product-base',
  templateUrl: 'product-base.html'
})
export class ProductBaseComponent {

  @Input('item') item :any; 

  constructor() {
    console.log('Hello ProductBaseComponent Component');
    
  }
 ngOnInit() {
    console.log(this.item.name);
  }
}
