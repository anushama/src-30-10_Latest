import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HeaderComponent, HeaderTitleComponent } from './header';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderTitleComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    HeaderComponent,
    HeaderTitleComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponentModule {

}
