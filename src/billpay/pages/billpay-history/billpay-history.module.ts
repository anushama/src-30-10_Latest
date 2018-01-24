import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillpayHistoryPage } from './billpay-history';

@NgModule({
  declarations: [
    BillpayHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(BillpayHistoryPage),
  ],
  exports: [
    BillpayHistoryPage
  ]
})
export class BillpayHistoryPageModule {}
