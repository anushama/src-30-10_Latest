import { Component } from '@angular/core';
import { App, Platform, IonicPage, NavController, NavParams, AlertController, LoadingController,Events } from 'ionic-angular';
import { BillpayProvider } from '../../providers/billpay/billpay';
import { StorageProvider } from '../../../providers/storage/storage';
import { BillpayScheduledPaymentDetailsPage } from '../../pages/billpay-scheduled-payment-details/billpay-scheduled-payment-details';
import { BillpayPayBillPage } from '../../pages/billpay-pay-bill/billpay-pay-bill';
import { ShowAllEbillsPage } from '../../pages/show-all-ebills/show-all-ebills';
import { Transaction } from '../../../model/billpaydashboard';
import { Observable} from 'rxjs/Observable';
import { Utility } from '../../../pages/core/utility';
import { ErrorMessages } from "../../../config/global-config";
import { AccountsPage } from '../../../pages/accounts/accounts';
import { BillpayDevUiIndexPage } from '../../pages/billpay-dev-ui-index/billpay-dev-ui-index';

/**
 * Generated class for the BillpayPaymentsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-billpay-payments',
  templateUrl: 'billpay-payments.html',
})
export class BillpayPaymentsPage {
  public memberNumber: any;
  public dueDate: any;

  public allEbills: Transaction[] = [];
  public unPaidTransactions: Transaction[] = [];
  public scheduledTransactions: Transaction[] = [];
  public scheduledSortedTransactions: Transaction[] = [];
  public allTransactionsMap = new Map<string, Transaction>();
  public limit: number = 3;
  public scheduled: any;
  private loading: any;
  public payeeIds: any;
  public allUnPaidTransactions = new Map<string, Transaction>();
  public activePayeeMap = new Map<string, string[]>();
  public NO_DATA_FOUND: any;
  public alertSuccess: boolean = false;
  public noUnpaidDataFlag: boolean = false;
  public noScheduledDataFlag: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App,
    public billPayProvider: BillpayProvider, private storageService: StorageProvider,
    private alertCtrl: AlertController,private util: Utility,
    private loadingCtrl: LoadingController, private platform: Platform, public events: Events) {

  }

  ionViewDidLoad() {
    this.events.subscribe('fisuser:created', (fisUserId) => {
      console.log("fisUserId--->>"+fisUserId)
      this.memberNumber = fisUserId;
      this.getBillPayDashBoard(fisUserId);
      // this.storageService.readFromStorage('fisUserId').then((data) => {
      //   if (data != null) {
      //     console.log("Inside localstorage get:::" + data);
      //     this.memberNumber = data;
      //     this.getBillPayDashBoard(data);
      //   }
      // });
    });

  }
  ionViewDidEnter() { }

  getBillPayDashBoard(memberInfo) {


    this.payeeIds = this.billPayProvider.getActivePayeesInfo(memberInfo, this.allUnPaidTransactions);
    this.payeeIds.then(payeeIdList => {

      let unpaidBills = this.billPayProvider.getUnPaidBillsInfo(memberInfo, ["UNPAID"], this.allUnPaidTransactions);
      let scheduledBills = this.billPayProvider.getScheduledBills(memberInfo, payeeIdList, "[\"SCHEDULED\", \"PENDING\", \"IN_PROCESS\", \"SENT\"]", this.allUnPaidTransactions);
      Promise.all([unpaidBills, scheduledBills]).then(values => {
        this.unPaidTransactions = values[0];
        if(this.unPaidTransactions.length == 0){
          this.noUnpaidDataFlag = true;
         } else {
          this.noUnpaidDataFlag = false;
          this.unPaidTransactions = this.unPaidTransactions;
        }
        this.scheduledSortedTransactions = values[1];
        if(this.scheduledSortedTransactions.length == 0){
          this.noScheduledDataFlag = true;
         } else {
          this.noScheduledDataFlag = false;
          this.scheduledTransactions = this.scheduledSortedTransactions.sort(this.compareDatesForScheduled);;
        }
        //this.scheduledTransactions = this.scheduledSortedTransactions.sort(this.compareDatesForScheduled);
      });

    }).catch(error => {
      console.log(error);
      //this.alertSuccess = true;
      //this.storageService.writeToStorage("alertSuccess", true);
      //this.util.showAlert("", "", ErrorMessages.BILLPAY_SERVICE_FAILED_ERROR_MSG,ErrorMessages.BUTTON_VIEWACCOUNTS, this.showAccountsDashBoard,this.navCtrl);

    });
  }

  showAccountsDashBoard(navctrl) {
    console.log("Inside showAccountsDashBoard")
    navctrl.push(AccountsPage);
  }

  compareDatesForScheduled(a, b) {
    const dueDateForScheduledA = a.dueDateForScheduled;
    const dueDateForScheduledB = b.dueDateForScheduled;
    let comparison = 0;
    if (dueDateForScheduledB > dueDateForScheduledA) {
      comparison = 1;
    } else if (dueDateForScheduledB < dueDateForScheduledA) {
      comparison = -1;
    }
    return comparison;
  }

  compare(a, b) {
    const dueDateTimeA = a.dueDateTime;
    const dueDateTimeB = b.dueDateTime;
    let comparison = 0;

    if (dueDateTimeB > dueDateTimeA) {
      comparison = 1;
    } else if (dueDateTimeB < dueDateTimeA) {
      comparison = -1;
    }
    return comparison;
  }


  showAllEBills() {

    let eBillsTransactions = this.billPayProvider.getAllEBills(this.memberNumber, this.allUnPaidTransactions);
    let data: Transaction[] = [];
    let allSortedEbillsTransactions: Transaction[] = [];
    eBillsTransactions.then(values => {
      data = values;
      allSortedEbillsTransactions = data.sort(this.compare);
      this.app.getRootNav().push(ShowAllEbillsPage, {
        totalEBillsResponse: allSortedEbillsTransactions
      });
    });
  }

  makePayment() {
    this.app.getRootNav().push(BillpayPayBillPage);
  }

  loadSchedulePayments(scheduledPaymentsData) {
    this.app.getRootNav().push(BillpayScheduledPaymentDetailsPage, {
      scheduledPaymentsDetails: scheduledPaymentsData
    });
  }



  devUIviews() {
    this.app.getRootNav().push(BillpayDevUiIndexPage);
  }

}
