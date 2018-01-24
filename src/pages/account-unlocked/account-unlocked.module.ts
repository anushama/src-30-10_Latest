import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountUnlockedPage } from './account-unlocked';
import { HeaderComponentModule } from '../../components/header/header.module';

@NgModule({
  declarations: [
    AccountUnlockedPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountUnlockedPage), HeaderComponentModule
  ],
  exports: [
    AccountUnlockedPage
  ]
})
export class AccountUnlockedPageModule {}
