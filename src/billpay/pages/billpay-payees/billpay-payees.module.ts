import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillpayPayeesPage } from './billpay-payees';

@NgModule({
  declarations: [
    BillpayPayeesPage,
  ],
  imports: [
    IonicPageModule.forChild(BillpayPayeesPage),
  ],
  exports: [
    BillpayPayeesPage
  ]
})
export class BillpayPayeesPageModule {}
