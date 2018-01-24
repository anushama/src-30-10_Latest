import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalLoansPage } from './personal-loans';

@NgModule({
  declarations: [
    PersonalLoansPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalLoansPage),
  ],
  exports: [
    PersonalLoansPage
  ]
})
export class PersonalLoansPageModule {}
