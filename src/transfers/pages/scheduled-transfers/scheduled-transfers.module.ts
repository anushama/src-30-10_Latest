import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduledTransfersPage } from './scheduled-transfers';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    ScheduledTransfersPage
  ],
  imports: [
    IonicPageModule.forChild(ScheduledTransfersPage),
    PipesModule
  ],
  exports: [
    ScheduledTransfersPage
  ]
})
export class ScheduledTransfersPageModule {}
