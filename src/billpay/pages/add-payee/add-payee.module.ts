import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPayeePage } from './add-payee';

@NgModule({
  declarations: [
    AddPayeePage,
  ],
  imports: [
    IonicPageModule.forChild(AddPayeePage),
  ],
  exports: [
    AddPayeePage
  ]
})
export class AddPayeePageModule {}
