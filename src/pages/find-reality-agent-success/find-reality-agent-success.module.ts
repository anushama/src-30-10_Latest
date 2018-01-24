import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindRealityAgentSuccessPage } from './find-reality-agent-success';
import { PipesModule } from "../../pipes/pipes.module";
import { HeaderComponentModule } from "../../components/header/header.module";

@NgModule({
  declarations: [
    FindRealityAgentSuccessPage,
  ],
  imports: [
    IonicPageModule.forChild(FindRealityAgentSuccessPage),PipesModule, HeaderComponentModule
  ],
  exports: [
    FindRealityAgentSuccessPage
  ]
})
export class FindRealityAgentSuccessPageModule {}
