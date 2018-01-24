import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReactiveFormsModule } from "@angular/forms";
import { ChangePasswordPage } from './change-password';

@NgModule({
  declarations: [
    ChangePasswordPage,
  ],
  imports: [
    ReactiveFormsModule,
    IonicPageModule.forChild(ChangePasswordPage),
  ],
  exports: [
    ChangePasswordPage
  ]
})
export class ChangePasswordPageModule {
}
