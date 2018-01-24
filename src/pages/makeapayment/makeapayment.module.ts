import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MakeapaymentPage } from './makeapayment';

@NgModule({
  declarations: [
    MakeapaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(MakeapaymentPage),
  ],
  exports: [
    MakeapaymentPage
  ]
})
export class MakeapaymentPageModule {}
