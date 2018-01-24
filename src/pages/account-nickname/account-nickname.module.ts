import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountNicknamePage } from './account-nickname';

@NgModule({
  declarations: [
    AccountNicknamePage,
  ],
  imports: [
    IonicPageModule.forChild(AccountNicknamePage),
  ],
  exports: [
    AccountNicknamePage
  ]
})
export class AccountNicknamePageModule {}
