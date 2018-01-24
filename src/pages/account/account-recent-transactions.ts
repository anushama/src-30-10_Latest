import { Component } from '@angular/core';
import { NavParams, NavController, ModalController } from "ionic-angular";
import { SharedMortgageDataProvider } from "../../providers/shared-mortgage-data/shared-mortgage-data";
import { AccountsServiceProvider } from "../../providers/accounts-service/accounts-service";
import { AccountCheckDisplayPage } from "../account-check-display/account-check-display";
import { AccountCreditCardSortPage } from '../account-credit-card-sort/account-credit-card-sort';

@Component({
  selector:"account-recent-transactions",
  templateUrl:"account-recent-transactions.html"
})

export class AccountRecentTransactionsComponent{
  public accountDetails:any;
  public transactionsResponse:any;
  public recentTransactions:any[] = [];
  public loanTransactions:any;
  public mortgageDetails:any;
  public loading:boolean = true;
  public filterSort:any={sort:'dateNewFirst',filter:'Recent'};
  constructor(public navParams: NavParams, public navCtrl: NavController, private api:AccountsServiceProvider, private sharedMortgageData: SharedMortgageDataProvider, public modalCtrl: ModalController){
    this.accountDetails = this.navParams.data.payload; 
  }
  ngOnInit(){
    if (this.accountDetails.parentAcctType === 'CREDITCARD'){
      this.getCreditCardData(this.accountDetails.accountMask, this.filterSort.filter);
    } else {
      this.api.getRecentTransactions(this.accountDetails.accountMask).subscribe(res=>{
        let resultJson:any = res;
        if (this.navParams.data.payload.parentAcctType === 'MORTGAGE'){
          this.sharedMortgageData.shareMortgageData(resultJson);
          // Remember to null check, as some responses are not clean or empty objects or arrays
          this.transactionsResponse = resultJson || {};
          this.recentTransactions = this.transactionsResponse.transactions || [];
        } else {
          this.recentTransactions = resultJson.transactions || [];
        }
        this.loading = false;
      })
    }
  }

  displayCheck(checkDetails) {
    this.navCtrl.push(AccountCheckDisplayPage,{
      pageType:'CHECK_DISPLAY_PAGE',
      accountMask:this.navParams.data.payload.accountMask,
      payload: checkDetails,
      numLast4:this.navParams.data.payload.numLast4 || null
    })
  }
  ccSort(){
    let modal = this.modalCtrl.create(AccountCreditCardSortPage, this.filterSort);
    modal.present({animate: true, direction: 'up'});

    modal.onDidDismiss(filterData=>{
      console.log('this.filterSort', this.filterSort, 'filterData', filterData);
      if (this.filterSort.sort !== filterData.sort){
        this.filterSort = filterData;
      }
      if (this.filterSort.filter !== filterData.filter) {
        this.filterSort = filterData;
        this.getCreditCardData(this.accountDetails.accountMask, this.filterSort.filter);
      }
    });
  }
  getCreditCardData(accountMaskData, filterData){
    if (!this.loading) this.loading = true;
    this.api.getCreditCardTransactions(accountMaskData, filterData ).subscribe(res=>{
      let resultJson:any = res;
      console.log(resultJson)
      this.recentTransactions = resultJson.transactions || [];
      this.loading = false;
    })
  }
}