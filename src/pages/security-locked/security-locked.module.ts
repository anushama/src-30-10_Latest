import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecurityLockedPage } from './security-locked';

@NgModule({
  declarations: [
    SecurityLockedPage,
  ],
  imports: [
    IonicPageModule.forChild(SecurityLockedPage),
  ],
  exports: [
    SecurityLockedPage
  ]
})
export class SecurityLockedPageModule {}
