import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utility } from '../core/utility';

/**
 * Generated class for the DepositPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-deposit',
  templateUrl: 'deposit.html',
})
export class DepositPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private utility: Utility) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DepositPage');
    // Adobe Analytics page tracking
    this.utility.trackPage('DepositPage');
  }

}
