import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountCreditCardSortPage } from './account-credit-card-sort';

@NgModule({
  declarations: [
    AccountCreditCardSortPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountCreditCardSortPage),
  ],
  exports: [
    AccountCreditCardSortPage
  ]
})
export class AccountCreditCardSortPageModule {}
