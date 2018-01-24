import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SessionManager } from '../core/session-manager';

@Component({
  selector: 'page-fingerprint-enabled',
  templateUrl: 'fingerprint-enabled.html',
})
export class FingerprintEnabledPage {

  public rootPage: any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sessionManager: SessionManager) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FingerprintEnabledPage');
  }

  goToInbox() {
    // this.navCtrl.push(InboxPage, {
    //   pageType:'INBOX_PAGE',
    //   payload: {}
    // })
  }

  done() {
    // this.rootPage = this.sessionManager.checkRootiInFingerprint;
    // if (this.rootPage != SettingsPage) {
    //   this.navCtrl.setRoot(SettingsPage);
    //   this.navCtrl.popToRoot();
    // }
    // else {
      this.navCtrl.popToRoot();
    // }
  }
}
