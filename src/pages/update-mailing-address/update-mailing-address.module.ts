import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateMailingAddressPage } from './update-mailing-address';

@NgModule({
  declarations: [
    UpdateMailingAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateMailingAddressPage),
  ],
  exports: [
    UpdateMailingAddressPage
  ]
})
export class UpdateMailingAddressPageModule {}
