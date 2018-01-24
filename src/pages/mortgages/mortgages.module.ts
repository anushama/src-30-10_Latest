import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MortgagesPage } from './mortgages';

@NgModule({
  declarations: [
    MortgagesPage,
  ],
  imports: [
    IonicPageModule.forChild(MortgagesPage),
  ],
  exports: [
    MortgagesPage
  ]
})
export class MortgagesPageModule {}
