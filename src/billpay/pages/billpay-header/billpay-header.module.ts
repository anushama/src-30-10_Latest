import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillpayHeaderPage } from './billpay-header';

@NgModule({
  declarations: [
    BillpayHeaderPage,
  ],
  imports: [
    IonicPageModule.forChild(BillpayHeaderPage),
  ],
  exports: [
    BillpayHeaderPage
  ]
})
export class BillpayHeaderPageModule {}
