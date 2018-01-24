import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillpaySortFiltersPage } from './billpay-sort-filters';

@NgModule({
  declarations: [
    BillpaySortFiltersPage,
  ],
  imports: [
    IonicPageModule.forChild(BillpaySortFiltersPage),
  ],
  exports: [
    BillpaySortFiltersPage
  ]
})
export class BillpaySortFiltersPageModule {}
