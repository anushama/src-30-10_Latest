import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { TransfersProvider } from './providers/transfers';
import { PipesModule } from "../pipes/pipes.module";
// import { DirectivesModule } from "../directives/directives.module"
import { AddExtAcctProvider } from './providers/add-ext-acct'

@NgModule({
    declarations: [
    ],
    entryComponents: [
    ],
    providers: [
        TransfersProvider,AddExtAcctProvider
    ],
    imports: [IonicModule, PipesModule],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TransfersModule {

}
