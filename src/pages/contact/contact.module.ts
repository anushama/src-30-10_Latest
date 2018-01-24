import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactPage } from './contact';
import { PipesModule } from "../../pipes/pipes.module";
import { HeaderComponentModule } from '../../components/header/header.module';

@NgModule({
  declarations: [
    ContactPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactPage),PipesModule, HeaderComponentModule
  ],
  exports: [
    ContactPage
  ]
})
export class ContactPageModule {}
