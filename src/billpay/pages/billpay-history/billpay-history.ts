import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, AlertController, Platform, LoadingController } from 'ionic-angular';
import { StorageProvider } from "../../../providers/storage/storage";
import { BillpayProvider } from '../../providers/billpay/billpay';
import { BillpaySortFiltersPage } from '../../pages/billpay-sort-filters/billpay-sort-filters';
import { Utility } from '../../../pages/core/utility';
import { Transaction } from '../../../model/billpaydashboard';

/**
 * Generated class for the BillpayHistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-billpay-history',
  templateUrl: 'billpay-history.html',
})
export class BillpayHistoryPage {
  public memberNumber: any;

  public historyBillsResponse: Transaction[] = [];
  public historyInfo: Transaction[] = [];
  private loading:any;
  public noHistoryDataFlag: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public billPayProvider: BillpayProvider, private storageService: StorageProvider, private app: App,
    private platform: Platform, private alertCtrl: AlertController,private util:Utility) {

    this.storageService.readFromStorage('fisUserId').then((data) => {
      if (data != null) {
        this.memberNumber = data;
        this.loadHistoryData(this.memberNumber);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillpayHistoryPage');
  }

  loadHistoryData(memberNumber) {
    this.loading = this.loadingCtrl.create({
      //content: 'Please wait...',
      spinner: 'crescent'
    });
    this.loading.present();
    console.log(memberNumber);
    let data = "{\"fisUserId\":\"" + memberNumber + "\"}";
     return this.billPayProvider.getHistoryBillsInfo(data).then((data) =>{
      if(data.length == 0){
        this.noHistoryDataFlag = true;
       } else {
        this.noHistoryDataFlag = false;
        this.historyBillsResponse = data;
      }
       //this.historyBillsResponse = data;
       this.loading.dismiss();
     }).catch(error => {
      console.log(error);
      this.loading.dismiss();
    });
  }
  openSortOptions() {
    this.app.getRootNav().push(BillpaySortFiltersPage, {viewOptions: 'hiddenPayees, eBills, status'});
  }
}
