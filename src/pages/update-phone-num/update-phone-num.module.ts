import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdatePhoneNumPage } from './update-phone-num';

@NgModule({
  declarations: [
    UpdatePhoneNumPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdatePhoneNumPage),
  ],
  exports: [
    UpdatePhoneNumPage
  ]
})
export class UpdatePhoneNumPageModule {}
