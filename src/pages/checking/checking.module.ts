import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckingPage } from './checking';
import { HeaderComponentModule } from '../../components/header/header.module';

@NgModule({
  declarations: [
    CheckingPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckingPage),HeaderComponentModule
  ],
  exports: [
    CheckingPage
  ]
})
export class CheckingPageModule {}
