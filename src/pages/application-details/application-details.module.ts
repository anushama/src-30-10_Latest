import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApplicationDetailsPage } from './application-details';

@NgModule({
  declarations: [
    ApplicationDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ApplicationDetailsPage),
  ],
  exports: [
    ApplicationDetailsPage
  ]
})
export class ApplicationDetailsPageModule {}
