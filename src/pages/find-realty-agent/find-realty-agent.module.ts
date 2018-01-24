import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindRealtyAgentPage } from './find-realty-agent';

@NgModule({
  declarations: [
    FindRealtyAgentPage,
  ],
  imports: [
    IonicPageModule.forChild(FindRealtyAgentPage),
  ],
  exports: [
    FindRealtyAgentPage
  ]
})
export class FindRealtyAgentPageModule {}
