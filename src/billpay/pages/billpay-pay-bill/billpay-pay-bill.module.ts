import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillpayPayBillPage } from './billpay-pay-bill';

@NgModule({
  declarations: [
    BillpayPayBillPage,
  ],
  imports: [
    IonicPageModule.forChild(BillpayPayBillPage),
  ],
  exports: [
    BillpayPayBillPage
  ]
})
export class BillpayPayBillPageModule {}
