import { Component, Input } from '@angular/core';

import { NavController,NavParams } from "ionic-angular";
import { SharedMortgageDataProvider } from "../../providers/shared-mortgage-data/shared-mortgage-data";
import { AccountsServiceProvider } from "../../providers/accounts-service/accounts-service";
import { InboxPage } from "../inbox/inbox";
/**
 * Generated class for the AccountHeaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */

@Component({
  selector: 'account-header',
  templateUrl: 'account-header.html'
})
export class AccountHeaderComponent {
  public pageName: string;
  public diss: boolean;
  public headerParams:any;
  public mortgageDetails:any = {
    escrowAmt: null
  };
  public rewardBalance:any;
  public rewardBalanceLabel:any;

  @Input() public pageNameParam:string;
  public loading:boolean = true;
  public mortgageloading:boolean = true;
  public showAccountDetails:boolean = false;
  constructor(public navParams: NavParams, public navCtrl:NavController, public mortgageData: SharedMortgageDataProvider, public accountsService: AccountsServiceProvider) {
    this.headerParams = navParams.data;
  }
  ngOnChanges(){
    this.pageName = this.pageNameParam;
  }
  returnToAccounts(){
    this.navCtrl.pop({animate: true, direction: 'back'})
  }
  goToInbox(){
    this.navCtrl.push(InboxPage, {
      pageType:'INBOX_PAGE',
      payload: {}
    })
  }
}
