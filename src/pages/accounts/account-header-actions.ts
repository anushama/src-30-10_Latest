import { Component } from '@angular/core';
import { NavParams, NavController } from "ionic-angular";
// import { PaymentsPage } from "../payments/payments";
import { ActivateCardPage } from "../activate-card/activate-card";
import { MakeADepositPage } from '../make-a-deposit/make-a-deposit';
// import { MakeTransferPage } from '../../transfers/pages/make-transfer/make-transfer';

@Component({
  selector: "account-header-actions",
  templateUrl: "account-header-actions.html"
})
export class AccountHeaderActionsComponent {
  public actionsParams: any;
  constructor(private navParams: NavParams, private navCtrl: NavController) {
    this.actionsParams = this.navParams.data;
  }
  goToPayments() {
    console.log(this.actionsParams.payload);

    this.navCtrl.push('TransferMoneyPage',
      {
        payload: this.actionsParams.payload,
        pageTitle: "MAKE PAYMENT",
        transferFromAcct:true
      });
  }
  gotToActivateCard() {
    this.navCtrl.push(ActivateCardPage,
      {
        payload: this.actionsParams.payload
      });
  }
  goToDeposits() {
    this.navCtrl.push(MakeADepositPage, {
      fromAccount: true,
      payload: this.actionsParams.payload
    });
  }
  goToTransfers() {
    this.navCtrl.push("TransferMoneyPage", {
      pageTitle: "TRANSFER MONEY",
    });
  }
}
