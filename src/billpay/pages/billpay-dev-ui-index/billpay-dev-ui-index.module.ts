import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillpayDevUiIndexPage } from './billpay-dev-ui-index';

@NgModule({
  declarations: [
    BillpayDevUiIndexPage,
  ],
  imports: [
    IonicPageModule.forChild(BillpayDevUiIndexPage),
  ],
  exports: [
    BillpayDevUiIndexPage
  ]
})
export class BillpayDevUiIndexPageModule {}
