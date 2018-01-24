import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelploginPage } from './helplogin';

@NgModule({
  declarations: [
    HelploginPage,
  ],
  imports: [
    IonicPageModule.forChild(HelploginPage),
  ],
  exports: [
    HelploginPage
  ]
})
export class HelploginPageModule {}
