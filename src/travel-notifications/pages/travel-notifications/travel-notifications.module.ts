import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TravelNotificationsPage } from './travel-notifications';
import { HeaderComponentModule } from '../../../components/header/header.module';

@NgModule({
  declarations: [
    TravelNotificationsPage,
  ],
  imports: [
    IonicPageModule.forChild(TravelNotificationsPage), HeaderComponentModule
  ],
  exports: [
    TravelNotificationsPage
  ]
})
export class TravelNotificationsPageModule {}
