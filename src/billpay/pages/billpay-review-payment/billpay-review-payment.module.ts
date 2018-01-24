import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillpayReviewPaymentPage } from './billpay-review-payment';

@NgModule({
  declarations: [
    BillpayReviewPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(BillpayReviewPaymentPage),
  ],
  exports: [
    BillpayReviewPaymentPage
  ]
})
export class BillpayReviewPaymentPageModule {}
