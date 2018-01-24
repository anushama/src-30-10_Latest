import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Utility } from '../core/utility';
import { AccountsPage } from '../accounts/accounts';
import { SessionManager } from '../../pages/core/session-manager';
import { ErrorMessages } from '../../config/global-config';
import { StorageProvider } from '../../providers/storage/storage';
import { AccountsServiceProvider } from "../../providers/accounts-service/accounts-service";
// import { MakeADepositPage } from '../make-a-deposit/make-a-deposit';

@IonicPage()
@Component({
  selector: 'page-deposit-made',
  templateUrl: 'deposit-made.html',
})
export class DepositMadePage {

  public pageFrom: string;
  public CommonData: any;
  public pageTitle: string;
  public page: string;
  public successMsg: any;
  public loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private util: Utility, private viewCtrl: ViewController, 
    private sessionManager: SessionManager, private storageService: StorageProvider,
    public accountsApi: AccountsServiceProvider) {
    /*-------------
    !!!PASSDATA FORMAT
    data = {
      accountFrom:,
      accountFromLastFour:,
      accountTo:,
      accountToLastFour:,
      amount:
    }
    {fromPage:'',data:object}
    ---------------*/

    this.pageFrom = navParams.data.fromPage;
    this.CommonData = navParams.data.data;
    if (this.pageFrom == 'TRANSFER') {
      this.pageTitle = 'TRANSFER';
      this.page = 'TransferMoneyPage';
      this.successMsg = 'TRANSFER SUCCESSFUL'
    } else if (this.pageFrom == 'DEPOSIT') {
      this.pageTitle = 'DEPOSIT';
      this.page = 'MakeADepositPage';
      this.successMsg = 'MOBILE DEPOSIT SUCCESSFUL';
    } else if (this.pageFrom == 'PAYMENT') {
      this.pageTitle = 'PAYMENT';
      // this.page = TODO: PUT PAYMENT PAGE;
      this.successMsg = 'PAYMENT SUCCESSFUL';
    }
  }

  ionViewDidLoad() {
    //Resetting properties of sessionManager
    this.sessionManager.scheduledTransfers = null;
  }

  newPage() {
    this.accountsApi.getCombinedAccounts().subscribe(res => {
      this.sessionManager.accountsList = res.accountData;
      this.sessionManager.IRAAccounts = res.iraCertificateData;
      //The below line is added for showing user firstname in loginpage - Start - RM
      this.storageService.writeToStorage("formattedFirstName", res.accountData.firstName);
    }, err => {
      this.util.showAlert(ErrorMessages.SORRY, '', ErrorMessages.ACCOUNT_DATA, ErrorMessages.BUTTON_OK);
    }, () => {
    });
    // this.sessionManager.accountsList = null;
    // this.sessionManager.IRAAccounts = null;
    this.navCtrl.setRoot(this.page, { pageTitle: this.pageTitle + ' MONEY' });
  }

  navBackToAccount() {
    this.navCtrl.setRoot(AccountsPage, {refreshData:true})
      // .then(() => {
      //   //first we find the index of the current view controller:
      //   let index = this.viewCtrl.index;
      //   //then we remove it from the navigation stack
      //   for (let i = index; i > 0; i--) {
      //     this.navCtrl.remove(i);
      //   }
      // });
  }

}
