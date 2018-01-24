import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { BillpayPaymentsPage } from '../../pages/billpay-payments/billpay-payments';
import { BillpayPayeesPage } from '../../pages/billpay-payees/billpay-payees';
import { BillpayHistoryPage } from '../../pages/billpay-history/billpay-history';
import { StorageProvider } from "../../../providers/storage/storage";
import { BillpayProvider } from '../../providers/billpay/billpay';
import { Utility } from '../../../pages/core/utility';
import { ErrorMessages } from "../../../config/global-config";
import { AccountsPage } from '../../../pages/accounts/accounts';
/**
 * Generated class for the BillpayDashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-billpay-dashboard',
  templateUrl: 'billpay-dashboard.html'
})
export class BillpayDashboardPage {
  public billPayEnabledCode: any;
  public billPayResponseCode: any;
  public fisUserId: any;
  public memberNumber: any;
  public ServRespCode: any;
  public disableBillPayUser: boolean = false;
  paymentsRoot = BillpayPaymentsPage;
  payeesRoot = BillpayPayeesPage;
  historyRoot = BillpayHistoryPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private storageService: StorageProvider, public billPayProvider:BillpayProvider, private util: Utility,
  public events: Events){

      this.storageService.readFromStorage('userNameForPWD').then((data) => {
      if (data != null) {
        console.log("Inside localstorage get:::" + data);
        this.isBillPayEnabled(data);
      }
    });
    this.storageService.readFromStorage('alertSuccess').then((data) => {
      this.disableBillPayUser = data
    });
  }

  ionViewDidEnter() { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillpayDashboardPage');
  }
  isBillPayEnabled(member){
    console.log("....."+member);
    this.ServRespCode = this.billPayProvider.getBillPayEnableOption(member);
    this.ServRespCode.then((codeResp) =>{
      console.log(codeResp.bankRelationshipList.bankRelation[0].code);
      this.billPayEnabledCode = codeResp.bankRelationshipList.bankRelation[0].code;
      this.billPayResponseCode = codeResp.responseCode;
      this.fisUserId = codeResp.fisUserId;
      this.memberNumber = codeResp.memberNumber;
      if(this.billPayResponseCode == '001'){
        if(this.billPayEnabledCode == 'WBP' || this.billPayEnabledCode == 'JBP'){
          this.storageService.writeToStorage("memberNumber", this.memberNumber); //174158
          this.storageService.writeToStorage("fisUserId", this.fisUserId); //174158
          this.storageService.writeToStorage("billPayResponseCode", this.billPayResponseCode); //001
          this.storageService.writeToStorage("billpaycode", this.billPayEnabledCode); //JBP || WBP
          this.disableBillPayUser = false;
          this.events.publish('fisuser:created',this.fisUserId);
        }
      } else if(this.billPayResponseCode == '002'){
        this.disableBillPayUser = true;
        this.util.showAlert("", "", ErrorMessages.BILLPAY_UNENROLLED_ERROR_MSG,ErrorMessages.BUTTON_VIEWACCOUNTS, this.showAccountsDashBoard,this.navCtrl);
      }else{
        this.disableBillPayUser = true;
        this.util.showAlert("", "", ErrorMessages.BILLPAY_DISABLE_ERROR_MSG,ErrorMessages.BUTTON_OK, this.showAccountsDashBoard,this.navCtrl);
      }

    }).catch(error => {
      this.disableBillPayUser = true;
      this.util.showAlert("", "", ErrorMessages.BILLPAY_SERVICE_FAILED_ERROR_MSG,ErrorMessages.BUTTON_VIEWACCOUNTS, this.showAccountsDashBoard,this.navCtrl);
    });;
  }

  showAccountsDashBoard(navctrl) {
    console.log("Inside showAccountsDashBoard")
    navctrl.push(AccountsPage);
  }
}
