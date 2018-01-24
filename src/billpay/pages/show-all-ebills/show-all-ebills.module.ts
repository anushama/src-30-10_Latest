import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowAllEbillsPage } from './show-all-ebills';

@NgModule({
  declarations: [
    ShowAllEbillsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowAllEbillsPage),
  ],
  exports: [
    ShowAllEbillsPage
  ]
})
export class ShowAllEbillsPageModule {}
