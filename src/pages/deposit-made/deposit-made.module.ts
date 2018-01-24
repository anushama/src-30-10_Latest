import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepositMadePage } from './deposit-made';
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    DepositMadePage,
  ],
  imports: [
    IonicPageModule.forChild(DepositMadePage),
    PipesModule
  ],
  exports: [
    DepositMadePage
  ]
})
export class DepositMadePageModule {}
