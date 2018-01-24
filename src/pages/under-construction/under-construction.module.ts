import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnderConstructionPage } from './under-construction';
import { HeaderComponentModule } from '../../components/header/header.module';

@NgModule({
  declarations: [
    UnderConstructionPage,
  ],
  imports: [
    IonicPageModule.forChild(UnderConstructionPage), HeaderComponentModule
  ],
  exports: [
    UnderConstructionPage
  ]
})
export class UnderConstructionPageModule {}
