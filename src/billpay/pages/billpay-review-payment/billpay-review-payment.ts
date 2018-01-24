import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BillpayPaymentScheduledPage } from '../billpay-payment-scheduled/billpay-payment-scheduled';

/**
 * Generated class for the BillpayReviewPaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-billpay-review-payment',
  templateUrl: 'billpay-review-payment.html',
})
export class BillpayReviewPaymentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillpayReviewPaymentPage');
  }

  makePayment() {
    this.navCtrl.push(BillpayPaymentScheduledPage);
  }

}
