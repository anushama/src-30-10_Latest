import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepositsAgreementPage } from './deposits-agreement';

@NgModule({
  declarations: [
    DepositsAgreementPage,
  ],
  imports: [
    IonicPageModule.forChild(DepositsAgreementPage),
  ],
  exports: [
    DepositsAgreementPage
  ]
})
export class DepositsAgreementPageModule {}
