import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountCheckDisplayPage } from './account-check-display';

@NgModule({
  declarations: [
    AccountCheckDisplayPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountCheckDisplayPage),
  ],
  exports: [
    AccountCheckDisplayPage
  ]
})
export class CheckDisplayPageModule {}
