import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PatternLoginSetupPage } from '../pattern-login/pattern-login-setup';
import { AboutPatternLoginPage } from '../pattern-login/about-pattern-login';
import { QuickLoginSetupProvider } from '../../providers/quick-login-setup/quick-login-setup';
import { SessionManager } from '../core/session-manager';
import { AccountsServiceProvider } from '../../providers/accounts-service/accounts-service';
import { AEMContentSyncKeyValuePipe } from "../../pipes/aemkey";
import { ContentSyncDataProvider } from "../../providers/content-sync/conten-sync-data-provider";
import { ContentSyncExec } from "../../providers/content-sync-exec";
import { Http } from '@angular/http';
import { StorageProvider } from '../../providers/storage/storage';
import { ErrorMessages } from '../../config/global-config';
import { Utility } from "../core/utility";

@IonicPage()
@Component({
  selector: 'page-pattern-login',
  templateUrl: 'pattern-login.html',
})
export class PatternLoginPage {
  public isPatternEnabled: boolean = false;
  private quickLoginInfo: string = null;

  private accountsObj: any;
  private savedUser: string = null;
  private FPQuickLoginId: string = null;
  private userName: string = null;

  constructor(public platform: Platform, private navCtrl: NavController,
    private navParams: NavParams, private alertCtrl: AlertController,
    private securedStorage: StorageProvider, private sessionManager: SessionManager,
    private serviceProvider: QuickLoginSetupProvider, private acountServiceProvider: AccountsServiceProvider,
    private contentSyncDataProvider: ContentSyncDataProvider,
    private contentSyncExec: ContentSyncExec, public http: Http, private utility: Utility) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatternLoginPage');
    this.securedStorage.readFromStorage('savedUser').then((data) => {
      console.log("111");
      if (data != null) {
        console.log("222");
        this.securedStorage.readFromStorage('formattedFirstName').then((firstUserName) => {
          if (firstUserName != null) {
            this.userName = firstUserName;
          }
        });
      }
    });
    let patternEnabled: string = null;
    this.checkLocalStorage();
    
  }

  //back to previous page;
  popView() {
    this.navCtrl.pop();
  }

  setupPattern() {
    if (this.FPQuickLoginId != null) {
      this.alertForDisableFingerprintLoginOrNot();
    }
    else this.navCtrl.push(PatternLoginSetupPage);

  }
  changePattern() {
    this.navCtrl.push(PatternLoginSetupPage);
  }

  //navigate to about pattern login
  goToAboutPatternLogin() {
    this.navCtrl.push(AboutPatternLoginPage);
  }

  //
  goToDisablePatternLogin() {
    this.alertForDisablePatternLogin();

  }
  checkLocalStorage() {
    this.securedStorage.readFromStorage('QuickLoginId').then((data) => {
      if (data != null) {//data != null
        this.quickLoginInfo = data;
        this.isPatternEnabled = true;
      }
    });
    this.securedStorage.readFromStorage('FPQuickLoginId').then((data) => {
      if (data != null) {//data != null
        this.FPQuickLoginId = data;
      }
    });

    this.securedStorage.readFromStorage('pfsaveduser').then((data) => {
      if (data != null) {//data != null
        this.savedUser = data;
      }
    });

  }

  private alertForDisablePatternLogin() {
    new AEMContentSyncKeyValuePipe(this.contentSyncDataProvider, this.contentSyncExec, this.http).transform('pattern.create.modal.disable.info', ['pattern-login']).then(
      data => {
        let alert = this.alertCtrl.create({
          title: "Confirm",
          message: data,
          buttons: [
            {
              text: 'Cancel',
              role: 'Cancel',
              handler: () => {
                console.log('Cancel triggerd!');
              }
            },
            {
              text: 'Disable',
              role: 'Disable',
              cssClass: 'disableAlertButton',
              handler: () => {
                // this.isPatternEnabled = !this.isPatternEnabled;
                this.disablePatternLogin();
                console.log('Disable triggerd!');
              }
            }
          ]
        });
        alert.present();
        this.platform.pause.subscribe(() => {
          alert.dismiss();
        });
      });
  }

  disablePattern() {
    console.log('Disable PatternLoginPage');
  }

  backToParentView() {
    this.navCtrl.pop();
  }

  private disablePatternLogin() {

    this.serviceProvider.disableQuickLogin(this.quickLoginInfo).subscribe(
      (response: any) => {

        this.securedStorage.removeFromStorage('QuickLoginId');
        this.isPatternEnabled = false;
        this.securedStorage.removeFromStorage('EncryptedPattern');
        this.securedStorage.removeFromStorage('pfPrivatePem');
        this.securedStorage.removeFromStorage("pfPatternID");
        this.securedStorage.removeFromStorage("quickLoginSetup");
      },
      err => {
        this.utility.showAlert(ErrorMessages.SORRY, '', ErrorMessages.PATTERN_LOGIN_PATTERN_NOT_DISABLED, ErrorMessages.BUTTON_OK);
      }, () => {

      });
  }

  private alertForDisableFingerprintLoginOrNot() {
    let alert = this.alertCtrl.create({
      title: "Confirm",
      message: "Enable Pattern login will disable fingerprint login. Are you sure you want to continue?",
      buttons: [
        {
          text: 'Cancel',
          role: 'Cancel',
          handler: () => {
            console.log('Cancel triggerd!');
          }
        },
        {
          text: 'Continue',
          role: 'Continue',
          cssClass: 'disableAlertButton',
          handler: () => {
            this.disableFingerprintLogin();
            console.log('Disable triggerd!');
          }
        }
      ]
    });
    alert.present();
  }

  private disableFingerprintLogin() {
    this.serviceProvider.disableQuickLogin(this.FPQuickLoginId).subscribe(
      (response: any) => {
        this.securedStorage.removeFromStorage('FPQuickLoginId');
        this.securedStorage.removeFromStorage("deviceToken");
        this.securedStorage.removeFromStorage("FPPrivatePem");
        this.securedStorage.removeFromStorage("fingerprintLoginSetup");
        this.navCtrl.push(PatternLoginSetupPage);
      },
      err => {
        this.utility.showAlert(ErrorMessages.SORRY, '', ErrorMessages.FINGERPRINT_LOGIN_NOT_DISABLED, ErrorMessages.BUTTON_OK);        
      });
  }


}
