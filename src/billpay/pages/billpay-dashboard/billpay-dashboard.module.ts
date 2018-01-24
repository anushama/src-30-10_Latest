import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillpayDashboardPage } from './billpay-dashboard';

@NgModule({
  declarations: [
    BillpayDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(BillpayDashboardPage),
  ],
  exports: [
    BillpayDashboardPage
  ]
})
export class BillpayDashboardPageModule {}
