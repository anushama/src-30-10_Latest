import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreateNewpasswordPage } from '../create-newpassword/create-newpassword';
import { Utility } from "../core/utility";

/**
 * Generated class for the AccountUnlockedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account-unlocked',
  templateUrl: 'account-unlocked.html',
})
export class AccountUnlockedPage {
  public token:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private utility: Utility) {
    //console.log(this.navParams.get('payload'));
    this.token = this.navParams.get('payload').parameter;
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AccountUnlockedPage');
    this.utility.trackPage('Account-unlocked');
  }

  popView() {
    this.navCtrl.pop();
  }
  backToLoginPage() {
    this.navCtrl.popToRoot();
  }
  goToSetPasswordPage() {
    this.navCtrl.push(CreateNewpasswordPage,{token:this.token});
  }
}
