import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillpayScheduledPaymentDetailsPage } from './billpay-scheduled-payment-details';

@NgModule({
  declarations: [
    BillpayScheduledPaymentDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BillpayScheduledPaymentDetailsPage),
  ],
  exports: [
    BillpayScheduledPaymentDetailsPage
  ]
})
export class BillpayScheduledPaymentDetailsPageModule {}
