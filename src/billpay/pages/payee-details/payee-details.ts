import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { StorageProvider } from '../../../providers/storage/storage';
import { BillpayProvider } from '../../providers/billpay/billpay';
import { Transaction } from '../../../model/billpaydashboard';
/**
 * Generated class for the PayeeDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-payee-details',
  templateUrl: 'payee-details.html',
})
export class PayeeDetailsPage {
  public payeeDetails: any;
  public currentDate: any;
  public memberInfo: string;
  private loading:any;
  public payeeDetailsHistoryResponse: Transaction[] = [];
  public noHistoryDataFlag: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storageService: StorageProvider, public loadingCtrl: LoadingController, public billPayProvider: BillpayProvider) {
    this.payeeDetails = this.navParams.get('payeeDetails');
    console.log(this.payeeDetails);
    this.retrieveTodaysDate();
    this.storageService.readFromStorage('fisUserId').then((data) => {
    if (data != null) {
      this.memberInfo = data;
      this.retrievePayeeDetailsConsumerHistory(this.memberInfo,this.payeeDetails);
    }
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayeeDetailsPage');
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

  retrievePayeeDetailsConsumerHistory(memberInfo,payeeDetails){

    let consumerPayeeId = payeeDetails.consumerPayeeId;
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
        this.payeeDetailsHistoryResponse = data;
      }
       //this.payeeDetailsHistoryResponse = data;
       console.log("Payee Details History...!");
       console.log(this.payeeDetailsHistoryResponse);
       this.loading.dismiss();
     }).catch(error => {
      console.log(error);
      this.loading.dismiss();
    });

  }
}
