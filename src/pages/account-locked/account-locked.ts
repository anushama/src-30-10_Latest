import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UnlockAccountPage } from '../unlock-account/unlock-account';
import { LoginPage } from '../login/login';
import { Utility } from '../core/utility';

/**
 * Generated class for the AccountLockedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account-locked',
  templateUrl: 'account-locked.html',
})
export class AccountLockedPage {
  public doubleLocked: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private utility: Utility) {
    //console.log(this.navParams.get('doubleLocked'))
    if (this.navParams.get('doubleLocked')) {
      this.doubleLocked = (this.navParams.get('doubleLocked') !== undefined ? this.navParams.get("doubleLocked") : false);
    }
  }

  popView() {
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    //Analytics
    this.utility.trackPage('AccountLockedPage');
  }

  goToUnlockPage() {
    this.navCtrl.push(UnlockAccountPage);
  }
  backToLoginPage() {
    this.navCtrl.push(LoginPage);
  }
}
