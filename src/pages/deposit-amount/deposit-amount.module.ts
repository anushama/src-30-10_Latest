import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepositAmountPage } from './deposit-amount';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DepositAmountPage,
  ],
  imports: [
    FormsModule,
    IonicPageModule.forChild(DepositAmountPage)
  ],
  exports: [
    DepositAmountPage
  ]
})
export class DepositAmountPageModule {}
