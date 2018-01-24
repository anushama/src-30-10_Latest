import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateEmailPage } from './update-email';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    UpdateEmailPage,
  ],
  imports: [
    ReactiveFormsModule,
    IonicPageModule.forChild(UpdateEmailPage),
  ],
  exports: [
    UpdateEmailPage
  ]
})
export class UpdateEmailPageModule {}
