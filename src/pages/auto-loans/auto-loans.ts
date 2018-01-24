import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utility } from '../core/utility';
/**
 * Generated class for the AutoLoansPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-auto-loans',
  templateUrl: 'auto-loans.html',
})
export class AutoLoansPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private utility: Utility) {
  }

  ionViewDidLoad() {
    // Adobe Analytics page tracking
    this.utility.trackPage('AutoLoansPage');
  }

}
