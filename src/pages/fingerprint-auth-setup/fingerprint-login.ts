import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { QuickLoginSetupProvider } from '../../providers/quick-login-setup/quick-login-setup';
import { SessionManager } from '../core/session-manager';
import { FingerprintLoginAgreementPage } from '../fingerprint-auth-setup/fingerprint-login-agreement';
import { StorageProvider } from '../../providers/storage/storage';
import { AccountsServiceProvider } from '../../providers/accounts-service/accounts-service';
import { AEMContentSyncKeyValuePipe } from "../../pipes/aemkey";
import { ContentSyncDataProvider } from "../../providers/content-sync/conten-sync-data-provider";
import { ContentSyncExec } from "../../providers/content-sync-exec";
import { Http } from '@angular/http';
import { Utility } from '../core/utility';
import { ErrorMessages } from '../../config/global-config';

@Component({
  selector: 'page-fingerprint-login',
  templateUrl: 'fingerprint-login.html',
})
export class FingerprintLoginPage {
  private isFingerprintEnabled: boolean = false;
  private fpQuickLoginInfo: string = null;
  private accountsObj: any;
  private savedUser: string = null;
  private quickLoginId: any;
  private userName: any;

  constructor(public platform: Platform, private navCtrl: NavController,
    private navParams: NavParams,
    private securedStorage: StorageProvider, private contentSyncDataProvider: ContentSyncDataProvider,
    private contentSyncExec: ContentSyncExec, public http: Http,
    private sessionManager: SessionManager,
    private serviceProvider: QuickLoginSetupProvider,
    private acountServiceProvider: AccountsServiceProvider,
    private util: Utility) {

    this.userName = this.sessionManager.userName;
    console.log(this.userName);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FingerprintLoginPage');
    this.checkLocalStorage();
  }

  //back to previous page;
  // popView() {
  //   this.navCtrl.push(SettingsPage);
  // }

  goToFingerprintLoginAgreement() {
    if (this.quickLoginId != null) {
      this.alertForDisablePatternOrNot();
    }
    else this.navCtrl.push(FingerprintLoginAgreementPage);
  }

  //
  goToDisableFingerprintLogin() {
    this.alertForDisableFingerprintLogin();
  }

  checkLocalStorage() {
    this.securedStorage.readFromStorage('FPQuickLoginId').then((data) => {
      if (data != null) { // data != null
        this.fpQuickLoginInfo = data;
        this.isFingerprintEnabled = true;
      }
    });
    this.securedStorage.readFromStorage('pfsaveduser').then((data) => {
      if (data != null) { //data != null
        this.savedUser = data;
        console.log("savedUser...", this.savedUser);
      }
    });
    this.securedStorage.readFromStorage('QuickLoginId').then((data) => {
      if (data != null) { //data != null
        this.quickLoginId = data;
      }
    });
  }

  private alertForDisableFingerprintLogin() {
    this.util.showConfirmDialg(ErrorMessages.POPUP_TTILE_CONFIRM, '',
      ErrorMessages.FINGERPRINT_LOGIN_DISABLE_INFO, ErrorMessages.BUTTON_CANCEL,
      ErrorMessages.BUTTON_DISABLE, this.disableFingerprintLogin.bind(this));
  }

  private disableFingerprintLogin() {
    console.log("Fingerprint ID::::" + this.fpQuickLoginInfo);
    this.serviceProvider.disableQuickLogin(this.fpQuickLoginInfo).subscribe(
      (response: any) => {
        this.securedStorage.removeFromStorage('FPQuickLoginId');
        this.securedStorage.removeFromStorage("deviceToken");
        this.securedStorage.removeFromStorage("FPPrivatePem");
        this.securedStorage.removeFromStorage("fingerprintLoginSetup");
        this.securedStorage.removeFromStorage("savedUser");
        this.securedStorage.removeFromStorage("formattedFirstName");
        this.isFingerprintEnabled = false;
        this.navCtrl.pop();
      },
      err => {
        console.log("FINGERPRINT DISABLE::" + err);
        this.util.showAlert(ErrorMessages.ERROR, '', ErrorMessages.FINGERPRINT_LOGIN_NOT_DISABLED, ErrorMessages.BUTTON_OK);
      }, () => {
        // onComplete block
      });
  }

  private alertForDisablePatternOrNot() {
    new AEMContentSyncKeyValuePipe(this.contentSyncDataProvider, this.contentSyncExec, this.http).transform("fingerprint.enable.disable.pattern.popup.msg", ['fingerprint-login']).then(
      msg => {
        this.util.showConfirmDialg(ErrorMessages.FINGERPRINT_LOGIN_ENABLE_TITLE, '', msg, ErrorMessages.BUTTON_CANCEL,
          ErrorMessages.BUTTON_CONTINUE, this.disablePatternLogin.bind(this));
      })
  }

  private disablePatternLogin() {
    this.serviceProvider.disableQuickLogin(this.quickLoginId).subscribe(
      (response: any) => {
        this.securedStorage.removeFromStorage('QuickLoginId');
        this.securedStorage.removeFromStorage("deviceToken");
        this.securedStorage.removeFromStorage("pfPrivatePem");
        this.securedStorage.removeFromStorage("pfPatternID");
        this.securedStorage.removeFromStorage("quickLoginSetup");
        this.navCtrl.push(FingerprintLoginAgreementPage);
      },
      err => {
        this.util.showAlert(ErrorMessages.ERROR, '', ErrorMessages.PATTERN_LOGIN_NOT_DISABLED, ErrorMessages.BUTTON_OK);
      }, () => {
        // onComplete block
      });
  }

}
