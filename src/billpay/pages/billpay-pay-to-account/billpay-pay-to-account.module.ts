import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillpayPayToAccountPage } from './billpay-pay-to-account';

@NgModule({
  declarations: [
    BillpayPayToAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(BillpayPayToAccountPage),
  ],
  exports: [
    BillpayPayToAccountPage
  ]
})
export class BillpayPayToAccountPageModule {}
