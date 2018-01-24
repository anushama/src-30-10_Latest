import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OtherVehicleLoansPage } from './other-vehicle-loans';

@NgModule({
  declarations: [
    OtherVehicleLoansPage,
  ],
  imports: [
    IonicPageModule.forChild(OtherVehicleLoansPage),
  ],
  exports: [
    OtherVehicleLoansPage
  ]
})
export class OtherVehicleLoansPageModule {}
