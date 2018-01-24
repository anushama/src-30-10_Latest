import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountsServiceProvider } from "../../providers/accounts-service/accounts-service";

/**
 * Generated class for the CheckDisplayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account-check-display',
  templateUrl: 'account-check-display.html',
})
export class AccountCheckDisplayPage {
  public headerParams:any;
  public checkImageData:any = {
    frontImage:null,
    backImage:null
  };
  public loading:boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public accountApi: AccountsServiceProvider) {
    this.headerParams = this.navParams.data;
    this.accountApi.getCheckImage(this.headerParams.accountMask, this.headerParams.payload.amount, this.headerParams.payload.checkNumber,  this.headerParams.payload.postedDate).subscribe(res=>{
      this.checkImageData = res;
      console.log(res);
      this.loading = false;
    });
    console.log( typeof this.headerParams.pageType)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountCheckDisplayPage');
    (<any>window).ADB.trackState('AccountCheckDisplayPage', {'pageName':'AccountCheckDisplayPage'});
  }

}
