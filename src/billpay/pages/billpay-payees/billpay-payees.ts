import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams,LoadingController,ModalController, Platform } from 'ionic-angular';
import { BillpayProvider } from '../../providers/billpay/billpay';
import { StorageProvider } from "../../../providers/storage/storage";
import { BillpaySortFiltersPage } from '../../pages/billpay-sort-filters/billpay-sort-filters';
import { PayeeDetailsPage } from '../../pages/payee-details/payee-details'
import { AddPayeePage } from '../../pages/add-payee/add-payee';
import { Transaction } from '../../../model/billpaydashboard';
/**
 * Generated class for the BillpayPayeesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-billpay-payees',
  templateUrl: 'billpay-payees.html'
})
export class BillpayPayeesPage {
  public memberNumber: any;
  public payeesResponse: any;
  public payeesSortedResponse: any;
  public shouldAnimate: boolean = true;
  public truncateValue:any;
  private loading: any;
  public payeeIds: any;
  
  public order :any;
  public ascending = true;
  public allUnPaidTransactions = new Map<string, Transaction>();
  constructor(public navCtrl: NavController, public navParams: NavParams,private loadingCtrl: LoadingController,
    public billPayProvider: BillpayProvider, private storageService: StorageProvider,public app: App, 
    public platform: Platform,public modalCtrl: ModalController) {

    this.storageService.readFromStorage('fisUserId').then((data) => {
        if (data != null) {
          this.memberNumber = data;
          this.getPayeesInfo(this.memberNumber);
        }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillpayPayeesPage');
  }
  compare(a, b) {
    const nextCycleDateA = a.nextCycleDate;
    const nextCycleDateB = b.nextCycleDate;
    let comparison = 0;

    if (nextCycleDateB > nextCycleDateA) {
      comparison = 1;
    } else if (nextCycleDateB < nextCycleDateA) {
      comparison = -1;
    }
    return comparison;
  }


  getPayeesInfo(memberNumber) {
    console.log(memberNumber);
    let payeesUIResponse : Transaction[] = [];

     return this.billPayProvider.getPayeesInfo(memberNumber, this.allUnPaidTransactions).then((data) =>{
       console.log("BillPayee Ts");
       console.log(data);
       this.payeesSortedResponse = data.sort(this.compare);
       this.payeesResponse = this.payeesSortedResponse;

     }).catch(error => {
      console.log(error);
    });
  }
  openSortOptions() {
   // this.app.getRootNav().push(BillpaySortFiltersPage, {viewOptions: 'eBills'});

    let profileModal = this.modalCtrl.create(BillpaySortFiltersPage, {viewOptions: 'eBills',order:this.order,ascending:this.ascending});
    profileModal.onDidDismiss(data => {
      if (data != undefined && data != null) {
        console.log(data);
        this.order = data;
        if(this.order == "payeeNameAsc"){
          this.order = "payeeName";
          this.ascending = true;
        }else if(this.order == "payeeNameDesc"){
          this.order = "payeeName";
          this.ascending = false;
        }else{
          this.order = data
          this.ascending = false;
        }
      } else {
        return false;
      }
    });
    profileModal.present();
  }
  

  removeItem(item) {
    for (let i = 0; i < this.payeesResponse.length; i++) {
      if (this.payeesResponse[i] == item) {
        this.payeesResponse.splice(i, 1);
      }
    }
  }

  showPayeeDetails(payeeDetailsInfo){
    //this.app.getRootNav().push(PayeeDetailsPage);
    this.app.getRootNav().push(PayeeDetailsPage, {
      payeeDetails: payeeDetailsInfo
    });
  }
  addPayee(){
    this.app.getRootNav().push(AddPayeePage);
  }

}
