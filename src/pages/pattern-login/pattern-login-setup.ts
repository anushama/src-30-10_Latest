import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as patternLock from 'patternLock';

import { SessionManager } from '../core/session-manager';
import { QuickLoginSetupProvider } from '../../providers/quick-login-setup/quick-login-setup';
import { PatternEnabledPage } from '../pattern-login/pattern-enabled';
import { PlatformServiceProvider } from '../../providers/platform-service/platform-service';
import { Utility } from '../core/utility';
import { StorageProvider } from '../../providers/storage/storage';
import { ErrorMessages } from '../../config/global-config';
@Component({
  selector: 'pattern-login-setup',
  templateUrl: 'pattern-login-setup.html',
})
export class PatternLoginSetupPage implements AfterViewInit {
  @ViewChild('patternlockContainer') divPatternContainer: ElementRef;

  private patternLock: any;
  private divId: any;
  private createdPattern: any;
  public isConfirmPage: boolean = false;
  public clearButtonDisble: boolean = true;
  public confirmButtonDisable: boolean = true;
  public disabledButton: boolean = true;
  private quickLoginInfo: string = null;
  private isChangePattern: boolean = false;
  private privateKEY: string = null;
  private publicKEY: string = null;
  public goToAccountsPage;
  private privateKeyUnencrypted: any;
  private publicPEM: any;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private serviceProvider: QuickLoginSetupProvider,
    private elementRef: ElementRef,
    private utility: Utility,
    private pltfmService: PlatformServiceProvider,
    private securedStorage: StorageProvider, private sessionManager: SessionManager) {
    this.goToAccountsPage = this.navParams.get("goToAccountsPage");

  }
  ionViewDidLoad() {

    this.checkLocalStorage();
    this.createPattern();
  }

  ionViewDidLeave() {
    console.log(this.patternLock);
    this.patternLock = null;
    this.divId.remove();
  }

  popView() {
    this.navCtrl.pop();

  }
  ngAfterViewInit() {
    this.divId = document.getElementById('patternlock-settings-div');
    console.log(this.divId);

  }

  private createPattern() {
    this.patternLock = new patternLock(this.divId);
  }

  onClearClick() {
    this.patternLock.reset();
    this.clearButtonDisble = true;
    this.confirmButtonDisable = true;
  }
  onTouchEndEvent() {
    let temppattern = this.patternLock.getPattern();
    if (temppattern.length <= 0) {
      this.onClearClick();
    }
    else {
      this.clearButtonDisble = false;
      if (temppattern.length > 3) {
        this.confirmButtonDisable = false;
      }
    }
  }

  onContinueClick() {
    this.createdPattern = this.patternLock.getPattern();
    console.log(this.createdPattern);
    this.isConfirmPage = true;
    this.patternLock.reset();
    this.clearButtonDisble = true;
    this.confirmButtonDisable = true;
  }
  onSaveClick() {

    let temPattern = this.patternLock.getPattern();

    if (temPattern === this.createdPattern) {
      this.enablePatternLogin();
    }
    else {
      this.utility.showAlert(ErrorMessages.PATTERN_MISSMATCH, '', ErrorMessages.PATTERN_LOGIN_PATTERN_MISSMATCH, ErrorMessages.BUTTON_OK);
    }
  }

  checkLocalStorage() {
    this.securedStorage.readFromStorage('QuickLoginId').then((data) => {
      if (data != null) {//data != null
        this.quickLoginInfo = data;
        this.isChangePattern = true;
      }
    });
  }

  private getRequestObject() {
    // let sessionManager = SessionManager.singletonInstance();
    let deviceInfo = this.pltfmService.getRsaDeviceInfo();

    if (this.isChangePattern) {
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
  private enablePatternLogin() {

    let objKeys = this.utility.generatePublicPrivateKeys(true, this.createdPattern);
    this.patternLock.reset();
    let privatePem = objKeys.privatePem;

    let requestObj = this.getRequestObject();
    requestObj.publicKeyPem = objKeys.publicKeyPem;

    this.serviceProvider.enableQuickLogin(requestObj).subscribe(
      (response: any) => {
        let res = JSON.parse(response._body);
        let quickLoginId = res.quickLoginId;
        let deviceToken = res.deviceToken;
        this.securedStorage.writeToStorage("QuickLoginId", quickLoginId);
        this.securedStorage.writeToStorage("deviceToken", deviceToken);
        this.securedStorage.writeToStorage("pfPrivatePem", privatePem);
        this.securedStorage.writeToStorage("pfPatternID", this.createdPattern);
        this.securedStorage.readFromStorage('userNameForPWD').then((data) => {
          if (data != null) {
            this.securedStorage.writeToStorage("pfsaveduser", data);
            this.securedStorage.writeToStorage("savedUser", data);
          }
        });

        this.securedStorage.writeToStorage("welcomeMemberFlag", true);
        this.securedStorage.writeToStorage("pfQuickLoginUser", requestObj.username);
        this.securedStorage.writeToStorage("quickLoginSetup", true);
        this.sessionManager.deviceToken = deviceToken;
        this.navCtrl.push(PatternEnabledPage);

      }, err => {
        this.utility.showAlert(ErrorMessages.SORRY, '', ErrorMessages.PATTERN_LOGIN_PATTERN_MISSMATCH, ErrorMessages.BUTTON_OK);
      }, () => {
      });
  }
}
