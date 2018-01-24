import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccounttopaytoPage } from './accounttopayto';

@NgModule({
  declarations: [
    AccounttopaytoPage,
  ],
  imports: [
    IonicPageModule.forChild(AccounttopaytoPage),
  ],
  exports: [
    AccounttopaytoPage
  ]
})
export class AccounttopaytoPageModule {}
