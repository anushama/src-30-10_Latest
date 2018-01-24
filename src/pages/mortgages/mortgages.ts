import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utility } from '../core/utility';
/**
 * Generated class for the MortgagesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mortgages',
  templateUrl: 'mortgages.html',
})
export class MortgagesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private utility: Utility) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MortgagesPage');
    //Analytics
    this.utility.trackPage('MortgagesPage');

  }

}
