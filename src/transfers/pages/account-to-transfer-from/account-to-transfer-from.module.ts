import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountToTransferFromPage } from './account-to-transfer-from';
import { SelectAccountComponentModule } from "../../components/select-account/select-account.module";
import { HeaderComponentModule } from "../../../components/header/header.module";

@NgModule({
  declarations: [
    AccountToTransferFromPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountToTransferFromPage),
    SelectAccountComponentModule, HeaderComponentModule
  ],
  exports: [
    AccountToTransferFromPage
  ]
})
export class AccountToTransferFromPageModule {}
