import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiService} from '../../providers/api-service';
import { AccountShowhidePage} from '../account-showhide/account-showhide';
import { ResetAccountsDataProvider } from "../../providers/reset-accounts-data/reset-accounts-data";
import { AccountsServiceProvider } from "../../providers/accounts-service/accounts-service";
import { ContactInformationProvider } from '../../providers/contact-information/contact-information';
import { SessionManager } from '../core/session-manager';
import { StorageProvider } from '../../providers/storage/storage';
import { ErrorMessages } from '../../config/global-config';
import { Utility } from "../core/utility";
// import { Utility } from '../core/utility';
/**
 * Generated class for the AccountsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html',
})
export class AccountsPage {

  public resultJson: any;
  public body: any;
  public checkSaveAccounts: any = [];
  public checkSaveAccountsAsOfDate: string;
  public reditCardAccounts: any = [];
  public reditCardAccountsAsOfDate: string;
  public loanAccounts: any = [];
  public loanAccountsAsOfDate: string;
  public mortgageAccounts: any = [];
  public mortgageAccountsAsOfDate: string;
  public iraAccounts: any = [];
  public iraAccountsAsOfDate: string;
  public certificateAccounts: any = [];
  public certificateAccountsAsOfDate: string;
  public hideAccounts: any = {};
  public hideHiddenAccountsMessage: boolean = true;
 

  constructor(public navCtrl: NavController, public api: ApiService, public zone: NgZone,
    public accountsApi: AccountsServiceProvider,
    private sessionManager: SessionManager, private utility: Utility,
    public contactInfo: ContactInformationProvider,
    private navParams: NavParams, public resetAccounts: ResetAccountsDataProvider, private storageService: StorageProvider) { //, private util: Utility,

    this.resetAccounts.getResetEvent().subscribe(res => {
      this.checkSaveAccounts.length = 0;
      this.checkSaveAccountsAsOfDate = null;
      this.loanAccounts.length = 0;
      this.loanAccountsAsOfDate = null;
      this.reditCardAccounts.length = 0;
      this.reditCardAccountsAsOfDate = null;
      this.mortgageAccounts.length = 0;
      this.mortgageAccountsAsOfDate = null;
      this.iraAccounts.length = 0;
      this.iraAccountsAsOfDate = null;
      this.certificateAccounts.length = 0;
      this.certificateAccountsAsOfDate = null;
    });
    this.storageService.readFromStorage('stayLoggedIn');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');
    this.loadAccounts();
  }

  // ionViewWillEnter() {
  //   console.log('ionViewWillEnter AccountsPage');
  //   this.loadAccounts();
  // }

  goToAccountShowhide() {
    this.navCtrl.push(AccountShowhidePage,
    {
      incomingPage:'AccountsPage'
    });
  }

  private loadAccounts() {
    let refreshData = this.navParams.get('refreshData');
    if (refreshData == true) { //refreshData == null (this.sessionManager.accountsList == null && this.sessionManager.IRAAccounts == null) || 
      this.accountsApi.getCombinedAccounts().subscribe(res => {
        this.sessionManager.accountsList = res.accountData;
        this.sessionManager.IRAAccounts = res.iraCertificateData;
        //The below line is added for showing user firstname in loginpage - Start - RM
        this.storageService.writeToStorage("formattedFirstName", res.accountData.firstName);
        //The below line is added for showing user firstname in loginpage - End - RM
        this.updateLocalObjects();
      }, err => {
        console.log("Error-->"+err);
      });
    } else {
      this.updateLocalObjects();
    }
  }

  private updateLocalObjects() {
    this.checkSaveAccounts = this.sessionManager.accountsList.checkSaveAccounts || [];
    this.checkSaveAccountsAsOfDate = this.checkSaveAccounts.length ? this.checkSaveAccounts[0].asOfDate : null;
    this.hideAccounts.checkSaveAccounts = this.checkSaveAccounts.length ? this.checkSaveAccounts.every(this.hideGroup) : true;

    this.loanAccounts = this.sessionManager.accountsList.loanAccounts || [];
    this.loanAccountsAsOfDate = this.loanAccounts.length ? this.loanAccounts[0].asOfDate : null;
    this.hideAccounts.loanAccounts = this.loanAccounts.length ? this.loanAccounts.every(this.hideGroup) : true;

    this.reditCardAccounts = this.sessionManager.accountsList.creditCardAccounts || [];
    this.reditCardAccountsAsOfDate = this.reditCardAccounts.length ? this.reditCardAccounts[0].asOfDate : null;
    this.hideAccounts.reditCardAccounts = this.reditCardAccounts.length ? this.reditCardAccounts.every(this.hideGroup) : true;

    this.mortgageAccounts = this.sessionManager.accountsList.mortgageAccounts || [];
    this.mortgageAccountsAsOfDate = this.mortgageAccounts.length ? this.mortgageAccounts[0].asOfDate : null;
    this.hideAccounts.mortgageAccounts = this.mortgageAccounts.length ? this.mortgageAccounts.every(this.hideGroup) : true;

    this.iraAccounts = this.sessionManager.IRAAccounts.iraAccounts || [];
    this.iraAccountsAsOfDate = this.iraAccounts.length ? this.iraAccounts[0].asOfDate : null;
    this.hideAccounts.iraAccounts = this.sessionManager.accountsList.showIRA ? false : true;

    this.certificateAccounts = this.sessionManager.IRAAccounts.certificateAccounts || [];
    this.certificateAccountsAsOfDate = this.certificateAccounts.length ? this.certificateAccounts[0].asOfDate : null;
    this.hideAccounts.certificateAccounts = this.sessionManager.accountsList.showMoneyMarket ? false : true;

    this.hideHiddenAccountsMessage = this.showAllAccountsFunc(this.hideAccounts);
  }
  hideGroup(element) {
    return element.showAccount === false;
  }

  showAllAccountsFunc(accountGroup) {
    let resp: any[] = [];
    for (var key in accountGroup) {
      if (accountGroup.hasOwnProperty(key)) {
        var element = accountGroup[key];
        console.log(element);
        resp.push(element)
      }
    }
    let hideAll = resp.every(indx => indx === true)
    return !hideAll;
  }

}
