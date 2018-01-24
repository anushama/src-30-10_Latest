import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountLockedPage } from './account-locked';

@NgModule({
  declarations: [
    AccountLockedPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountLockedPage),
  ],
  exports: [
    AccountLockedPage
  ]
})
export class AccountLockedPageModule {}
