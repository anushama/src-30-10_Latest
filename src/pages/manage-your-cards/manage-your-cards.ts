import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utility } from '../core/utility';
/**
 * Generated class for the ManageYourCardsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-manage-your-cards',
  templateUrl: 'manage-your-cards.html',
})
export class ManageYourCardsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private utility: Utility) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageYourCardsPage');
    //Analytics
    this.utility.trackPage('ManageYourCardsPage');

  }

}
