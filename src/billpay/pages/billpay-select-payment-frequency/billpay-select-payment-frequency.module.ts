import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillpaySelectPaymentFrequencyPage } from './billpay-select-payment-frequency';

@NgModule({
  declarations: [
    BillpaySelectPaymentFrequencyPage,
  ],
  imports: [
    IonicPageModule.forChild(BillpaySelectPaymentFrequencyPage),
  ],
  exports: [
    BillpaySelectPaymentFrequencyPage
  ]
})
export class BillpaySelectPaymentFrequencyPageModule {}
