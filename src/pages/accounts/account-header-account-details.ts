import { Component, Input } from '@angular/core';
import { NavController,NavParams } from "ionic-angular";
import { SharedMortgageDataProvider } from "../../providers/shared-mortgage-data/shared-mortgage-data";
import { AccountsServiceProvider } from "../../providers/accounts-service/accounts-service";
import { ManageYourCardsPage } from "../manage-your-cards/manage-your-cards";


@Component({
  selector: 'account-header-account-details',
  templateUrl: 'account-header-account-details.html'
})
export class AccountHeaderAccountDetailsComponent {
  
  @Input() public showAccountDetailsToggle: boolean;

  public headerParams:any;
  public showAccountDetails:boolean = false;
  public loading:boolean = true;
  public rewardBalanceLabel: any;
  public rewardBalance: any;
  public mortgageloading:boolean = true;
  public mortgageDetails:any = {
    escrowAmt: null
  };

  constructor(public navParams: NavParams, public navCtrl: NavController, public mortgageData: SharedMortgageDataProvider, public accountsService: AccountsServiceProvider) {
    this.headerParams = navParams.data;
    this.showAccountDetails = this.showAccountDetailsToggle;

    if (this.headerParams)
    mortgageData.sharedMortgageData$.subscribe(details=>{
      this.mortgageDetails = details;
      this.mortgageloading = false;
    });
    
  }
  ngOnInit(){
    if (this.headerParams.pageType=== "ACCOUNT_PAGE" && this.headerParams.payload.parentAcctType === 'CREDITCARD'){
      let data;
      this.accountsService.getCreditCardRewards(this.headerParams.payload.accountMask).subscribe(reward=>{
        data = reward;
        this.rewardBalance = JSON.parse(data._body).parameter;
        this.rewardBalanceLabel = JSON.parse(data._body).message;
        this.loading = false;
      });
    }
  }
  ngOnChanges(){
    this.showAccountDetails = this.showAccountDetailsToggle;
  }
  manageCard(){
    this.navCtrl.push(ManageYourCardsPage)
  }
}
