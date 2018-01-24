import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillpayAddEditPayeePage } from './billpay-add-edit-payee';

@NgModule({
  declarations: [
    BillpayAddEditPayeePage,
  ],
  imports: [
    IonicPageModule.forChild(BillpayAddEditPayeePage),
  ],
  exports: [
    BillpayAddEditPayeePage
  ]
})
export class BillpayAddEditPayeePageModule {}
