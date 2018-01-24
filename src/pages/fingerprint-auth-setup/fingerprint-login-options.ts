import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SessionManager } from '../core/session-manager';

import { LoginPage } from '../../pages/login/login';
import { AccountsPage } from '../../pages/accounts/accounts';
import { SettingsPage } from '../../pages/settings/settings';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'fingerprint-login-options',
  templateUrl: 'fingerprint-login-options.html',
})
export class FingerprintLoginOptionsPage {

  private FPQuickLoginId: any = null;
  private QuickLoginId: any = null;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private securedStorage: StorageProvider,
    private sessionManager: SessionManager,
    private elementRef: ElementRef) {

    this.checkLocalStorage();
  }

  checkLocalStorage() {
    this.securedStorage.readFromStorage('FPQuickLoginId').then((data) => {
      if (data != null) { //data != null
        this.FPQuickLoginId = data;
      }
    });
    this.securedStorage.readFromStorage('QuickLoginId').then((data) => {
      if (data != null) { //data != null
        this.QuickLoginId = data;
      }
    });
  }

  ionViewDidLoad() {
    this.securedStorage.writeToStorage("loginOPtionShown", true);
  }

  dismissView() {
    this.gotoAccountsPage();
  }

  // Redirect to fingetprint login page if enabled, otherwise redirect to settings page
  goToFingerprintLoginPage() {
    this.sessionManager.checkRootiInFingerprint = LoginPage;
    if (this.FPQuickLoginId != null) {
      this.gotoAccountsPage();
    }
    else this.gotoSettingsPage();
  }

  //Redirect to pattern login page if enabled, otherwise redirect to settings page
  goToPatternLoginPage() {
    this.sessionManager.checkRootPage = LoginPage;
    if (this.QuickLoginId != null) {
      this.gotoAccountsPage();
    }
    else this.gotoSettingsPage();
  }

  //Redirect to accounts page
  gotoAccountsPage() {
    this.navCtrl.setRoot(AccountsPage);
  }

  //Redirect to settings page
  gotoSettingsPage() {
    this.navCtrl.setRoot(SettingsPage);
  }

}
