import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MakeADepositPage } from './make-a-deposit';
import { PipesModule } from "../../pipes/pipes.module";
import { HeaderComponentModule } from '../../components/header/header.module';
import { FooterComponentModule } from '../../components/footer/footer.module';


@NgModule({
  declarations: [
    MakeADepositPage,
  ],
  imports: [
    IonicPageModule.forChild(MakeADepositPage),PipesModule, HeaderComponentModule, FooterComponentModule
  ],
  exports: [
    MakeADepositPage,
  ]
})
export class MakeADepositPageModule { }
