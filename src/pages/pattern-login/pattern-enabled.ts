import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {InboxPage} from '../inbox/inbox';
import {PatternLoginSetupPage} from '../pattern-login/pattern-login-setup';
import { SettingsPage } from '../../pages/settings/settings';
import { SessionManager } from '../core/session-manager';
/**
 * Generated class for the PatternEnabledPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-pattern-enabled',
  templateUrl: 'pattern-enabled.html',
})
export class PatternEnabledPage {

  private rootPage:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private sessionManager: SessionManager) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatternEnabledPage');
  }
  changePattern() {
    this.navCtrl.push(PatternLoginSetupPage);    // need to add respected component
  }
  done() {
   this.rootPage = this.sessionManager.checkRootPage;
    if(this.rootPage != SettingsPage) {
      this.navCtrl.setRoot(SettingsPage);
      this.navCtrl.popToRoot();
    }
    else {
      this.navCtrl.popToRoot();
    }
  }
}
