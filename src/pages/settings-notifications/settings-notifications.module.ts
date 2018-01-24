import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsNotificationsPage } from './settings-notifications';
import { HeaderComponentModule } from '../../components/header/header.module';

@NgModule({
  declarations: [
    SettingsNotificationsPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsNotificationsPage), HeaderComponentModule
  ],
  exports: [
    SettingsNotificationsPage
  ]
})
export class SettingsNotificationsPageModule {}
