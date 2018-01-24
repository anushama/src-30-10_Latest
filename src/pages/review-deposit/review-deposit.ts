import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MobileDepositTermsPage } from '../mobile-deposit-terms/mobile-deposit-terms';
import { MakeDepositProvider } from '../../providers/make-deposit/make-deposit';
import { Utility } from "../core/utility";
import { ErrorMessages } from "../../config/global-config";

@IonicPage()
@Component({
  selector: 'page-review-deposit',
  templateUrl: 'review-deposit.html',
})

export class ReviewDepositPage {
  public depositAccountName: any;
  public depositAmount: any;
  public depositAccount: any;
  public picture: any = {
    front: null,
    back: null
  };
  public flag: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private makeDeposit: MakeDepositProvider, private util: Utility) {

    console.log(this.navParams)
    this.depositAccountName = this.navParams.data.depositAccountName;
    this.depositAmount = this.navParams.data.depositAmount;
    this.picture = this.navParams.data.picture;
    this.depositAccount = this.navParams.data.depositAccount;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewDepositPage');
  }
  popView() {
    this.navCtrl.pop();
  }
  updateContinueButton(picture) {
    let state = true;
    if (picture.front !== null && picture.back !== null) {
      state = false;
    }
    return state;
  }
  goToTermsPage() {
    this.navCtrl.push(MobileDepositTermsPage);
  }
  confirm() {
    this.makeDeposit.makeDeposit(this.depositAmount, this.depositAccount.accountMask, this.picture.front, this.picture.back).subscribe(
      res => {
        let msg = res.message;
        if (res.success) {
          let data = {
            accountTo: (this.depositAccount.nickname == null || this.depositAccount.nickname == undefined) ? this.depositAccount.fullName : this.depositAccount.nickname,
            accountToLastFour: this.depositAccount.accountNum,
            amount: this.depositAmount
          }
          this.navCtrl.push("DepositMadePage", { fromPage: 'DEPOSIT', data: data })
        } else {
          if (msg == "FUNDTECH ERROR") this.util.showAlert(ErrorMessages.POPUP_TTILE, "", ErrorMessages.DEPOSIT_FUNDTECH_ERROR, ErrorMessages.BUTTON_OK)
          else {
            msg = msg + ErrorMessages.DEPOST_ERROR_MSG;
            this.util.showConfirmDialg(ErrorMessages.POPUP_TTILE, "", msg, ErrorMessages.BUTTON_OK, ErrorMessages.CONTACT_PENFED, this.contactPenFed, this);
          }
        }
        console.log(res);
      }, (err) => {
        console.log("Error-->" + err);
      });
  }

  contactPenFed(thisref) {
    thisref.navCtrl.push("ContactPage");
  }
}
