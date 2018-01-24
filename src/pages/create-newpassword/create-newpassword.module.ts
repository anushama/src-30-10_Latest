import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateNewpasswordPage } from './create-newpassword';

@NgModule({
  declarations: [
    CreateNewpasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateNewpasswordPage),
  ],
  exports: [
    CreateNewpasswordPage
  ]
})
export class CreateNewpasswordPageModule {}
