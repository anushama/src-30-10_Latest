import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { AccountsServiceProvider } from "../../providers/accounts-service/accounts-service";
import { ApiService} from '../../providers/api-service';
import { ContactInformationProvider } from '../../providers/contact-information/contact-information';
import { SettingsPage } from '../settings/settings';
import { SessionManager } from '../core/session-manager';
import { Utility } from '../core/utility';
import { ErrorMessages } from "../../config/global-config";
@IonicPage()
@Component({
  selector: 'page-account-nickname',
  templateUrl: 'account-nickname.html',
})
export class AccountNicknamePage {
  public checkSaveAccounts: any = [];
  public creditCardAccounts: any = [];
  public loanAccounts: any = [];
  public externalAccounts: any = [];
  public mortgageAccounts: any = [];
  public iraAccounts: any = [];
  public certificateAccounts: any = [];
  public hideAccounts: any = {};
  public hideHiddenAccountsMessage: boolean = true;

  public arrOriginalCheckSaveAccountsNickname: any = [];
  public arrOriginalLoanAccountsNickname: any = [];
  public arrOriginalCreditCardAccountsNickname: any = [];
  public arrOriginalMortgageAccountsNickname: any = [];
  public arrOriginalIraAccountsNickname: any = [];
  public arrOriginalCertificateAccountsNickname: any = [];
  public arrOriginalExternalAccountsNickname: any = [];

  public arrUpdateCheckSaveAccountsNickname: any = [];
  public arrUpdateLoanAccountsNickname: any = [];
  public arrUpdateCreditCardAccountsNickname: any = [];
  public arrUpdateMortgageAccountsNickname: any = [];
  public arrUpdateIraAccountsNickname: any = [];
  public arrUpdateCertificateAccountsNickname: any = [];
  public arrUpdateExternalAccountsNickname: any = [];

  public arrayTotalNicknames: any = [];
  private refreshData: boolean = false;
  constructor(public navCtrl: NavController, public api: ApiService,
    public accountsApi: AccountsServiceProvider, public contactInfo: ContactInformationProvider,
    private viewCtrl: ViewController, private sessionManager: SessionManager,private util: Utility) {
   

    this.accountsApi.getCombinedAccounts().subscribe(res => {
      console.log(res);

      this.checkSaveAccounts = res.accountData.checkSaveAccounts || [];
      //get original checkSaveAccounts nicknames
      this.getOriginalNickNameVal(this.checkSaveAccounts, this.arrOriginalCheckSaveAccountsNickname);
      this.hideAccounts.checkSaveAccounts = this.checkSaveAccounts.length ? this.checkSaveAccounts.every(this.hideGroup) : true;
      //console.log(this.arrOriginalCheckSaveAccountsNickname)

      this.loanAccounts = res.accountData.loanAccounts || [];
      // get original loanAccounts nicknames
      this.getOriginalNickNameVal(this.loanAccounts, this.arrOriginalLoanAccountsNickname);
      this.hideAccounts.loanAccounts = this.loanAccounts.length ? this.loanAccounts.every(this.hideGroup) : true;
      //console.log(this.arrOriginalLoanAccountsNickname)

      this.creditCardAccounts = res.accountData.creditCardAccounts || [];
      //console.log(this.creditCardAccounts);
      // get original creditCardAccounts nicknames
      this.getOriginalNickNameVal(this.creditCardAccounts, this.arrOriginalCreditCardAccountsNickname);
      this.hideAccounts.creditCardAccounts = this.creditCardAccounts.length ? this.creditCardAccounts.every(this.hideGroup) : true;
      //console.log(this.arrOriginalLoanAccountsNickname)

      this.externalAccounts = res.accountData.externalAccounts || [];
      this.getOriginalNickNameVal(this.externalAccounts, this.arrOriginalExternalAccountsNickname);
      this.hideAccounts.externalAccounts = this.externalAccounts.length ? this.externalAccounts.every(this.hideGroup) : true;

      this.mortgageAccounts = res.accountData.mortgageAccounts || [];
      // get original mortgageAccounts nicknames
      this.getOriginalNickNameVal(this.mortgageAccounts, this.arrOriginalMortgageAccountsNickname);
      this.hideAccounts.mortgageAccounts = this.mortgageAccounts.length ? this.mortgageAccounts.every(this.hideGroup) : true;
      //console.log(this.arrOriginalLoanAccountsNickname)

      this.iraAccounts = res.iraCertificateData.iraAccounts || [];
      // get original iraAccounts nicknames
      this.getOriginalNickNameVal(this.iraAccounts, this.arrOriginalIraAccountsNickname);
      this.hideAccounts.iraAccounts = res.accountData.showIRA ? false : true;
      //console.log(this.arrOriginalLoanAccountsNickname)

      this.certificateAccounts = res.iraCertificateData.certificateAccounts || [];
      // get original certificateAccounts nicknames
      this.getOriginalNickNameVal(this.certificateAccounts, this.arrOriginalCertificateAccountsNickname);
      this.hideAccounts.certificateAccounts = res.accountData.showMoneyMarket ? false : true;
      //console.log(this.arrOriginalLoanAccountsNickname)

    }, err => {
        this.util.showAlert(ErrorMessages.POPUP_TTILE, '', ErrorMessages.ACCOUNT_DATA, ErrorMessages.BUTTON_OK);
    })
  }

