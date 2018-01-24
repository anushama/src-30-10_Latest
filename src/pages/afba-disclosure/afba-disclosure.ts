import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utility } from '../core/utility';
/**
 * Generated class for the AfbaDisclosurePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-afba-disclosure',
  templateUrl: 'afba-disclosure.html',
})
export class AfbaDisclosurePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private utility: Utility) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AfbaDisclosurePage');
    // Adobe Analytics page tracking
    this.utility.trackPage('AfbaDisclosurePage');
  }

  backToContactPage() {
    this.navCtrl.push("ContactPage", {
      fromLogin: true
    });
  }

}
