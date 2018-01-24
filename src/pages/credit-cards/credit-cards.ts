import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utility } from '../core/utility';

/**
 * Generated class for the CreditCardsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-credit-cards',
  templateUrl: 'credit-cards.html',
})
export class CreditCardsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private utility: Utility) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreditCardsPage');
    // Adobe Analytics page tracking
    this.utility.trackPage('LocationsPage');
  }

}
