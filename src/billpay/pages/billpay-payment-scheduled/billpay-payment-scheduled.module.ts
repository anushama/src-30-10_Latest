import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillpayPaymentScheduledPage } from './billpay-payment-scheduled';

@NgModule({
  declarations: [
    BillpayPaymentScheduledPage,
  ],
  imports: [
    IonicPageModule.forChild(BillpayPaymentScheduledPage),
  ],
  exports: [
    BillpayPaymentScheduledPage
  ]
})
export class BillpayPaymentScheduledPageModule {}
