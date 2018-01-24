import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditTransferPaymentPage } from './edit-transfer-payment';
import { PipesModule } from "../../../pipes/pipes.module";
import { HeaderComponentModule } from '../../../components/header/header.module';

@NgModule({
  declarations: [
    EditTransferPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(EditTransferPaymentPage),
    PipesModule,
    HeaderComponentModule
  ],
  exports: [
    EditTransferPaymentPage
  ]
})
export class EditTransferPaymentPageModule {}
