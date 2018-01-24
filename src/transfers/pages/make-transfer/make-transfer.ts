import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';
import { DepositAmountPage } from '../../../pages/deposit-amount/deposit-amount';
import { DatePicker } from '@ionic-native/date-picker';
import { Utility } from '../../../pages/core/utility';
import { ErrorMessages } from "../../../config/global-config";
import { Times } from "../../../config/dropdown-option";
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SessionManager } from '../../../pages/core/session-manager';

@IonicPage()
@Component({
  selector: 'page-make-transfer',
  templateUrl: 'make-transfer.html',
  providers: [DatePicker]
})
export class MakeTransferPage {
  public flagFrom: boolean = true;
  public flagTo: boolean = true
  public amountFlagVal: boolean = true;
  public amount: number;
  public date: any;
  public myDate: any = new Date();
  private fromAcctSelected: any;
  private toAcctSelected: any;
  public selectFlag: boolean = false;
  public payTime: any;
  public timeChoose: any = "";
  public segmentButtonStatus: boolean = true;
  public monthButton: boolean = false;
  public calenderButton: boolean = false;
  public times: any;
  public selectStateOptions: any;
  public dataPush: any;
  public mountsLimit: any;
  public currentCheckingMountsLimit: any;
  public currentSavingMountsLimit: any;
  public mountsCheckingLimit: any;
  public mountsSavingLimit: any;
  public pageFromID: string;
  public transferData: any;
  public transferFromAcct:any;
  public disableChooseAccount:boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public datePicker: DatePicker, private util: Utility, private screen: ScreenOrientation, private app: App, private sessionManager: SessionManager) {
    //get page information from pageNav.
    this.pageFromID = navParams.data.page;
    this.transferData = navParams.data.transferData;
    this.transferFromAcct = navParams.data.transferFromAcct;
    if(this.transferFromAcct){
      if (this.pageFromID == 'PAYMENT' && this.transferData.parentAcctType == 'CHECKING_SAVING') {
        this.fromAcctSelected = this.transferData;
        this.flagFrom = false;
      } else if (this.pageFromID == 'PAYMENT' && this.transferData.parentAcctType != 'CHECKING_SAVING') {
        this.toAcctSelected = this.transferData;
        this.flagTo = false;
        this.disableChooseAccount = true;
      }
    }
    this.mountsCheckingLimit = this.sessionManager.accountsList.checkXferLimit;
    this.mountsSavingLimit = this.sessionManager.accountsList.savingXferLimit;
    this.currentCheckingMountsLimit = this.sessionManager.accountsList.checkXferLimitAvailable;
    this.currentSavingMountsLimit = this.sessionManager.accountsList.savingsXferLimitAvailable;
    console.log(this.sessionManager.accountsList);
    this.times = Times;
    this.payTime = "ONETIME";
    this.selectStateOptions = {
      title: 'Select',
      mode: 'md'
    };
  }

  openModalPage() {
    let options;
    if (this.pageFromID == 'TRANSFER') {
      options = { pageFrom: "transfer", pageTitle: "TRANSFER AMOUNT" }
    } else if (this.pageFromID == 'PAYMENT') {
      options = { pageFrom: "payment", pageTitle: "PAYMENT AMOUNT" }
    }
    let profileModal = this.modalCtrl.create(DepositAmountPage, options);
    profileModal.onDidDismiss(data => {
      if (data != undefined && data != null) {
        this.amount = +data;
        this.amountFlagVal = false;
      } else {
        return false;
      }
    });
    profileModal.present();
  }

  showFromAccounts() {
    let selectAcctModal;
    let options;
    if (this.pageFromID == "TRANSFER") {
      options = { pageFrom: "transfer", pageTitle: "TRANSFER FROM" };
    } else if (this.pageFromID == "PAYMENT") {
      options = { pageFrom: "payment", pageTitle: "ACCOUNT TO PAY FROM" };
    }
    selectAcctModal = this.modalCtrl.create("AccountToTransferFromPage", options);
    selectAcctModal.onDidDismiss(selectedAccount => {
      if (selectedAccount != undefined && selectedAccount != null) {
        this.fromAcctSelected = selectedAccount;
        if (this.fromAcctSelected.parentAcctType != "CHECKING_SAVING" && this.fromAcctSelected.parentAcctType != "EXTERNAL") {
          this.monthButton = true;
          this.calenderButton = true;
          this.timeChoose = "";
          this.myDate = new Date();
        } else {
          this.monthButton = false;
          this.calenderButton = false;
        }
        this.payTime = "ONETIME"
        this.flagFrom = false;
      }
    })
    selectAcctModal.present();
  }


  showToAccounts() {
    let options;
    if (this.pageFromID == "TRANSFER") {
      options = { pageFrom: "transfer", pageTitle: "TRANSFER TO" };
    } else if (this.pageFromID == "PAYMENT") {
      options = { pageFrom: "payment", pageTitle: "Account To Pay To" };
    }

    let selectAcctModal = this.modalCtrl.create("AccountToTransferToPage", options);
    selectAcctModal.onDidDismiss(selectedAccount => {
      if (selectedAccount != undefined && selectedAccount != null) {
        this.toAcctSelected = selectedAccount;
        console.log(selectedAccount);

        this.flagTo = false;
      }
    })
    selectAcctModal.present();
  }

  showCalendar() {
    let MDate = (this.payTime == "MONTHLY") ? new Date(new Date().getTime() + (24 * 60 * 60 * 1000)) : new Date().getTime();
    console.log(MDate);
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      minDate: MDate,
      allowOldDates: false,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_TRADITIONAL
    }).then(
      date => {
        date != null ? this.myDate = date : (this.payTime == "MONTHLY") ? this.myDate = new Date(new Date().getTime() + (24 * 60 * 60 * 1000)) : this.myDate = new Date().getTime();
      },
      err => console.log('Error occurred while getting date: ', err)
      );
  }

  selectedOne() {
    this.selectFlag = false;
    this.segmentButtonStatus = true;
    this.payTime = "ONETIME";
    this.timeChoose = "";
    this.myDate = new Date();
  }

  selectedMonth() {
    this.selectFlag = true;
    this.payTime = "MONTHLY";
    this.myDate = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
    this.segmentButtonStatus = (this.payTime == "MONTHLY" && this.timeChoose != undefined && this.timeChoose != "") ? true : false;
  }

  formatLimitVal(val) {
    let x = val.toString().split("");
    let y = "";
    if (val.length > 2) {
      for (var i = 0; i < val.length; i++) {
        i == val.length - 2 ? y += x[i] + "." : y += x[i];
      }
    } else {
      y = val;
    }
    return y;
  }

  confirm() {
    this.dataPush = {
      amt: this.amount,
      frequency: this.payTime,
      fromAcctMask: this.fromAcctSelected.accountMask,
      accountFromBalance: this.fromAcctSelected.parentAcctType == 'EXTERNAL' ? "" : this.fromAcctSelected.parentAcctType == 'CHECKING_SAVING' ? this.fromAcctSelected.availableBal : this.fromAcctSelected.availableCredit,
      fromParentAcctType: this.fromAcctSelected.parentAcctType,
      fromLastNum: this.fromAcctSelected.numLast4,
      fromAcctName: this.fromAcctSelected.nickname == null ? this.fromAcctSelected.fullName : this.fromAcctSelected.nickname,
      numTransfers: this.timeChoose,
      toAcctMask: this.toAcctSelected.accountMask,
      accountToBalance: this.pageFromID == 'PAYMENT' ? this.toAcctSelected.currentBal : this.toAcctSelected.parentAcctType == 'EXTERNAL' ? "" : this.toAcctSelected.availableBal,
      toParentAcctType: this.toAcctSelected.parentAcctType,
      toLastNum: this.toAcctSelected.numLast4,
      toAcctName: this.toAcctSelected.nickname == null ? this.toAcctSelected.fullName : this.toAcctSelected.nickname,
      transferDate: this.myDate,
      pageFrom: this.pageFromID,
    }

    let currentDate = new Date();

    //GET THE CURRENT AMOUNT
    let availableAmount = (this.fromAcctSelected.parentAcctType == 'CHECKING_SAVING') ? this.fromAcctSelected.availableBal : this.fromAcctSelected.availableCredit;

    //EXTER ACCOUNT
    if (this.fromAcctSelected.parentAcctType == 'EXTERNAL') {

      //TODO WILL ADD MORE CONDITIONS HERE
      if (this.currentCheckingMountsLimit < this.amount) {
        //FORMAT LIMIT VALUE
        // let CML = this.formatLimitVal(this.currentMountsLimit);
        // let usedAmount = this.formatLimitVal(500000 - this.currentMountsLimit);

        let popTItle = "Daily Transfer Limit Exceeded";
        // let content = "You have exceeded your daily ACH transfer limit. Daily ACH Limit : $5000, ACH Processed Today : $ " + usedAmount + ", Max Transfer Amount: $ " + CML + ". Please click OK to edit your transfer."
        // this.util.showAlert(popTItle, "", content, ErrorMessages.BUTTON_OK);
      } else {
        this.app.getRootNav().push("ConfirmTransferPage", { dataObj: this.dataPush });
      }
    } else if (this.fromAcctSelected.parentAcctType == 'CREDITCARD' || this.fromAcctSelected.parentAcctType == 'LOAN') {
      if (this.toAcctSelected.parentAcctType == 'EXTERNAL') {
        this.util.showAlert(ErrorMessages.POPUP_TTILE, "", ErrorMessages.TRANSFER_FROM_CREIDT_TO_EXTERNAL_ERROR, ErrorMessages.BUTTON_OK);
      }
    } else {
      // IF TRANSFER FROM THE SAME ACCOUNT, RETURN ALERT
      if (this.fromAcctSelected.numLast4 == this.toAcctSelected.numLast4) {
        this.util.showAlert(ErrorMessages.POPUP_TTILE, "", ErrorMessages.NO_SAME_ACCOUNT, ErrorMessages.BUTTON_OK);
      } else {
        // IF TRANSFER AOUNT > CURRENT AMOUNT, DEPENDING ON DATE
        if (availableAmount < this.amount) {
          if (this.myDate.toISOString().split('T')[0] == currentDate.toISOString().split('T')[0]) {
            this.util.showAlert(ErrorMessages.POPUP_TTILE, "", ErrorMessages.NO_ENOUGH_FUNDS, ErrorMessages.BUTTON_OK);
          } else {
            this.app.getRootNav().push("ConfirmTransferPage", { dataObj: this.dataPush });
          }
        } else {
          this.app.getRootNav().push("ConfirmTransferPage", { dataObj: this.dataPush });
        }
      }
    }
  }
}
