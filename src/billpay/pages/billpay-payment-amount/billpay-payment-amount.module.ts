import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillpayPaymentAmountPage } from './billpay-payment-amount';

@NgModule({
  declarations: [
    BillpayPaymentAmountPage,
  ],
  imports: [
    IonicPageModule.forChild(BillpayPaymentAmountPage),
  ],
  exports: [
    BillpayPaymentAmountPage
  ]
})
export class BillpayPaymentAmountPageModule {}
