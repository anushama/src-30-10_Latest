import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@IonicPage()
@Component({
  selector: 'page-transfer-money',
  templateUrl: 'transfer-money.html',
})
export class TransferMoneyPage {
  @ViewChild("transferTabs") transferTabs: Tabs;

  private pageTitle: string;
  public chatParams: any;
  public headerTitle: string;
  public methodTitle: string;
  public scheduledTitle: string;
  public pageFrom:string;
  public transferData:any;
  public transferFromAcct:boolean = false;

  makeTransfer = 'MakeTransferPage';
  scheduledTransfers = 'ScheduledTransfersPage';

  constructor(public navCtrl: NavController, public navParams: NavParams, private screen: ScreenOrientation) { //private datePicker: DatePicker,
    this.pageTitle = this.navParams.get('pageTitle');
    this.transferData = this.navParams.get('payload');
    this.transferFromAcct = this.navParams.get('transferFromAcct');

    console.log('tabToSelect', this.pageTitle);
    if (this.pageTitle == 'TRANSFER MONEY' || this.pageTitle == 'SCHEDULED TRANSFERS') {
      this.headerTitle = 'TRANSFER MONEY';
      this.methodTitle = 'MAKE TRANSFER';
      this.scheduledTitle = 'SCHEDULED TRANSFERS';
      this.pageFrom = 'TRANSFER';
    } else if (this.pageTitle == 'MAKE PAYMENT') {
      this.headerTitle = 'PAYMENTS';
      this.methodTitle = this.pageTitle;
      this.scheduledTitle = 'SCHEDULED PAYMENTS';
      this.pageFrom = 'PAYMENT';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransferMoneyPage');
    // Highlight the tab
    setTimeout(() =>
    {(this.pageTitle == 'TRANSFER MONEY' || this.pageTitle == 'MAKE PAYMENT') ? this.transferTabs.select(0) : this.transferTabs.select(1);}, 0);
  }

}
