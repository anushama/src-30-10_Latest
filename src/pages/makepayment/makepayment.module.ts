import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MakepaymentPage } from './makepayment';

@NgModule({
  declarations: [
    MakepaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(MakepaymentPage),
  ],
  exports: [
    MakepaymentPage
  ]
})
export class MakepaymentPageModule {}
