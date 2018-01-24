import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddExternalAcctPage } from './add-external-acct';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from "../../../directives/directives.module"

@NgModule({
  declarations: [
    AddExternalAcctPage,
  ],
  imports: [
    IonicPageModule.forChild(AddExternalAcctPage),FormsModule,DirectivesModule
  ],
  exports: [
    AddExternalAcctPage
  ]
})
export class AddExternalAcctPageModule {}
