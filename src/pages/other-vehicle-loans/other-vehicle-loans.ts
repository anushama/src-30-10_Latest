import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utility } from '../core/utility';
/**
 * Generated class for the OtherVehicleLoansPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-other-vehicle-loans',
  templateUrl: 'other-vehicle-loans.html',
})
export class OtherVehicleLoansPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private utility: Utility) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherVehicleLoansPage');
    //Analytics
    this.utility.trackPage('OtherVehicleLoansPage');
  }

}
