import { Component, Inject, forwardRef } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams } from 'ionic-angular';
import { ContactInfoPage } from '../contact-info/contact-info';
import { ChangePasswordPage } from '../change-password/change-password';
import { AccountShowhidePage } from '../account-showhide/account-showhide';
import { AccountNicknamePage } from '../account-nickname/account-nickname';
import { PatternLoginPage } from '../pattern-login/pattern-login'
import { FingerprintLoginPage } from '../fingerprint-auth-setup/fingerprint-login';
import { SessionManager } from '../core/session-manager';
import { AccountsServiceProvider } from "../../providers/accounts-service/accounts-service";
import { ResetAccountsDataProvider } from "../../providers/reset-accounts-data/reset-accounts-data";
import { AlertsAndNotificationsSetupPage } from '../alerts-and-notifications/alerts-and-notifications-setup';

import { AEMContentSyncKeyValuePipe } from "../../pipes/aemkey";
import { ContentSyncDataProvider } from "../../providers/content-sync/conten-sync-data-provider";
import { ContentSyncExec } from "../../providers/content-sync-exec";
import { Http } from '@angular/http';


import { StorageProvider } from '../../providers/storage/storage';
import { ErrorMessages } from '../../config/global-config';
import { AppSettings } from "../core/app-settings";
import { Utility } from "../core/utility";
import { Subscription } from "rxjs/Subscription";
import { LoginService } from "../../providers/login-service/login-service";
/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  public stayLoggedIn: boolean;

  private onSettingsPageResume: Subscription;

  constructor( @Inject(forwardRef(() => LoginService)) private loginService: LoginService, public navCtrl: NavController,
    private navParams: NavParams, public resetAccounts: ResetAccountsDataProvider, private sessionManager: SessionManager,
    public accountsApi: AccountsServiceProvider, private platform: Platform, private storageProvider: StorageProvider,
    private contentSyncDataProvider: ContentSyncDataProvider,
    private contentSyncExec: ContentSyncExec, public http: Http,
    private appSettings: AppSettings, private utility: Utility) {

    this.storageProvider.readFromStorage("stayLoggedIn").then(res => {
      if (res !== null)
        this.stayLoggedIn = res;
      else {
        this.stayLoggedIn = false;
        this.storageProvider.writeToStorage("stayLoggedIn", this.stayLoggedIn);
      }
    });

    this.onSettingsPageResume = platform.resume.subscribe(() => {
      //Checking TouchId condition only when application on HomePage
      this.loginService.checkTouchAvailable(this.navCtrl, false);
      console.log("On Resume");
    });
  }

  hideGroup(element) {
    return element.showAccount === false;
  }

  showAllAccountsFunc(accountGroup) {
    let resp: any[] = [];
    for (var key in accountGroup) {
      if (accountGroup.hasOwnProperty(key)) {
        var element = accountGroup[key];
        console.log(element);
        resp.push(element)
      }
    }
    let hideAll = resp.every(indx => indx === true)
    return !hideAll;
  }

  helpPopUp() {
    this.utility.showAlert(ErrorMessages.STAY_LOGGED_ON, '', ErrorMessages.STAY_LOGGED_ON_MSG, ErrorMessages.BUTTON_OK);
  }

  notificationPopUp() {
    this.utility.showAlert(ErrorMessages.NOTIFICATION, '', ErrorMessages.NOTIFICATION_ON_MSG, ErrorMessages.BUTTON_OK);
  }

  goToContactInfoPage() {
    this.navCtrl.push(ContactInfoPage);
  }
  goToChangePasswordPage() {
    this.navCtrl.push(ChangePasswordPage);
  }

  toggleStayLoggedIn(e) {
    // Bind to the event value rather than the native object, because it causes a loop trying to decifer between a slide toggle and a click.
    this.stayLoggedIn = e.value;
    this.storageProvider.writeToStorage('stayLoggedIn', this.stayLoggedIn);
  }
  goToAccountShowhide() {
    console.log("RM inside ---> Accountshow hide page")
    this.navCtrl.push(AccountShowhidePage);
  }
  goToAccountNickname() {
    this.navCtrl.push(AccountNicknamePage);
  }
  goToTravelNotifications() {
    this.navCtrl.push('TravelNotificationsPage');
  }
  public goToSetupPatternLogin() {
    this.navCtrl.push(PatternLoginPage);
  }

  goToNotificationsPage(clickSource, event) {
    console.log('param: ', clickSource);

    if (clickSource === 'icon') {
      event.stopPropagation();
      this.helpPopUp();
    } else {
      this.navCtrl.push(AlertsAndNotificationsSetupPage);
    }
  }

  goToSetupFingerprintLogin() {
    let notEnabledtitle: string = '';
    let notEnabledMsg: string = '';
    if (this.platform.is('android')) {
      notEnabledtitle = 'fingerprint.not.enabled.popup.title';
      notEnabledMsg = 'fingerprint.not.enabled.popup.msg';

    } else if (this.platform.is('ios')) {
      notEnabledtitle = 'touchid.not.enabled.popup.title';
      notEnabledMsg = 'touchid.not.enabled.popup.msg';
    }


    if (this.appSettings.isDeviceTouchEnabled && !this.appSettings.isDeviceTouchLocked) this.navCtrl.push(FingerprintLoginPage);
    else {
      new AEMContentSyncKeyValuePipe(this.contentSyncDataProvider, this.contentSyncExec, this.http).transform(notEnabledtitle, ['fingerprint-login']).then(
        notEnabledtitle => {
          new AEMContentSyncKeyValuePipe(this.contentSyncDataProvider, this.contentSyncExec, this.http).transform(notEnabledMsg, ['fingerprint-login']).then(
            notEnabledMsg => {
          this.utility.showAlert(notEnabledtitle, '',notEnabledMsg , ErrorMessages.BUTTON_OK);
        });

      });
    }
  }

  ngOnDestroy() {
    this.onSettingsPageResume.unsubscribe();
  }
}
