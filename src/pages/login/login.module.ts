import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { Device } from '@ionic-native/device';
import { LoginPatternPage } from "./login-pattern";
import { FooterComponentModule } from '../../components/footer/footer.module';
@NgModule({
  declarations: [
    LoginPage,
    LoginPatternPage
  ],
  entryComponents: [
    LoginPage,
    LoginPatternPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage), FooterComponentModule
  ],
  exports: [
  ],
  providers:[
    Device
  ]
})
export class LoginPageModule {}
