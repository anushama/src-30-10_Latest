import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { TransfersProvider } from '../../providers/transfers';
import { SessionManager } from '../../../pages/core/session-manager';
import { Utility } from '../../../pages/core/utility';
import { StorageProvider } from '../../../providers/storage/storage';
import { ErrorMessages } from '../../../config/global-config';

/**
 * Generated class for the ScheduledTransfersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-scheduled-transfers',
  templateUrl: 'scheduled-transfers.html',
})
export class ScheduledTransfersPage {

  public noScheduledTransfers: boolean = true;
  public scheduledTransfers: any[] = [];
  private transactType: string;

  constructor(private navCtrl: NavController, private navParams: NavParams,
    private transfersService: TransfersProvider,
    private sessionManager: SessionManager,
    private util: Utility, private storageService:StorageProvider,
    private app: App) {
      this.transactType = this.navParams.data.page;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScheduledTransfersPage');
  // }

  // ionViewDidEnter() {
  //   console.log('ionViewDidEnter ScheduledTransfersPage');
    let refreshData = this.navParams.get('refreshData');
    if (this.sessionManager.scheduledTransfers == null || refreshData == true) {
      // Get scheduled transfers
      this.getScheduledTransfers()
        .then(res => {
          console.log(res);
          this.sessionManager.scheduledTransfers = res;
          this.updateLocalObjects();
        })
        .catch(error => {
          console.log(error);
        });
    }
    else {
      // Use scheduled transfers stored in session-manager.
      this.updateLocalObjects();
    }

  }

  // transferTrackBy(index, scheduledTransfer) {
  //   return scheduledTransfer.toAccountName;
  // }

  private updateLocalObjects() {
    if (this.sessionManager.scheduledTransfers.length > 0) { //&& this.noScheduledTransfers
      let scheduledTransfersData = [];
      this.sessionManager.scheduledTransfers.forEach((element,index) => {
        let toAccount, fromAccount, transferData: {[k: string]: any} = {};

        toAccount = this.getAccountInMemberinfo(element.toAcctMask, element.toParentAcctType);
        fromAccount = this.getAccountInMemberinfo(element.fromAcctMask, element.fromParentAcctType);

        if (element.toParentAcctType == 'CHECKING_SAVING' || 
            element.toParentAcctType == 'EXTERNAL' ||
            element.toParentAcctType == 'UNKNOWN') {
          // Unsaved toAccount
          if (!toAccount) {
            transferData.toAccountName = 'Unsaved Account';
          }
          // Saved toAccount
          else {
            transferData.toAccountName = (!toAccount.nickname) ? toAccount.fullName : toAccount.nickname;
            // transferData.toAccountNumberLast4 = toAccount.numLast4;
            transferData.toAcctAvailableBal = toAccount.availableBal;
            transferData.toParentAcctType = toAccount.parentAcctType;
            transferData.toAcctMask = toAccount.accountMask;
          }
          // Unsaved fromAccount
          if (!fromAccount) {
            transferData.fromAccountName = 'Unsaved Account';
          }
          // Saved fromAccount
          else {
            transferData.fromAccountName = (!fromAccount.nickname) ? fromAccount.fullName : fromAccount.nickname;
            // transferData.fromAccountNumberLast4 = fromAccount.numLast4;
            transferData.fromParentAcctType = fromAccount.parentAcctType; //EXTERNAL
            if (fromAccount.parentAcctType != 'CHECKING_SAVING' && fromAccount.parentAcctType != 'EXTERNAL') {
              transferData.fromAcctAvailableBal = fromAccount.availableCredit;
            } else {
              transferData.fromAcctAvailableBal = fromAccount.availableBal;
            }
            transferData.fromAccountNumberLast4 = element.fromAcctNumberLast4;
            transferData.fromAcctMask = fromAccount.accountMask;
            transferData.fromAcctType = fromAccount.acctType;
          }
          // Common values toAccount
          transferData.toAccountNumberLast4 = element.toAcctNumberLast4; //toAccount.numLast4;
          // transferData.nextPaymentDateDisplay = (!element.nextPaymentDateDisplay) ? element.transferDateDisplay : element.nextPaymentDateDisplay;
          transferData.nextPaymentDate = (!element.nextPaymentDate) ? element.nextPaymentDateDisplay : element.nextPaymentDate;
          transferData.transferDate = (!element.transferDate) ? element.transferDateDisplay : element.transferDate;
          // Set amt to zero if null
          // element.amt = (!element.amt) ? 0 : element.amt;
          transferData.amount = element.amt;//this.util.centsToDollars(element.amt);
          //(element.amt / 100) + '.' + (element.amt % 100 > 0 ? element.amt % 100 : '00');
          // || transferData.toAccountName == 'Unsaved Account'
          transferData.mortgageExcessToEscrow = element.mortgageExcessToEscrow;
          transferData.disableDate = element.disableDate;

          if (!toAccount || !fromAccount) {
            transferData.notEditable = true;
          } else if (element.frequency == 'ONETIME' || element.frequency == 'MONTHLY') {
            transferData.notEditable = false;
            transferData.numTransfers = element.numTransfers;
          } else transferData.notEditable = true;

          transferData.frequency = element.frequency;
          transferData.id = element.id;
          transferData.parentIndex = index;

          // Update scheduledTransfersData
          scheduledTransfersData.push(transferData);
        } else {
          // Do nothing
        }
        // Common values
        // transferData.fromAccountNumberLast4 = element.fromAcctNumberLast4;
      });
      // Check scheduled transfers data
      if (scheduledTransfersData.length > 0) {
        // Sorting in date ascending order
        scheduledTransfersData.sort(function (T1, T2) {
          var D1 = new Date(T1.nextPaymentDate);
          var D2 = new Date(T2.nextPaymentDate);
          if (D1 < D2) {
              return -1;
          } else if (D1 == D2) {
              return 0;
          } else {
              return 1;
          }
        });
        this.scheduledTransfers = scheduledTransfersData;
        // console.log(`Scheduled transfers to display ${this.scheduledTransfers}`);
        console.log('Scheduled transfers to display', this.scheduledTransfers);
      } else {
        this.noScheduledTransfers = false;
      }
    }
    else {
      this.noScheduledTransfers = false;
    }
  }

  private getAccountInMemberinfo(acctMask: string, acctType: string) {
    let acctList;
    switch (acctType) {
      case 'CHECKING_SAVING': {
        acctList = this.sessionManager.accountsList.checkSaveAccounts.concat(this.sessionManager.accountsList.externalAccounts || []) || [];
        break;
      }
      case 'CREDITCARD': {
        acctList = this.sessionManager.accountsList.creditCardAccounts || [];
        break;
      }
      case 'LOAN':{
        acctList = this.sessionManager.accountsList.loanAccounts || [];
        break;
      }
      // case 'MORTGAGE':{
      //   acctList = this.sessionManager.accountsList.mortgageAccounts || [];
      //   break;
      // }
      case 'EXTERNAL':{
        acctList = this.sessionManager.accountsList.externalAccounts || [];
        break;
      }
      // case 'CERTIFICATE':{
      //   acctList = this.sessionManager.IRAAccounts.certificateAccounts || [];
      //   break;
      // }
      // case 'IRA':{
      //   acctList = this.sessionManager.IRAAccounts.iraAccounts || [];
      //   break;
      // }
      // Currenlty no depositcard data is seen in response
      // case 'DEPOSITCARD':{
      //   acctList = this.sessionManager.accountsList.creditCardAccounts || [];
      //   break;
      // }
      default:
        acctList = [];
    }
    for (let i = 0; i < acctList.length; i++) {
      if (acctMask === acctList[i].accountMask) {
        return acctList[i];
      }
    }
    // let acctListItem = acctList.filter(item => {
    //   acctMask == item.accountMask;
    // });
    // for (let acct of acctList) {
    //   if (acctMask == acct.accountMask) {
    //     return acct;
    //   }
    // }
    // return (acctListItem.length > 0) ? acctListItem[0] : undefined; 
    return undefined;//'UNKNOWN'
  }

  selectTransfer(scheduledTransfer, index){
    console.log('Scheduled transfer selected', scheduledTransfer);
    if (scheduledTransfer.notEditable) {
      if (scheduledTransfer.toAccountName == 'Unsaved Account' || scheduledTransfer.fromAccountName == 'Unsaved Account') { //scheduledTransfer.frequency != 'ONETIME' && scheduledTransfer.frequency != 'MONTHLY'
        this.util.showAlert(ErrorMessages.VISIT_PFOL_TITLE, '', ErrorMessages.SCHEDULED_TRASNFER_INVALID_ACCOUNT, ErrorMessages.BUTTON_OK);
      } else {
        this.util.showAlert(ErrorMessages.VISIT_PFOL_TITLE, '', ErrorMessages.SCHEDULED_TRASNFER_NOT_ALLOWED, ErrorMessages.BUTTON_OK);
      }
    } else {
      // Navigate to next view
      this.app.getRootNav().push('EditTransferPaymentPage',{
        fromPage:'TRANSFER',
        payload:scheduledTransfer,
        transferIndex:index,
        previousPage:this
      });
    }
  }

  getScheduledTransfers() {
    return this.transfersService.getScheduledTransfers().toPromise();
  }

  deleteTransfer(scheduledTransfer, index) {    
    this.transfersService.deleteScheduledTransfer(scheduledTransfer.id).toPromise()
      .then(res => {
        // let result = res.json();
        console.log(res);
        // this.sessionManager.contactInfo = result;
        // return result;//this.sessionManager.contactInfo;
        let sessionSTransferDeleted = this.sessionManager.scheduledTransfers.splice(scheduledTransfer.parentIndex, 1);
        console.log('Session scheduled transfer deleted', sessionSTransferDeleted);
        let localSTransferDeleted = this.scheduledTransfers.splice(index, 1);
        console.log('Local scheduled transfer deleted', localSTransferDeleted);
        if (this.scheduledTransfers.length == 0) {
          this.noScheduledTransfers = false;
        }
      })
      .catch(error => {
        console.log(error);
        this.util.showAlert(ErrorMessages.POPUP_TTILE, "", ErrorMessages.COMMON_ERROR_MESSAGE, ErrorMessages.BUTTON_OK);
        // return error;
      });
  }

}
