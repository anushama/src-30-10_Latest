import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountToTransferToPage } from './account-to-transfer-to';
import { SelectAccountComponentModule } from "../../components/select-account/select-account.module";
import { HeaderComponentModule } from '../../../components/header/header.module';

@NgModule({
  declarations: [
    AccountToTransferToPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountToTransferToPage),
    SelectAccountComponentModule,
    HeaderComponentModule
  ],
  exports: [
    AccountToTransferToPage
  ]
})
export class AccountToTransferToPageModule {}
