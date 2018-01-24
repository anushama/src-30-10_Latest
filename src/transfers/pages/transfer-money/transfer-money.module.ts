import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferMoneyPage } from './transfer-money';
import { HeaderComponentModule } from '../../../components/header/header.module';

@NgModule({
  declarations: [
    TransferMoneyPage,
  ],
  imports: [
    IonicPageModule.forChild(TransferMoneyPage),HeaderComponentModule
  ],
  exports: [
    TransferMoneyPage
  ]
})
export class TransferMoneyPageModule {}
