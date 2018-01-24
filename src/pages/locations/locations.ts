import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { Utility } from '../core/utility';
/**
 * Generated class for the LocationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private utility: Utility) {
  }

  ionViewDidLoad() {
    // Adobe Analytics page tracking
    this.utility.trackPage('LocationsPage');
    console.log('ionViewDidLoad LocationsPage');
  }
  cancelView(){
    this.navCtrl.push(LoginPage);
  }
}
