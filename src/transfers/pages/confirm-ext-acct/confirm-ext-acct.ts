import { Component, ViewChild, } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Utility } from '../../../pages/core/utility';
import { AddExtAcctProvider } from '../../providers/add-ext-acct';
import { SessionManager } from '../../../pages/core/session-manager';
import { ErrorMessages } from '../../../config/global-config';
import { StorageProvider } from '../../../providers/storage/storage';
import { AccountsServiceProvider } from "../../../providers/accounts-service/accounts-service";

@IonicPage()
@Component({
  selector: 'page-confirm-ext-acct',
  templateUrl: 'confirm-ext-acct.html',
})
export class ConfirmExtAcctPage {
  @ViewChild('content') content: Content;
  public data: any;
  public instituteName: string;
  public acctNum: any;
  public acctType: string;
  public nickname: string;
  public routeNumber: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private util: Utility, public addExtAcct: AddExtAcctProvider, private sessionManager: SessionManager, private storageService: StorageProvider, public accountsApi: AccountsServiceProvider) {
    let data = navParams.data.data;
    if (data) {
      this.instituteName = data.institution;
      this.acctNum = data.accountNumber;
      this.acctType = data.accountType;
      this.nickname = data.acctNickname;
      this.routeNumber = data.routnumber;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmExtAcctPage');
  }

  confirm() {
    let type;
    this.acctType == 'CHECKING' ? type = "DDA" : type = "RSV";
    let data = {
      accountNickname: this.nickname,
      accountNumber: this.acctNum,
      accountType: type,
      bankRoutingNumber: this.routeNumber
    }
    this.addExtAcct.externalAcctAdd(data).subscribe(res => {
      console.log(res);
      this.accountsApi.getCombinedAccounts().subscribe(res => {
        this.sessionManager.accountsList = res.accountData;
        this.sessionManager.IRAAccounts = res.iraCertificateData;
      });
      this.navCtrl.popToRoot();
    })

  }

}
