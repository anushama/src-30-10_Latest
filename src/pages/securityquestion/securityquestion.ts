import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelploginPage } from '../../pages/helplogin/helplogin';
import { LoginPage } from '../../pages/login/login';
import { AccountLockedPage } from '../../pages/account-locked/account-locked';
import { ApiService } from '../../providers/api-service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { AppSettings } from '../core/app-settings';
import { SecurityQuestionProvider } from '../../providers/security-question/security-question';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { SessionManager } from "../core/session-manager";
import { StorageProvider } from "../../providers/storage/storage";
import { ErrorMessages } from '../../config/global-config';
import { Utility } from "../core/utility";
import { LoginService } from "../../providers/login-service/login-service";

interface securePageData {
  _body?: string
}

@IonicPage()
@Component({
  selector: 'page-securityquestion',
  templateUrl: 'securityquestion.html',
})
export class SecurityquestionPage {
  public counterValue: number;
  public securityQuestionForm: FormGroup;
  public counter: number = 0;
  public userName: any;
  private quickLogin: boolean = false;;
  // public appSettings = AppSettings.singletonInstance();

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams,
    public api: ApiService, public storageService: StorageProvider, public questionProvider: SecurityQuestionProvider,
    public locationTracker: LocationTrackerProvider, private appSettings: AppSettings, private sessionManager: SessionManager, 
    private utility: Utility, private loginService: LoginService) {
    this.quickLogin = (this.navParams.get("quickLogin") != undefined) ? this.navParams.get("quickLogin") : false;
    this.securityQuestionForm = new FormGroup({
      secureAnswer: new FormControl('', Validators.compose([Validators.required])),
      saveDevice: new FormControl(false, [])
    });
  }

  ionViewDidLoad() {
    this.userName = this.sessionManager.userName;
    console.log('ionViewDidLoad SecurityquestionPage');
  }

  submitSecurityQuestion() {
    // let appSettings = AppSettings.singletonInstance();
    this.api.submitSecurityQuestion(this.securityQuestionForm.value.secureAnswer, this.securityQuestionForm.value.saveDevice, this.sessionManager.deviceToken).subscribe(//, this.appSettings
      (response: any) => {
        let res = JSON.parse(response._body);
        console.log('Security Page resp from api:::' + res.deviceToken)
        if (res.deviceToken != null) {
          this.sessionManager.deviceToken = res.deviceToken;
          this.storageService.writeToStorage('deviceToken', res.deviceToken);
        }
        this.api.securityQuestionId = res.securityQuestionId;
        if (res.accountLocked === true || this.counter == 3) {
          this.navCtrl.push(AccountLockedPage);
        }
        if (res.responseCorrect === true && res.accountLocked === false) {
          this.api.hash = res.securityHash;
          if(this.quickLogin) {
            this.loginService.loginInfoObj.secHash = res.securityHash;
            this.loginService.loginWithTouch();
          } else {
            this.navCtrl.setRoot(LoginPage, {
              userName: this.userName,
              securityPage: true,
              showTouch: false
            });
          }
        } else if (res.responseCorrect === false) {
          if (this.counter < 2) {
            this.alertForWrongAnswer();
          }
        }
      })
  }

  alertForWrongAnswer() {
    this.utility.showAlert(ErrorMessages.POPUP_TTILE, '', ErrorMessages.SECURITY_MISSMATCH, ErrorMessages.BUTTON_OK);    
  }

  differentUserLogin() {
    this.storageService.clearStorage();
    this.navCtrl.push(LoginPage);
  }
  helpLoggingIn() {
    this.navCtrl.push(HelploginPage);
  }
  cancelView() {
    this.navCtrl.popToRoot();
  }
}
