import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { SessionManager } from "../../../pages/core/session-manager";
import { Utility } from "../../../pages/core/utility";

@IonicPage()
@Component({
  selector: 'page-account-to-transfer-to',
  templateUrl: 'account-to-transfer-to.html',
})
export class AccountToTransferToPage {

  private toAccounts: any;
  private externalToAccounts = [];
  private pageTitle: string;
  private numLast4: string;
  private transferType: string;

  constructor(private session: SessionManager, private viewCntrl: ViewController,
    private util: Utility, private navParams: NavParams) {
    this.pageTitle = this.navParams.get('pageTitle');
    this.transferType = this.navParams.get('pageFrom');
    this.validToAccounts();
    if (this.navParams.get('numLast4')) {
      this.numLast4 = this.navParams.get('numLast4');
    }
  }

  closeModal() {
    this.viewCntrl.dismiss();
  }

  getSelectedAccount(account) {
    this.viewCntrl.dismiss(account);
    console.log("Account-->" + account);
  }

  validToAccounts() {
    // Transfer To Accounts
    if (this.transferType == 'transfer' || this.transferType == 'deposit') {
      //Checking && Saving Accounts
      if (this.session.accountsList.checkSaveAccounts != undefined && this.session.accountsList.checkSaveAccounts != null)
        this.toAccounts = this.session.accountsList.checkSaveAccounts;

      //Exteranl Accounts
      if (this.transferType == 'transfer' && this.session.accountsList.externalAccounts != undefined && this.session.accountsList.externalAccounts != null) {
        this.externalToAccounts = this.session.accountsList.externalAccounts.filter(external => {
          return (external.ableToTransferExtTo)
        });
      }
    }
    //Payment To Accounts
    else if (this.transferType == 'payment') {
      //Credit Cards
      if (this.session.accountsList.creditCardAccounts != undefined && this.session.accountsList.creditCardAccounts != null) {
        let creditCardAccounts = this.session.accountsList.creditCardAccounts.filter(card => {
          return (card.ableToCashAdvance == true)
        });
        this.toAccounts = creditCardAccounts;
      }
      //Loan Accounts
      if (this.session.accountsList.loanAccounts != undefined && this.session.accountsList.loanAccounts != null) {
        let loanAccounts = this.session.accountsList.loanAccounts.filter(loan => {
          return (loan.availableCredit != null && !loan.deferred)
        });
        this.toAccounts = this.toAccounts.concat(loanAccounts);
      }

      //Mortagae Accounts
      if (this.session.accountsList.mortgageAccounts != undefined && this.session.accountsList.mortgageAccounts != null) {
        let mortgageAccounts = this.session.accountsList.mortgageAccounts.filter(mortgage => {
          return (!mortgage.delinquent)
        });
        this.toAccounts = this.toAccounts.concat(mortgageAccounts);
      }
    }
  }

}
