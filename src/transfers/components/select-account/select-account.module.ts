import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SelectAccountComponent } from './select-account';
import { PipesModule } from "../../../pipes/pipes.module";

@NgModule({
  declarations: [
    SelectAccountComponent,
  ],
  imports: [
    IonicModule,PipesModule
  ],
  exports: [
    SelectAccountComponent
  ]
})
export class SelectAccountComponentModule {}
