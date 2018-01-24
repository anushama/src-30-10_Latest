import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecurityPage } from './security';

@NgModule({
  declarations: [
    SecurityPage,
  ],
  imports: [
    IonicPageModule.forChild(SecurityPage),
  ],
  exports: [
    SecurityPage
  ]
})
export class SecurityPageModule {}
