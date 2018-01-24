import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewDepositPage } from './review-deposit';

@NgModule({
  declarations: [
    ReviewDepositPage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewDepositPage),
  ],
  exports: [
    ReviewDepositPage
  ]
})
export class ReviewDepositPageModule {}
