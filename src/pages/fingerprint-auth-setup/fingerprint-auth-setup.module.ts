import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FingerprintLoginPage } from '../fingerprint-auth-setup/fingerprint-login';
import { FingerprintLoginAgreementPage } from '../fingerprint-auth-setup/fingerprint-login-agreement';
import { FingerprintLoginOptionsPage } from '../fingerprint-auth-setup/fingerprint-login-options';
import { FingerprintEnabledPage } from '../fingerprint-auth-setup/fingerprint-enabled';
import { PipesModule } from '../../pipes/pipes.module';
import { QuickLoginSetupProvider } from '../../providers/quick-login-setup/quick-login-setup';
import { HeaderComponentModule } from '../../components/header/header.module';


@NgModule({
  declarations: [
    FingerprintLoginPage,
    FingerprintLoginAgreementPage,
    FingerprintLoginOptionsPage,
    FingerprintEnabledPage

  ],
    entryComponents: [
      FingerprintLoginPage,
      FingerprintLoginAgreementPage,
      FingerprintLoginOptionsPage,
      FingerprintEnabledPage
    ],
  providers: [
    QuickLoginSetupProvider
    ],
    imports: [IonicModule,PipesModule, HeaderComponentModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class FingerprintAuthSetupPageModule {}
