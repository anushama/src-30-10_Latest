import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillpayModifyAutoPayPage } from './billpay-modify-auto-pay';

@NgModule({
  declarations: [
    BillpayModifyAutoPayPage,
  ],
  imports: [
    IonicPageModule.forChild(BillpayModifyAutoPayPage),
  ],
  exports: [
    BillpayModifyAutoPayPage
  ]
})
export class BillpayModifyAutoPayPageModule {}
