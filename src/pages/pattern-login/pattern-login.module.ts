import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicModule } from 'ionic-angular';
//import { IonicPageModule } from 'ionic-angular';
import { PatternLoginPage } from './pattern-login';
import { PatternLoginSetupPage } from './pattern-login-setup';
import { AboutPatternLoginPage } from './about-pattern-login';
import { PatternEnabledPage } from './pattern-enabled';
import { PipesModule } from '../../pipes/pipes.module';
import { QuickLoginSetupProvider } from '../../providers/quick-login-setup/quick-login-setup';
import { HeaderComponentModule } from '../../components/header/header.module';

@NgModule({
  declarations: [
     PatternLoginPage,
    PatternLoginSetupPage,
    AboutPatternLoginPage,
    PatternEnabledPage

  ],
    entryComponents: [
    PatternLoginPage,
    PatternLoginSetupPage,
    AboutPatternLoginPage,
    PatternEnabledPage
    ],
  providers: [
    QuickLoginSetupProvider
    ],
    imports: [IonicModule,PipesModule, HeaderComponentModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class PatternLoginPageModule {}
