import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, LoadingController } from 'ionic-angular';
import { BillpayDashboardPage } from '../../pages/billpay-dashboard/billpay-dashboard';
import { Utility } from '../../../pages/core/utility';
import { StorageProvider } from '../../../providers/storage/storage';
import { Transaction } from '../../../model/billpaydashboard';
import { BillpayProvider } from '../../providers/billpay/billpay';
/**
 * Generated class for the BillpayScheduledPaymentDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-billpay-scheduled-payment-details',
    templateUrl: 'billpay-scheduled-payment-details.html'
})

export class BillpayScheduledPaymentDetailsPage {
    public scheduledPaymentsDetails: any;
    public detailsTitle: any;
    public amountDue: any;
    public dueDate: any;
    public schedulePayementDate: any;
    public currentDate: any;
    public showButtons: boolean = false;
    public memberInfo: string;
    private loading:any;
    public noHistoryDataFlag: boolean = false;
    public detailsHistoryResponse: Transaction[] = [];
    constructor(public navCtrl: NavController, public navParams: NavParams,public billPayProvider: BillpayProvider,
        private alertCtrl: AlertController, private platform: Platform, private util:Utility,
        private storageService: StorageProvider,public loadingCtrl: LoadingController) {

        this.retrieveTodaysDate();
        this.scheduledPaymentsDetails = this.navParams.get('scheduledPaymentsDetails');
        this.showButtons = (this.scheduledPaymentsDetails !== undefined);

        this.storageService.readFromStorage('fisUserId').then((data) => {
        if (data != null) {
          this.memberInfo = data;
          this.retrieveConsumerPayeeDetailsHistory(this.memberInfo,this.scheduledPaymentsDetails);
        }
      });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BillpayScheduledPaymentDetailsPage');
    }

    retrieveTodaysDate() {
        this.currentDate = new Date();
        let dd = this.currentDate.getDate();
        let mm = this.currentDate.getMonth() + 1;
        let yyyy = this.currentDate.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        this.currentDate = mm + '/' + dd + '/' + yyyy;
    }
    retrieveConsumerPayeeDetailsHistory(memberInfo,consumerPayeeDetails){

      let consumerPayeeId = consumerPayeeDetails.consumerPayeeId;
      console.log(consumerPayeeDetails);
      this.loading = this.loadingCtrl.create({
        spinner: 'crescent'
      });
      this.loading.present();
      let data = "{\"fisUserId\":\"" + memberInfo + '\", "consumerPayeeIds":[\"' + consumerPayeeId + '\"]}';

       return this.billPayProvider.getHistoryBillsInfo(data).then((data) =>{
         if(data.length == 0){
          this.noHistoryDataFlag = true;
         } else {
          this.noHistoryDataFlag = false;
          this.detailsHistoryResponse = data;
        }
         console.log("Details History...!");
         console.log(this.detailsHistoryResponse);
         this.loading.dismiss();
       }).catch(error => {
        console.log(error);
        this.loading.dismiss();
      });

    }
  }
