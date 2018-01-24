import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivateCardPage } from './activate-card';

@NgModule({
  declarations: [
    ActivateCardPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivateCardPage),
  ],
  exports: [
    ActivateCardPage
  ]
})
export class ActivateCardPageModule {}
