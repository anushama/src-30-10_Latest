import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MakeTransferPage } from './make-transfer';
import { PipesModule } from "../../../pipes/pipes.module";
import { FooterComponentModule } from "../../../components/footer/footer.module";


@NgModule({
  declarations: [
    MakeTransferPage,
  ],
  imports: [
    IonicPageModule.forChild(MakeTransferPage),FooterComponentModule,PipesModule
  ],
  exports: [
    MakeTransferPage
  ]
})
export class MakeTransferPageModule {}
