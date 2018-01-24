import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MobileDepositTermsPage } from './mobile-deposit-terms';

@NgModule({
  declarations: [
    MobileDepositTermsPage,
  ],
  imports: [
    IonicPageModule.forChild(MobileDepositTermsPage),
  ],
  exports: [
    MobileDepositTermsPage
  ]
})
export class MobileDepositTermsPageModule {}
