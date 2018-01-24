import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BillpayReviewPaymentPage } from '../billpay-review-payment/billpay-review-payment';

/**
 * Generated class for the BillpayModifyAutoPayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-billpay-modify-auto-pay',
  templateUrl: 'billpay-modify-auto-pay.html',
})
export class BillpayModifyAutoPayPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillpayModifyAutoPayPage');
  }

  reviewPayment() {
    this.navCtrl.push(BillpayReviewPaymentPage);
  }
}