  hideGroup(element) {
    return element.showAccount === false;
  }

  popView() {
    this.navCtrl.pop();
  }
  onSubmit() {
    let data = this.bundleData();
    console.log(data)
    if (data.length == 0) {
      this.util.showAlert(ErrorMessages.ALERT, "", ErrorMessages.ACCOUNT_NICKNAME_NO_CHANGE, ErrorMessages.BUTTON_OK);
    } else {
      this.refreshData = true;
      this.accountsApi.updateNickName(data).subscribe(res => {
        this.sessionManager.accountsList = null;
        this.sessionManager.IRAAccounts = null;
        this.navCtrl.setRoot(SettingsPage).then(() => {
          //this.navCtrl.push(AccountsPage, { refreshData: this.refreshData }).then(() => {
          //first we find the index of the current view controller:
          let index = this.viewCtrl.index;
          //then we remove it from the navigation stack
          for (let i = index; i > 0; i--) {
            this.navCtrl.remove(i);
          }
        });
      }, error => {
        this.arrayTotalNicknames = [];
        this.arrUpdateExternalAccountsNickname = [];
        this.util.showAlert(ErrorMessages.ERROR, '', ErrorMessages.ACCOUNT_NICKNAME_ERROR, ErrorMessages.BUTTON_OK);        
      })

    }
  }

  //get original nickname values
  getOriginalNickNameVal(account, arr) {
    if (account.length) {
      for (let i in account) {
        arr.push(account[i].nickname);
      }
    }
  }
  //get the accountMask which nickname got changed
  getAccountsMask(account, originalNickame, updateNickname) {
    let obj;
    if (account.length > 0) {
      for (let i in account) {
        //console.log(account[i].nickname);
        account[i].nickname == null ? account[i].nickname = "" : account[i].nickname;
        originalNickame[i] == null ? originalNickame[i] = "" : originalNickame[i];
        if (account[i].nickname.toUpperCase() != originalNickame[i]) {
          obj = { acctMask: account[i].accountMask, nickname: account[i].nickname }
          updateNickname.push(obj);
        }
      }
    }
  }
  //bundle all the update nicknames which need to send to server
  bundleData() {
    this.getAccountsMask(this.checkSaveAccounts, this.arrOriginalCheckSaveAccountsNickname, this.arrUpdateCheckSaveAccountsNickname);
    this.getAccountsMask(this.externalAccounts, this.arrOriginalExternalAccountsNickname, this.arrUpdateExternalAccountsNickname);
    this.getAccountsMask(this.loanAccounts, this.arrOriginalLoanAccountsNickname, this.arrUpdateLoanAccountsNickname);
    this.getAccountsMask(this.creditCardAccounts, this.arrOriginalCreditCardAccountsNickname, this.arrUpdateCreditCardAccountsNickname);
    this.getAccountsMask(this.mortgageAccounts, this.arrOriginalMortgageAccountsNickname, this.arrUpdateMortgageAccountsNickname);
    this.getAccountsMask(this.iraAccounts, this.arrOriginalIraAccountsNickname, this.arrUpdateIraAccountsNickname);
    this.getAccountsMask(this.certificateAccounts, this.arrOriginalCertificateAccountsNickname, this.arrUpdateCertificateAccountsNickname);
    //console.log(this.arrayTotalNicknames);
    return this.arrayTotalNicknames = this.arrUpdateCheckSaveAccountsNickname.concat(this.arrUpdateExternalAccountsNickname, this.arrUpdateLoanAccountsNickname, this.arrUpdateCreditCardAccountsNickname, this.arrUpdateMortgageAccountsNickname, this.arrUpdateIraAccountsNickname, this.arrUpdateCertificateAccountsNickname)
  }
}
