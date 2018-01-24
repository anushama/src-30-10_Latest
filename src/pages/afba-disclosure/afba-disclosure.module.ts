import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AfbaDisclosurePage } from './afba-disclosure';

@NgModule({
  declarations: [
    AfbaDisclosurePage,
  ],
  imports: [
    IonicPageModule.forChild(AfbaDisclosurePage),
  ],
  exports: [
    AfbaDisclosurePage
  ]
})
export class AfbaDisclosurePageModule {}
