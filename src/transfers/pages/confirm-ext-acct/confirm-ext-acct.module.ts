import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmExtAcctPage } from './confirm-ext-acct';
import { HeaderComponentModule } from '../../../components/header/header.module';
@NgModule({
  declarations: [
    ConfirmExtAcctPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmExtAcctPage),HeaderComponentModule
  ],
  exports: [
    ConfirmExtAcctPage
  ]
})
export class ConfirmExtAcctPageModule {}
