import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageYourCardsPage } from './manage-your-cards';

@NgModule({
  declarations: [
    ManageYourCardsPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageYourCardsPage),
  ],
  exports: [
    ManageYourCardsPage
  ]
})
export class ManageYourCardsPageModule {}
