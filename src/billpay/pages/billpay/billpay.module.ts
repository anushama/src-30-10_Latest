import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillpayPage } from './billpay';

@NgModule({
  declarations: [
    BillpayPage,
  ],
  imports: [
    IonicPageModule.forChild(BillpayPage),
  ],
  exports: [
    BillpayPage
  ]
})
export class BillpayPageModule {}
