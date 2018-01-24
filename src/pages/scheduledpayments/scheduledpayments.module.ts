import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduledpaymentsPage } from './scheduledpayments';

@NgModule({
  declarations: [
    ScheduledpaymentsPage,
  ],
  imports: [
    IonicPageModule.forChild(ScheduledpaymentsPage),
  ],
  exports: [
    ScheduledpaymentsPage
  ]
})
export class ScheduledpaymentsPageModule {}
