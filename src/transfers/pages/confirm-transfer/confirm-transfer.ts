import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Utility } from '../../../pages/core/utility';
import { TransfersProvider } from '../../providers/transfers';
import { ErrorMessages } from "../../../config/global-config";


@IonicPage()
@Component({
  selector: 'page-confirm-transfer',
  templateUrl: 'confirm-transfer.html',
})
export class ConfirmTransferPage {

  public transferData: any;
  public getData: any;
  public tranData: any;
  public EXFlag: boolean = true;
  public pageTitle:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private util: Utility, private transfersService: TransfersProvider, private viewCtrl: ViewController) {
    let accountFromShowName;
    this.getData = this.navParams.get('dataObj');
    console.log("getData is : " + this.getData);
    if(this.getData.pageFrom == "TRANSFER"){
      this.pageTitle = 'TRANSFER';
    } else if(this.getData.pageFrom == "PAYMENT"){
      this.pageTitle = 'PAYMENT';
    }
    if (this.getData.fromParentAcctType == 'EXTERNAL') {
      this.EXFlag = false;
    } else {
      if (this.getData.fromParentAcctType != 'CHECKING_SAVING') {
        accountFromShowName = "Available Credit";
      } else {
        accountFromShowName = "Avaliable Balance";
      }
    }

    console.log("numberoftransfer:" + this.getData.numTransfers);
    this.transferData = {
      accountFrom: this.getData.fromAcctName,
      accountFromLastFour: this.getData.fromLastNum,
      accountFromBalance: this.getData.accountFromBalance,
      accountFromShowName: accountFromShowName,
      accountTo: this.getData.toAcctName,
      accountToLastFour: this.getData.toLastNum,
      accountToBalance: this.getData.accountToBalance,
      accountToShowName: "Avaliable Balance",
      amount: this.getData.amt,
      date: this.getData.transferDate,
      frequency: this.getData.frequency,
      numberOfTransfer: (this.getData.numTransfers == null || this.getData.numTransfers == "") ? 1 : this.getData.numTransfers == -1 ? 'Unlimited' : this.getData.numTransfers
    }
  }
  makeTransfer() {
    this.tranData = {
      amt: this.getData.amt,
      frequency: this.getData.frequency,
      fromAcctMask: this.getData.fromAcctMask,
      fromParentAcctType: this.getData.fromParentAcctType,
      numTransfers: this.getData.numTransfers, //this.getData.numTransfers == "Unlimited" ? "-1" : 
      paymentOption: "FIXEDAMOUNT",
      toAcctMask: this.getData.toAcctMask,
      toParentAcctType: this.getData.toParentAcctType,
      transferDate: this.getData.transferDate.toISOString().split('T')[0]
    }

    this.transfersService.transferMoney(this.tranData, 'POST').subscribe(res => {
      if (res.success == true) {
        let data = {
          accountFrom: this.getData.fromAcctName,
          accountFromLastFour: this.getData.fromLastNum,
          accountTo: this.getData.toAcctName,
          accountToLastFour: this.getData.toLastNum,
          amount: this.getData.amt
        }
        // this.util.showAlert(ErrorMessages.SUCCESS, "", ErrorMessages.SUCCESS, ErrorMessages.BUTTON_OK);
        setTimeout(() => {
          this.navCtrl.push("DepositMadePage", { fromPage: 'TRANSFER', data: data }).then(() => {
            //first we find the index of the current view controller:
            let index = this.viewCtrl.index;
            //then we remove it from the navigation stack
            for (let i = index; i > 0; i--) {
              this.navCtrl.remove(i);
            }
          });
        }, 1000)
      } else if (res.callPfcu == true) {
        this.util.showAlert(ErrorMessages.POPUP_TTILE, "", ErrorMessages.CONTACT_PENFED_TRANSFER_CALL, ErrorMessages.BUTTON_OK);
      } else if (res.maxCashAdvReached == true) {
        this.util.showAlert(ErrorMessages.POPUP_TTILE, "", ErrorMessages.TRANSFER_MAX_CASH_REACHED, ErrorMessages.BUTTON_OK);
      } else if(res.maxLimitReached == true){
        this.util.showAlert(ErrorMessages.POPUP_TTILE, "", ErrorMessages.TRANSFER_MAX_LIMIT_REACHED, ErrorMessages.BUTTON_OK);
      } else{
        this.util.showAlert(ErrorMessages.POPUP_TTILE, "", ErrorMessages.CONTACT_PENFED_TRANSFER_SERVER_ISSUE, ErrorMessages.BUTTON_OK);
      }
    }), error => {
      this.util.showAlert(ErrorMessages.POPUP_TTILE, "", ErrorMessages.TIMEOUT, ErrorMessages.BUTTON_OK);
    }
  }
}
