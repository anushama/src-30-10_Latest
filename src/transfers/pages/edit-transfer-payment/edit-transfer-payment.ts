import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';
import { DepositAmountPage } from '../../../pages/deposit-amount/deposit-amount';
import { DatePicker } from '@ionic-native/date-picker';
import { Utility } from '../../../pages/core/utility';
import { ErrorMessages } from "../../../config/global-config";
import { Times } from "../../../config/dropdown-option";
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { SessionManager } from '../../../pages/core/session-manager';
import { TransfersProvider } from '../../providers/transfers';
import { AccountsServiceProvider } from '../../../providers/accounts-service/accounts-service';
import { DatePipe } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-edit-transfer-payment',
  templateUrl: 'edit-transfer-payment.html',
  providers: [DatePicker]
})
export class EditTransferPaymentPage {
  // public flagFrom: boolean = true;
  // public flagTo: boolean = true
  // public amountFlagVal: boolean = true;
  public amount: number;
  public date: any;
  public myDate: any = new Date();
  // private fromAcctSelected: any;
  // private toAcctSelected: any;
  public selectFlag: boolean = false;
  // public payTime: any;
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
  private fromPage: string;
  private scheduledTransfer: any;
  private previousPage: any;
  private transferIndex: number;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, public datePicker: DatePicker,
    private util: Utility, private screen: ScreenOrientation,
    private app: App, private sessionManager: SessionManager,
    private transfersService: TransfersProvider, private accountsApi: AccountsServiceProvider) {

    //get page information from pageNav.
    this.fromPage = this.navParams.data.fromPage;
    this.scheduledTransfer = Object.assign({}, this.navParams.data.payload);
    this.previousPage = this.navParams.data.previousPage;
    this.transferIndex = this.navParams.data.transferIndex;

    // Disable monthly frequency & calendar for LOAN & CREDIT accounts
    if (this.scheduledTransfer.toParentAcctType != "CHECKING_SAVING" && this.scheduledTransfer.toParentAcctType != "EXTERNAL") {
      this.monthButton = true;
      this.calenderButton = true;
    }

    // Limits
    this.mountsCheckingLimit = this.sessionManager.accountsList.checkXferLimit;
    this.mountsSavingLimit = this.sessionManager.accountsList.savingXferLimit;
    this.currentCheckingMountsLimit = this.sessionManager.accountsList.checkXferLimitAvailable;
    this.currentSavingMountsLimit = this.sessionManager.accountsList.savingsXferLimitAvailable;
    // console.log(this.sessionManager.accountsList);
    this.times = Times;
    //this.payTime = "ONETIME";
    this.selectStateOptions = {
      title: 'Select',
      mode: 'md'
    };
  }

  openModalPage() {
    let options;
    if (this.fromPage == "TRANSFER") {
      options = { pageFrom: "transfer", pageTitle: "TRANSFER AMOUNT", amount: this.scheduledTransfer.amount.toString() }
    } else if (this.fromPage == "PAYMENT") {
      options = { pageFrom: "transfer", pageTitle: "TRANSFER AMOUNT" }
    }
    let profileModal = this.modalCtrl.create(DepositAmountPage, options);
    profileModal.onDidDismiss(data => {
      if (data != undefined && data != null) {
        this.scheduledTransfer.amount = +data;
      } else {
        return false;
      }
    });
    profileModal.present();
  }

  showFromAccounts() {
    let options;
    if (this.fromPage == "TRANSFER") {
      options = { pageFrom: "transfer", pageTitle: "TRANSFER FROM", numLast4: this.scheduledTransfer.fromAccountNumberLast4 };
    } else if (this.fromPage == "PAYMENT") {
      options = { pageFrom: "payment", pageTitle: "ACCOUNT TO PAY FROM" };
    }
    let selectAcctModal = this.modalCtrl.create("AccountToTransferFromPage", options);
    
    selectAcctModal.onDidDismiss(selectedAccount => {
      if (selectedAccount != undefined && selectedAccount != null) {
        console.log('FromAccount', selectedAccount);
        this.scheduledTransfer.fromAccountName = (!selectedAccount.nickname) ? selectedAccount.fullName : selectedAccount.nickname;
        this.scheduledTransfer.fromAccountNumberLast4 = selectedAccount.numLast4;
        this.scheduledTransfer.fromAcctMask = selectedAccount.accountMask;
        this.scheduledTransfer.fromParentAcctType = selectedAccount.parentAcctType;
        this.scheduledTransfer.fromAcctType = selectedAccount.acctType;
        if (this.scheduledTransfer.fromParentAcctType != "CHECKING_SAVING" && this.scheduledTransfer.fromParentAcctType != "EXTERNAL") {
          this.scheduledTransfer.fromAcctAvailableBal = selectedAccount.availableCredit;
          this.monthButton = true;
          this.calenderButton = true;
          this.scheduledTransfer.frequency = "ONETIME";
          // For Loan & Credit accounts date can't be future
          if ((new Date(this.scheduledTransfer.nextPaymentDate) > new Date())) {
            this.scheduledTransfer.nextPaymentDate = new Date();
          }
        } else {
          this.monthButton = false;
          this.calenderButton = false;
          if (this.scheduledTransfer.fromParentAcctType == "CHECKING_SAVING") {
            this.scheduledTransfer.fromAcctAvailableBal = selectedAccount.availableBal;
          } else {
            this.scheduledTransfer.fromAcctAvailableBal = undefined;
          }
        }
      }
    })
    selectAcctModal.present();
  }


  showToAccounts() {
    let options;
    if (this.fromPage == "TRANSFER") {
      options = { pageFrom: "transfer", pageTitle: "TRANSFER TO", numLast4: this.scheduledTransfer.toAccountNumberLast4 };
    } else if (this.fromPage == "PAYMENT") {
      options = { pageFrom: "payment", pageTitle: "ACCOUNT TO PAY" };
    }
    let selectAcctModal = this.modalCtrl.create("AccountToTransferToPage", options);
    selectAcctModal.onDidDismiss(selectedAccount => {
      if (selectedAccount != undefined && selectedAccount != null) {
        console.log('ToAccount', selectedAccount);
        this.scheduledTransfer.toAccountName = (!selectedAccount.nickname) ? selectedAccount.fullName : selectedAccount.nickname;
        this.scheduledTransfer.toAccountNumberLast4 = selectedAccount.numLast4;
        this.scheduledTransfer.toAcctMask = selectedAccount.accountMask;
        this.scheduledTransfer.toParentAcctType = selectedAccount.parentAcctType;
        this.scheduledTransfer.toAcctAvailableBal = selectedAccount.availableBal;
      }
    })
    selectAcctModal.present();
  }

  showCalendar() {
    // this.payTime
    let MDate = (this.scheduledTransfer.frequency == "MONTHLY") ? new Date(new Date().getTime() + (24 * 60 * 60 * 1000)) : new Date().getTime();
    console.log(MDate);
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      minDate: MDate,
      allowOldDates: false,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
        date != null ? this.myDate = date : (this.scheduledTransfer.frequency == "MONTHLY") ? this.myDate = new Date(new Date().getTime() + (24 * 60 * 60 * 1000)) : this.myDate = new Date().getTime();
      },
      err => console.log('Error occurred while getting date: ', err)
      );
  }

  segmentChanged() {
    console.log('scheduledTransfer frequency is - ', this.scheduledTransfer.frequency);
    if (this.scheduledTransfer.frequency == 'ONETIME') {
      this.scheduledTransfer.numTransfers = 1;
    } else {
      this.scheduledTransfer.numTransfers = null; //UNLIMITED
      if (!(new Date(this.scheduledTransfer.nextPaymentDate) > new Date())) {
        this.scheduledTransfer.nextPaymentDate = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
      }
    }
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

  showConfirmation() {
    this.util.showConfirmDialg('', '',
      ErrorMessages.SCHEDULED_TRASNFER_DELETE_CONFIRM, ErrorMessages.BUTTON_CANCEL,
      ErrorMessages.BUTTON_DELETE, this.deleteTransfer.bind(this));
  }

  private deleteTransfer() {
    this.transfersService.deleteScheduledTransfer(this.scheduledTransfer.id).toPromise()
      .then(res => {
        // let result = res.json();
        console.log(res);
        this.previousPage.scheduledTransfers.splice(this.transferIndex, 1);
        console.log('scheduledTransfers in previous page - ', this.previousPage.scheduledTransfers);
        let sessionSTransferDeleted = this.sessionManager.scheduledTransfers.splice(this.scheduledTransfer.parentIndex, 1);
        console.log('Session scheduled transfer deleted', sessionSTransferDeleted);
        if (this.previousPage.scheduledTransfers.length == 0) {
          this.previousPage.noScheduledTransfers = false;
        }
        this.navCtrl.pop();
      })
      .catch(error => {
        console.log(error);
        this.util.showAlert(ErrorMessages.POPUP_TTILE, "", ErrorMessages.COMMON_ERROR_MESSAGE, ErrorMessages.BUTTON_OK);
        // return error;
      });
  }

  private validateAndContinue() {
    this.saveTransferOrPayment();
  }

  private updateSessionedData() {
    // Update sessionedData
    this.previousPage.scheduledTransfers.splice(this.transferIndex, 1, this.scheduledTransfer);
    console.log('scheduledTransfers in previous page - ', this.previousPage.scheduledTransfers);

    let dateforDisplay = new DatePipe('en-US').transform(this.scheduledTransfer.nextPaymentDate, 'MM/dd/yyyy')

    this.sessionManager.scheduledTransfers[this.scheduledTransfer.parentIndex].amt = this.scheduledTransfer.amount;
    this.sessionManager.scheduledTransfers[this.scheduledTransfer.parentIndex].frequency = this.scheduledTransfer.frequency;
    this.sessionManager.scheduledTransfers[this.scheduledTransfer.parentIndex].numTransfers = this.scheduledTransfer.numTransfers;
    // this.sessionManager.scheduledTransfers[this.scheduledTransfer.parentIndex].transferDate = this.scheduledTransfer.nextPaymentDate;
    this.sessionManager.scheduledTransfers[this.scheduledTransfer.parentIndex].toParentAcctType = this.scheduledTransfer.toParentAcctType;
    this.sessionManager.scheduledTransfers[this.scheduledTransfer.parentIndex].fromParentAcctType = this.scheduledTransfer.fromParentAcctType;
    // this.sessionManager.scheduledTransfers[this.scheduledTransfer.parentIndex].transferDateDisplay = dateforDisplay;
    this.sessionManager.scheduledTransfers[this.scheduledTransfer.parentIndex].toAcctMask = this.scheduledTransfer.toAcctMask;
    this.sessionManager.scheduledTransfers[this.scheduledTransfer.parentIndex].fromAcctMask = this.scheduledTransfer.fromAcctMask;
    this.sessionManager.scheduledTransfers[this.scheduledTransfer.parentIndex].toAcctNumberLast4 = this.scheduledTransfer.toAccountNumberLast4;
    this.sessionManager.scheduledTransfers[this.scheduledTransfer.parentIndex].fromAcctNumberLast4 = this.scheduledTransfer.fromAccountNumberLast4;
    this.sessionManager.scheduledTransfers[this.scheduledTransfer.parentIndex].nextPaymentDate = this.scheduledTransfer.nextPaymentDate;
    this.sessionManager.scheduledTransfers[this.scheduledTransfer.parentIndex].nextPaymentDateDisplay = dateforDisplay;
    console.log('Session scheduled transfer deleted', this.sessionManager.scheduledTransfers[this.scheduledTransfer.parentIndex]);
  }

  private saveTransferOrPayment() {
    let transferOrPaymentObj = {
      id: this.scheduledTransfer.id,
      toAcctMask: this.scheduledTransfer.toAcctMask,
      toParentAcctType: this.scheduledTransfer.toParentAcctType,
      fromAcctMask: this.scheduledTransfer.fromAcctMask,
      fromParentAcctType: this.scheduledTransfer.fromParentAcctType,
      amt: this.scheduledTransfer.amount+'',
      numTransfers: this.scheduledTransfer.numTransfers+'',
      transferDate: this.scheduledTransfer.transferDate, // this.myDate  
      frequency: this.scheduledTransfer.frequency,
      mortgageExcessToEscrow: this.scheduledTransfer.mortgageExcessToEscrow,
      paymentOption: 'FIXEDAMOUNT'
    }
    console.log('transferOrPaymentObj - ', transferOrPaymentObj);
    this.transfersService.transferMoney(transferOrPaymentObj, 'PUT').toPromise()
      .then(res => {
        console.log(res);
        if (res.success == true) {
          // Get a fresh copy of accounts data
          this.accountsApi.getCombinedAccounts().toPromise()
          .then(res => {
            this.sessionManager.accountsList = res.accountData;
            this.sessionManager.IRAAccounts = res.iraCertificateData;
            this.navCtrl.pop();
          })
          .catch(error => {
            console.log(error);
          });
          // Update sessionedData
          this.updateSessionedData();

        } else if (res.callPfcu == true) {
          this.util.showAlert(ErrorMessages.POPUP_TTILE, "", ErrorMessages.CONTACT_PENFED_TRANSFER_CALL, ErrorMessages.BUTTON_OK);
        } else if (res.maxCashAdvReached == true) {
          this.util.showAlert(ErrorMessages.POPUP_TTILE, "", ErrorMessages.TRANSFER_MAX_CASH_REACHED, ErrorMessages.BUTTON_OK);
        } else if(res.maxLimitReached == true){
          this.util.showAlert(ErrorMessages.POPUP_TTILE, "", ErrorMessages.TRANSFER_MAX_LIMIT_REACHED, ErrorMessages.BUTTON_OK);
        } else{
          this.util.showAlert(ErrorMessages.POPUP_TTILE, "", ErrorMessages.CONTACT_PENFED_TRANSFER_SERVER_ISSUE, ErrorMessages.BUTTON_OK);
        }
      })
      .catch(error => {
        console.log(error);
        // this.util.showAlert(ErrorMessages.POPUP_TTILE, "", ErrorMessages.COMMON_ERROR_MESSAGE, ErrorMessages.BUTTON_OK);
      });

    

    // let currentDate = new Date();

    //GET THE CURRENT AMOUNT
    // let availableAmount = this.scheduledTransfer.fromAcctAvailableBal;
    // let availableAmount = (this.fromAcctSelected.parentAcctType == 'CHECKING_SAVING') ? this.fromAcctSelected.availableBal : this.fromAcctSelected.availableCredit;

    //EXTER ACCOUNT
    // if (this.scheduledTransfer.fromParentAcctType == 'EXTERNAL') { //this.fromAcctSelected.parentAcctType == 'EXTERNAL'

    //   //TODO WILL ADD MORE CONDITIONS HERE
    //   if (this.currentCheckingMountsLimit < this.scheduledTransfer.amount) { //this.currentCheckingMountsLimit < this.amount
    //     //FORMAT LIMIT VALUE
    //     // let CML = this.formatLimitVal(this.currentMountsLimit);
    //     // let usedAmount = this.formatLimitVal(500000 - this.currentMountsLimit);

    //     let popTItle = "Daily Transfer Limit Exceeded";
    //     // let content = "You have exceeded your daily ACH transfer limit. Daily ACH Limit : $5000, ACH Processed Today : $ " + usedAmount + ", Max Transfer Amount: $ " + CML + ". Please click OK to edit your transfer."
    //     // this.util.showAlert(popTItle, "", content, ErrorMessages.BUTTON_OK);
    //   } else {
    //     this.app.getRootNav().push("ConfirmTransferPage", { dataObj: this.dataPush });
    //   }
    // } else if (this.fromAcctSelected.parentAcctType == 'CREDITCARD' || this.fromAcctSelected.parentAcctType == 'LOAN') {
    //   if (this.toAcctSelected.parentAcctType == 'EXTERNAL') {
    //     this.util.showAlert(ErrorMessages.POPUP_TTILE, "", ErrorMessages.TRANSFER_FROM_CREIDT_TO_EXTERNAL_ERROR, ErrorMessages.BUTTON_OK);
    //   }
    // } else {
    //   // IF TRANSFER FROM THE SAME ACCOUNT, RETURN ALERT
    //   if (this.fromAcctSelected.numLast4 == this.toAcctSelected.numLast4) {
    //     this.util.showAlert(ErrorMessages.POPUP_TTILE, "", ErrorMessages.NO_SAME_ACCOUNT, ErrorMessages.BUTTON_OK);
    //   } else {
    //     // IF TRANSFER AOUNT > CURRENT AMOUNT, DEPENDING ON DATE
    //     if (availableAmount < this.amount) {
    //       if (this.myDate.toISOString().split('T')[0] == currentDate.toISOString().split('T')[0]) {
    //         this.util.showAlert(ErrorMessages.POPUP_TTILE, "", ErrorMessages.NO_ENOUGH_FUNDS, ErrorMessages.BUTTON_OK);
    //       } else {
    //         this.app.getRootNav().push("ConfirmTransferPage", { dataObj: this.dataPush });
    //       }
    //     } else {
    //       this.app.getRootNav().push("ConfirmTransferPage", { dataObj: this.dataPush });
    //     }
    //   }
    // }
  }

}
