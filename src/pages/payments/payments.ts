import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Tabs } from 'ionic-angular';
import { MakeapaymentPage } from '../../pages/makeapayment/makeapayment';
import { ScheduledpaymentsPage } from '../../pages/scheduledpayments/scheduledpayments';

@IonicPage()
@Component({
  selector: 'page-payments',
  templateUrl: 'payments.html',
})
export class PaymentsPage {
  @ViewChild("paymentTabs") paymentTabs: Tabs;
  makePaymentRoot = MakeapaymentPage;
  scheduledPaymentRoot = ScheduledpaymentsPage;
  
  constructor(public navCtrl: NavController, public navParams: NavParams){

  }

  ngAfterViewInit() {
    setTimeout(() => {
      console.log("this.paymentTabs");
      this.paymentTabs.select(0);
    }, 100);
  }

  ionViewDidEnter() { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillpayDashboardPage');
  }

}
