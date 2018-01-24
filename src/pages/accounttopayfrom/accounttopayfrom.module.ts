import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccounttopayfromPage } from './accounttopayfrom';

@NgModule({
  declarations: [
    AccounttopayfromPage,
  ],
  imports: [
    IonicPageModule.forChild(AccounttopayfromPage),
  ],
  exports: [
    AccounttopayfromPage
  ]
})
export class AccounttopayfromPageModule {}
