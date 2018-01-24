import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AccountsServiceProvider } from '../../providers/accounts-service/accounts-service';
import { SessionManager } from '../core/session-manager';
import { AccountsPage } from '../accounts/accounts';
import { Utility } from '../core/utility';
import { ErrorMessages } from "../../config/global-config";
import { SettingsPage } from '../settings/settings';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-account-showhide',
  templateUrl: 'account-showhide.html'
})
export class AccountShowhidePage {

  public loading: any;
  public accountsList: any;
  public iraAccountsList: any = {
    'iraAccounts': [],
    'certificateAccounts': []
  };

  public showIRAAccount: boolean = false;
  public showCertificate: boolean = false;
  public IRACertificateText: string = "";
  public checkSaveAccountsToggleStatus: any = [];
  public loanAccountsToggleStatus: any = [];
  public mortgageAccountsToggleStatus: any = [];
  public creditCardAccountsToggleStatus: any = [];
  public externalAccountsToggleStatus: any = [];
  public IRAAccountsToggleStatus: any;
  public certificateAccountsToggleStatus: any;
  public initToggleStatus: any = [];
  public initIRAToggleStatus: any;
  public initCertificateAccountsToggleStatus: any;
  private refreshData: boolean = false;
  public incomingPage:any = null;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private httpProvider: AccountsServiceProvider, private viewCtrl: ViewController,
    private sessionManager: SessionManager,private util: Utility,private storageService: StorageProvider) {
      // incomingPage
      this.incomingPage = this.navParams.data.incomingPage !== undefined ? this.navParams.data.incomingPage: null;
  }

  ionViewDidLoad() {
    this.getAccountsdata();
    this.getIRAAccountsData();
  }

  ionViewDidEnter() {

  }

  //getting accounts data
  getAccountsdata() {
    //let sessionManager = SessionManager.singletonInstance();
    this.accountsList = this.sessionManager.accountsList;
    this.getToggleStatus(this.accountsList.checkSaveAccounts, this.checkSaveAccountsToggleStatus);
    this.getToggleStatus(this.accountsList.creditCardAccounts, this.creditCardAccountsToggleStatus);
    this.getToggleStatus(this.accountsList.loanAccounts, this.loanAccountsToggleStatus);
    this.getToggleStatus(this.accountsList.mortgageAccounts, this.mortgageAccountsToggleStatus);
    this.getToggleStatus(this.accountsList.externalAccounts, this.externalAccountsToggleStatus);
    //IRA
    this.IRAAccountsToggleStatus = this.accountsList.showIRA;
    this.certificateAccountsToggleStatus = this.accountsList.showMoneyMarket;
    this.initIRAToggleStatus = this.IRAAccountsToggleStatus;
    this.initCertificateAccountsToggleStatus = this.certificateAccountsToggleStatus;

    console.log("List start");

    console.log(this.accountsList);
    console.log("List end");
  }

  //getting IRA accounts data
  getIRAAccountsData(): void {
    //let sessionManager = SessionManager.singletonInstance();
    if (this.sessionManager.IRAAccounts != null) {
      this.iraAccountsList = this.sessionManager.IRAAccounts;
    }

    if (this.iraAccountsList.iraAccounts != null && this.iraAccountsList.iraAccounts.length > 0) {
      this.showIRAAccount = true;
      this.IRACertificateText = "IRA";
    }

  }

  //SaveSettings button
  //Update account show-hide values
  updateShowHideAccounts() {
    let arrAccountTotal = [];
    let arrCheckSaveAccountsToggle = [];
    let arrCreditCardAccountsToggle = [];
    let arrLoanAccountsToggle = [];
    let arrMortgageAccountsToggle = [];
    let arrExternalAccountsToggle = [];

    let arrAfterToggle = this.checkSaveAccountsToggleStatus.concat(this.creditCardAccountsToggleStatus, this.loanAccountsToggleStatus, this.mortgageAccountsToggleStatus, this.externalAccountsToggleStatus);

    //getting modified accounts info
    if (this.arraysEqual(this.initToggleStatus, arrAfterToggle) == true && this.getIRAToggleStatus(this.initIRAToggleStatus, this.IRAAccountsToggleStatus) == true && this.getIRAToggleStatus(this.initCertificateAccountsToggleStatus, this.certificateAccountsToggleStatus) == true) {
      this.util.showAlert(ErrorMessages.ALERT, "", ErrorMessages.ACCOUNT_NICKNAME_NO_CHANGE, ErrorMessages.BUTTON_OK);
    } else {
      this.getaccountMask(this.checkSaveAccountsToggleStatus, arrCheckSaveAccountsToggle, this.accountsList.checkSaveAccounts);
      this.getaccountMask(this.creditCardAccountsToggleStatus, arrCreditCardAccountsToggle, this.accountsList.creditCardAccounts);
      this.getaccountMask(this.loanAccountsToggleStatus, arrLoanAccountsToggle, this.accountsList.loanAccounts);
      this.getaccountMask(this.mortgageAccountsToggleStatus, arrMortgageAccountsToggle, this.accountsList.mortgageAccounts);
      this.getaccountMask(this.externalAccountsToggleStatus, arrExternalAccountsToggle, this.accountsList.externalAccounts);
      arrAccountTotal = arrCheckSaveAccountsToggle.concat(arrCreditCardAccountsToggle, arrLoanAccountsToggle, arrMortgageAccountsToggle, arrExternalAccountsToggle);

      this.showIRAAccount = this.IRAAccountsToggleStatus;
      this.showCertificate = this.certificateAccountsToggleStatus;
      this.httpProvider.updateHideAccounts(arrAccountTotal, this.showIRAAccount, this.showCertificate);
      this.refreshData = true;
    }
  }

  // {"accountMasksToHide":["fe1144ea-d159-4067-99e8-9d6b0b77673a","9c9f6618-99f2-43a0-b86c-995596fc0870"],"showMoneyMarket":true,"showIRA":true}

  // {"accountMasksToHide":["96ee3694-ff72-480c-88a6-2a6201349753","fe1144ea-d159-4067-99e8-9d6b0b77673a","9c9f6618-99f2-43a0-b86c-995596fc0870"],"showMoneyMarket":true,"showIRA":true}

  //Compare whether user change the toggle button
  arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i in arr1) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

  //get account toggle status which is boolean;
  getToggleStatus(arr, toggleStatus) {
    if (arr != null && arr.length > 0) {
      for (let i of arr) {
        toggleStatus.push(i.showAccount);
        this.initToggleStatus.push(i.showAccount);
      }
    }
  }
  //check whether IRA show/account toggleStatus have changed
  getIRAToggleStatus(initToggle, currentToggleStatus) {
    return (initToggle == currentToggleStatus) ? true : false;
  }

  getaccountMask(arr, arrMask, obj) {
    for (let i in arr) {
      if (arr[i] == false) {
        arrMask.push(obj[i].accountMask)
      }
    }
  }

  //SaveSettings button
  updateShowHideStaus() {
    this.updateShowHideAccounts();
    // setTimeout(() => {
      if (this.incomingPage && this.incomingPage === 'AccountsPage'){
        this.navCtrl.push(AccountsPage, {refreshData: this.refreshData})
        .then(() => {
          //first we find the index of the current view controller:
          let index = this.viewCtrl.index;
          //then we remove it from the navigation stack
          for(let i=index; i>0; i--){
            this.navCtrl.remove(i);
          }
        });
      } else{
        this.httpProvider.getCombinedAccounts().subscribe(res => {
          this.sessionManager.accountsList = res.accountData;
          this.sessionManager.IRAAccounts = res.iraCertificateData;
          //The below line is added for showing user firstname in loginpage - Start - RM
          this.storageService.writeToStorage("formattedFirstName", res.accountData.firstName);
        // }, err => {
        //   this.util.showAlert(ErrorMessages.SORRY, '', ErrorMessages.ACCOUNT_DATA, ErrorMessages.BUTTON_OK);
        // }, () => {
        });
        this.navCtrl.push(SettingsPage, {refreshData: this.refreshData})
        .then(() => {
          //first we find the index of the current view controller:
          let index = this.viewCtrl.index;
          //then we remove it from the navigation stack
          for(let i=index; i>0; i--){
            this.navCtrl.remove(i);
          }
        });
      }
    // }, 1000);
  }
  //close icon in nav bar
  close() {
    // this.navCtrl.push(SettingsPage);
    this.navCtrl.pop();
  }

}
