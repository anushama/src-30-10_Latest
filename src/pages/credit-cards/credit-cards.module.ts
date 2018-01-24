import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreditCardsPage } from './credit-cards';

@NgModule({
  declarations: [
    CreditCardsPage,
  ],
  imports: [
    IonicPageModule.forChild(CreditCardsPage),
  ],
  exports: [
    CreditCardsPage
  ]
})
export class CreditCardsPageModule {}
