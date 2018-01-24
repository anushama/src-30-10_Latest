import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountsPage } from './accounts';
// import { MakeTransferPage } from '../../transfers/make-transfer/make-transfer';

@NgModule({
  declarations: [
    AccountsPage,
  //  MakeTransferPage
  ],
  imports: [
    IonicPageModule.forChild(AccountsPage),
  ],
  exports: [
    AccountsPage,
  //  MakeTransferPage
  ]
})
export class AccountsPageModule {}
