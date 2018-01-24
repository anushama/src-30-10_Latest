import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ProductBaseComponent } from './product-base';

@NgModule({
  declarations: [
    ProductBaseComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    ProductBaseComponent
  ]
})
export class ProductBaseComponentModule {}
