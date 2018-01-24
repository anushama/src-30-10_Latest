import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utility } from '../core/utility';
/**
 * Generated class for the ApplicationDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-application-details',
  templateUrl: 'application-details.html',
})
export class ApplicationDetailsPage {
  private applicationDetails: any;
  private isLoanAmount: boolean = false;
  private isTerm: boolean = false;
  private isRate: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private utility: Utility) {
    this.applicationDetails = navParams.get('data');
    // console.log('app details is ==>', this.applicationDetails);
    // console.log(this.applicationDetails.creditAmt);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ApplicationDetailsPage');
    // Adobe Analytics page tracking
    this.utility.trackPage('ApplicationDetailsPage');
    if (this.applicationDetails.parentProductType === 'LOAN') {
      // Loan amount
      if (this.applicationDetails.creditAmt &&
        this.applicationDetails.creditAmt > 0) {
        this.isLoanAmount = true;
      }
      // Term
      if (this.applicationDetails.productType != 'CER' &&
        this.applicationDetails.term > 0 &&
        this.applicationDetails.term != 999) {
        this.isTerm = true;
      }
    }
    // Rate
    if (this.applicationDetails.rate &&
      (this.applicationDetails.currentStatus.toUpperCase() === 'APPROVED' ||
        this.applicationDetails.currentStatus.toUpperCase() === 'PRE-QUALIFIED')) {
      this.isRate = true;
    }
  }

  popView() {
    this.navCtrl.pop();
  }
}
