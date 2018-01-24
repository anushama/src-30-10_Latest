import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmTransferPage } from './confirm-transfer';
import { PipesModule } from "../../../pipes/pipes.module";

@NgModule({
  declarations: [
    ConfirmTransferPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmTransferPage),
    PipesModule
  ],
  exports: [
    ConfirmTransferPage
  ]
})
export class ConfirmTransferPageModule {}
