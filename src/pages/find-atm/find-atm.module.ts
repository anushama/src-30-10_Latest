import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FindAtmPage } from './find-atm';
import { AtmBranchSearchListPage } from './/atm-branch-search-list';
import { BranchDetailsPage } from './branch-details';
import { FindAtmProvider } from '../../providers/find-atm/find-atm';
import { PipesModule } from '../../pipes/pipes.module';
import { HeaderComponentModule } from '../../components/header/header.module';



@NgModule({
  declarations: [
    FindAtmPage,
    AtmBranchSearchListPage,
    BranchDetailsPage
  ],
  entryComponents: [
    FindAtmPage,
    AtmBranchSearchListPage,
    BranchDetailsPage
  ],
  providers: [
    FindAtmProvider
  ],
  imports: [IonicModule, PipesModule, HeaderComponentModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class FindAtmPageModule { }
