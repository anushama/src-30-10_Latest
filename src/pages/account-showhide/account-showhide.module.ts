import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountShowhidePage } from './account-showhide';

@NgModule({
  declarations: [
    AccountShowhidePage,
  ],
  imports: [
    IonicPageModule.forChild(AccountShowhidePage),
  ],
  exports: [
    AccountShowhidePage
  ]
})
export class AccountShowhidePageModule {}
