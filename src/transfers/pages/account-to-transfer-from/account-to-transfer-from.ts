import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams, NavController } from 'ionic-angular';
import { SessionManager } from "../../../pages/core/session-manager";
import { Utility } from "../../../pages/core/utility";
// import { AddExternalAcctPage } from '../add-external-acct/add-external-acct'


@IonicPage()
@Component({
  selector: 'page-account-to-transfer-from',
  templateUrl: 'account-to-transfer-from.html',
})
export class AccountToTransferFromPage {

  private fromAccounts: any;
  private externalFromAccounts: any;
  private numLast4: string;
  public pageTitle: string;
  public transferType:string;
  // public pushPage:string;

  constructor(private viewCntrl: ViewController, private session: SessionManager,
    private util: Utility, private navParams: NavParams, public navCtrl: NavController) {
    // this.pushPage = AddExternalAcctPage;
    this.pageTitle = this.navParams.get('pageTitle');
    this.transferType = this.navParams.get('pageFrom');
    if (this.navParams.get('numLast4')) {
      this.numLast4 = this.navParams.get('numLast4');
    }

    this.validFromAccounts();
  }

  closeModal() {
    this.viewCntrl.dismiss();
  }

  getSelectedAccount(account) {
    this.viewCntrl.dismiss(account);
    console.log("Account-->" + account);
  }

  confirm() {
    this.navCtrl.push('AddExternalAcctPage');
  }

  validFromAccounts() {
    // Checking && Saving Accounts for Transfers and Payments
    if (this.session.accountsList.checkSaveAccounts != undefined && this.session.accountsList.checkSaveAccounts != null)
      this.fromAccounts = this.session.accountsList.checkSaveAccounts;

    if (this.transferType == 'transfer') {
      // Credit Cards
      if (this.session.accountsList.creditCardAccounts != undefined && this.session.accountsList.creditCardAccounts != null) {
        let creditCardAccounts = this.session.accountsList.creditCardAccounts.filter(card => {
          return (card.ableToCashAdvance == true)
        });
        this.fromAccounts = this.fromAccounts.concat(creditCardAccounts);
      }
      // Loan Accounts
      if (this.session.accountsList.loanAccounts != undefined && this.session.accountsList.loanAccounts != null) {
        let loanAccounts = this.session.accountsList.loanAccounts.filter(loan => {
          return (loan.availableCredit != null && !loan.deferred)
        });
        this.fromAccounts = this.fromAccounts.concat(loanAccounts);
      }
    }
    // External Accounts for Transfers and Payments
    if (this.session.accountsList.externalAccounts != undefined && this.session.accountsList.externalAccounts != null) {
      this.externalFromAccounts = this.session.accountsList.externalAccounts.filter(external => {
        return (external.ableToTransferExtFrom)
      });
    }
  }

}
