import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplicationStatusPage } from './application-status';
import { HeaderComponentModule } from '../../components/header/header.module';
import { PipesModule } from "../../pipes/pipes.module";
@NgModule({
  declarations: [
    ApplicationStatusPage,

  ],
  imports: [
    IonicPageModule.forChild(ApplicationStatusPage),HeaderComponentModule,PipesModule
  ],
  exports: [
    ApplicationStatusPage
  ]
})
export class ApplicationStatusPageModule {}
