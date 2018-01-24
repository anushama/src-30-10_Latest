import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillpayPaymentsPage } from './billpay-payments';
@NgModule({
  declarations: [
    BillpayPaymentsPage,
  ],
  imports: [
    IonicPageModule.forChild(BillpayPaymentsPage),
  ],
  exports: [
    BillpayPaymentsPage
  ]
})
export class BillpayPaymentsPageModule {}
