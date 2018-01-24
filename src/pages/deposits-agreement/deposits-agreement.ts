import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utility } from '../core/utility';


/**
 * Generated class for the DepositsAgreementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-deposits-agreement',
  templateUrl: 'deposits-agreement.html',
})
export class DepositsAgreementPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private utility: Utility) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DepositsAgreementPage');
    // Adobe Analytics page tracking
    this.utility.trackPage('DepositsAgreementPage');  }

  backToLogin() {
    this.navCtrl.pop();
  }

}
