import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BillpayPaymentScheduledPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-billpay-payment-scheduled',
  templateUrl: 'billpay-payment-scheduled.html',
})
export class BillpayPaymentScheduledPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillpayPaymentScheduledPage');
  }

  doneScheduled() {
        this.navCtrl.remove(this.navCtrl.last().index - 2, 3);
  }
}
