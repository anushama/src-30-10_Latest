import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayeeDetailsPage } from './payee-details';

@NgModule({
  declarations: [
    PayeeDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PayeeDetailsPage),
  ],
  exports: [
    PayeeDetailsPage
  ]
})
export class PayeeDetailsPageModule {}
