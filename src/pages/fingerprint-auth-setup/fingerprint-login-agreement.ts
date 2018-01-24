import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { TouchID } from '@ionic-native/touch-id';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { SessionManager } from '../core/session-manager';
import { FingerprintEnabledPage } from '..//fingerprint-auth-setup/fingerprint-enabled';
import { PlatformServiceProvider } from '../../providers/platform-service/platform-service';
import { QuickLoginSetupProvider } from '../../providers/quick-login-setup/quick-login-setup';
import { Utility } from '../core/utility';
import { StorageProvider } from '../../providers/storage/storage';
import { ErrorMessages } from '../../config/global-config';
import { AppSettings } from "../core/app-settings";

@Component({
  selector: 'page-fingerprint-login-agreement',
  templateUrl: 'fingerprint-login-agreement.html',
})
export class FingerprintLoginAgreementPage {
  private quickLoginInfo: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private androidfingerAuth: AndroidFingerprintAuth,
    private touchId: TouchID,
    private platform: Platform,
    private pltfmService: PlatformServiceProvider,
    private serviceProvider: QuickLoginSetupProvider,
    private securedStorage: StorageProvider,
    private utility: Utility, private sessionManager: SessionManager, private appSettings: AppSettings) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPatternLoginPage');
    this.checkLocalStorage();
  }

  //Private Functions
  checkLocalStorage() {
    this.securedStorage.readFromStorage('FPQuickLoginId').then((data) => {
      if (data != null) {
        this.quickLoginInfo = data;
      }
    });
  }

  private getRequestObject() {
    let deviceInfo = this.pltfmService.getRsaDeviceInfo();
    if (this.quickLoginInfo != null) {
      let requestObj = {
        publicKeyPem: "",
        quickLoginId: this.quickLoginInfo,
        deviceInfo: deviceInfo,
        deviceToken: this.sessionManager.deviceToken,
        username: this.sessionManager.userName
      };
      return requestObj;
    }
    else {
      let requestObj = {
        publicKeyPem: "",
        deviceInfo: deviceInfo,
        deviceToken: this.sessionManager.deviceToken,
        username: this.sessionManager.userName
      };
      return requestObj;
    }
  }

  private setupFingerprint() {
    let objKeys = this.utility.generatePublicPrivateKeys(false, null);
    let privateKeyUnencryptedVal = objKeys.privatePem;
    let requestObj = this.getRequestObject();
    requestObj.publicKeyPem = objKeys.publicKeyPem;
    this.serviceProvider.enableQuickLogin(requestObj).subscribe(
      (response: any) => {
        let res = JSON.parse(response._body);
        this.securedStorage.writeToStorage("FPQuickLoginId", res.quickLoginId);
        this.securedStorage.writeToStorage("deviceToken", res.deviceToken);
        this.securedStorage.writeToStorage("pfPrivatePem", privateKeyUnencryptedVal);
        this.securedStorage.readFromStorage('userNameForPWD').then((data) => {
          if (data != null) {
            this.securedStorage.writeToStorage("pfsaveduser", data);
            this.securedStorage.writeToStorage("savedUser", data);
          }
        });

        this.securedStorage.writeToStorage("welcomeMemberFlag", true);
        this.securedStorage.writeToStorage("pfQuickLoginUser", requestObj.username);
        this.securedStorage.writeToStorage("fingerprintLoginSetup", true);
        this.sessionManager.deviceToken = res.deviceToken;
        console.log("SAVEDFingerprint ID::::" + res.quickLoginId);
        console.log("in SAVED PRIVATE KEY :::::" + privateKeyUnencryptedVal);
        this.navCtrl.push(FingerprintEnabledPage);
      }, err => {
        this.utility.showAlert('', '', ErrorMessages.FINGERPRINT_LOGIN_UNABLE_TO_VERIFY, ErrorMessages.BUTTON_OK);
      }, () => {
      });
  }
  scanFingerprint() {
    if (this.platform.is("cordova")) {
      if (this.platform.is('ios')) {
        this.scanFingerprintIOS();
      }
      else if (this.platform.is('android')) {
        this.scanFingerprintAndroid();
      }
    }
  }

  private scanFingerprintIOS() {
    this.touchId.verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel('Scan your fingerprint please', '')
      .then(
      res => {
        console.log('Ok', res);
        //Setup Fingerprint
        this.setupFingerprint();
      },
      err => {
        if(err.code == -8) {
          this.appSettings.isDeviceTouchLocked = true;
        }
        console.error('Error', err);
        this.navCtrl.popToRoot();
      }
      );
  }
  private scanFingerprintAndroid() {
    this.androidfingerAuth.encrypt({ clientId: 'PenFedMobile', disableBackup: true, dialogTitle: 'Fingerprint Authorization' })
      .then(result => {
        if (result.withFingerprint) {
          this.setupFingerprint();
        } else {
          console.log('Didn\'t authenticate!');
          this.navCtrl.popToRoot();
        }
      })
      .catch(error => {
        this.navCtrl.popToRoot();
        console.error(error)
      });
  }
}