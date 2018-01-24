import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utility } from '../core/utility';

/**
 * Generated class for the HelploginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-helplogin',
  templateUrl: 'helplogin.html',
})
export class HelploginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private utility: Utility) {
  }

  ionViewDidLoad() {
    // Adobe Analytics page tracking
    this.utility.trackPage('HelploginPage');
    console.log('ionViewDidLoad HelploginPage');
  }

  /* Navigating to NeedHelpLoggingIn Page */
  popView() {
    this.navCtrl.pop();
  }

}
