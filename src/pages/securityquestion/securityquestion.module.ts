import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecurityquestionPage } from './securityquestion';

@NgModule({
  declarations: [
    SecurityquestionPage,
  ],
  imports: [
    IonicPageModule.forChild(SecurityquestionPage),
  ],
  exports: [
    SecurityquestionPage
  ]
})
export class SecurityquestionPageModule {}
