import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AutoLoansPage } from './auto-loans';
import { HeaderComponentModule } from '../../components/header/header.module';

@NgModule({
  declarations: [
    AutoLoansPage,
  ],
  imports: [
    IonicPageModule.forChild(AutoLoansPage),HeaderComponentModule
  ],
  exports: [
    AutoLoansPage
  ]
})
export class AutoLoansPageModule {}
