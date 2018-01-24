import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountUnlockedPage } from '../account-unlocked/account-unlocked';
import { UnlockAccountProvider } from "../../providers/unlock-account/unlock-account";
import { CountryStateProvider } from "../../providers/country-state/country-state";
import { UNLOCKACCOUNT } from '../core/unlockAccountConstants';
import { Utility } from '../core/utility';
import { LoginPage } from "../login/login";
import { AccountLockedPage } from "../account-locked/account-locked";
import { ErrorMessages } from "../../config/global-config";
import { StorageProvider } from '../../providers/storage/storage';
/**
 * Generated class for the UnlockAccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-unlock-account',
  templateUrl: 'unlock-account.html',
})
export class UnlockAccountPage {

  unlockAccountForm: FormGroup;
  changePasswordForm: FormGroup;
  months: any[] = [
    { value: "01", name: "January" },
    { value: "02", name: "February" },
    { value: "03", name: "March" },
    { value: "04", name: "April" },
    { value: "05", name: "May" },
    { value: "06", name: "June" },
    { value: "07", name: "July" },
    { value: "08", name: "August" },
    { value: "09", name: "September" },
    { value: "10", name: "October" },
    { value: "11", name: "November" },
    { value: "12", name: "December" }
  ];
  days: any[] = [
    { value: "01", name: "1" },
    { value: "02", name: "2" },
    { value: "03", name: "3" },
    { value: "04", name: "4" },
    { value: "05", name: "5" },
    { value: "06", name: "6" },
    { value: "07", name: "7" },
    { value: "08", name: "8" },
    { value: "09", name: "9" },
    { value: "10", name: "10" },
    { value: "11", name: "11" },
    { value: "12", name: "12" },
    { value: "13", name: "13" },
    { value: "14", name: "14" },
    { value: "15", name: "15" },
    { value: "16", name: "16" },
    { value: "17", name: "17" },
    { value: "18", name: "18" },
    { value: "19", name: "19" },
    { value: "20", name: "20" },
    { value: "21", name: "21" },
    { value: "22", name: "22" },
    { value: "23", name: "23" },
    { value: "24", name: "24" },
    { value: "25", name: "25" },
    { value: "26", name: "26" },
    { value: "27", name: "27" },
    { value: "28", name: "28" },
    { value: "29", name: "29" },
    { value: "30", name: "30" },
    { value: "31", name: "31" }
  ];
  states: any;
  rotatingQuestions: string[] = UNLOCKACCOUNT.rotatingQuestions;
  private rotatingMonths: any[] = UNLOCKACCOUNT.rotatingMonths;
  // private challengeQuestion: number = null;
  unlockQuestionId: number = null;
  private monthToggled: boolean = true;
  private selectMonthOptions: { title: string; mode: string; };
  private selectDayOptions: { title: string; mode: string; };
  private selectStateOptions: { title: string; mode: string; };
  private unlockCounter: number = 0; //Counter may need to be moved to a localstorage value

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public fb: FormBuilder, private unlockAccountService: UnlockAccountProvider, 
    countryState: CountryStateProvider, private utility: Utility,
    private storageService: StorageProvider) {
    this.unlockQuestionId = this.unlockAccountService.getRotatingQuestionId();

    countryState.getStates().subscribe(res => {
      this.states = res;
    })
    this.unlockAccountForm = fb.group({
      username: ['', [Validators.required]],
      code: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      answer: ['', [Validators.required]]
    })

    this.unlockQuestionId = this.unlockAccountService.getRotatingQuestionId();

    this.selectMonthOptions = {
      title: 'Select Month',
      mode: 'md'
    };

    this.selectDayOptions = {
      title: 'Select Day',
      mode: 'md'
    };

    this.selectStateOptions = {
      title: 'Select State',
      mode: 'md'
    };
  }

  ionViewDidLoad() {
    // If username saved populate the field
    this.utility.trackPage('UnlockAccountPage');
    this.storageService.readFromStorage('savedUser').then((data) => {
      if (data != null) {
        this.unlockAccountForm.controls.username.setValue(data);
      }
    });
    // Check for unlockCounter in localstorage
    this.storageService.readFromStorage('unlockCounter').then((data) => {
      if (data != null) {
        this.unlockCounter = Number(data);
      } else {
        this.storageService.writeToStorage('unlockCounter', this.unlockCounter)
      }
    });
  }

  popView() {
    this.navCtrl.pop();
  }
  returnToLogin() {
    this.navCtrl.setRoot(LoginPage)
  }

  helpPopUp() {
    this.utility.showAlert(ErrorMessages.SECURTITY_HELP_TITLE, "", ErrorMessages.SECURTITY_HELP_MSG, ErrorMessages.BUTTON_OK);
  }

  onSubmit() {
    let postData = {
      "username": this.unlockAccountForm.controls.username.value,
      "Id": this.unlockQuestionId,
      "code": this.unlockAccountForm.controls.code.value,
      "answer": this.unlockAccountForm.controls.answer.value
    };
    this.unlockAccountService.accountUnlock(postData).subscribe(
      (res: any) => {
        if (!res.success) {
          let alert, title, message;
          console.log(res)
          title = res.serverStatusDescription;
          this.unlockCounter++;
          this.storageService.writeToStorage('unlockCounter', this.unlockCounter);

          if (this.unlockCounter > 2) {
            this.utility.showDialg(ErrorMessages.ERROR, "", ErrorMessages.DOUBLE_LOCK_MSG, ErrorMessages.BUTTON_OK, ErrorMessages.CALL, ErrorMessages.UNLOCK_PHONE_NUM);
            this.navCtrl.push(AccountLockedPage, { doubleLocked: true })
          }
          else if (res.message === "SECURITYCODELOCKED") {
            this.utility.showDialg(ErrorMessages.ERROR, "", ErrorMessages.SECURITY_LOCKED_MSG, ErrorMessages.BUTTON_OK, ErrorMessages.CALL, ErrorMessages.UNLOCK_PHONE_NUM);
          }
          else if (res.message === "ROTATINGQUESTION") {
            this.utility.showDialg(ErrorMessages.ROTATION_Q_TITLE, "", ErrorMessages.ROATATION_Q_ERROR_MSG, ErrorMessages.TRY_AGAIN, ErrorMessages.CALL, ErrorMessages.UNLOCK_PHONE_NUM);
          }
          else if (res.message === "USERNAME") {
            this.utility.showDialg(ErrorMessages.INCORRECT_USERNAME, "", ErrorMessages.INCORRECT_USERNAME_MSG, ErrorMessages.TRY_AGAIN, ErrorMessages.CALL, ErrorMessages.UNLOCK_PHONE_NUM);
          }
          else if (res.message === "SECURITYCODEINCORRECT") {
            this.utility.showDialg(ErrorMessages.INCORRECT_SECURITY_TITLE, "", ErrorMessages.SECURITY_LOCKED_MSG, ErrorMessages.TRY_AGAIN, ErrorMessages.CALL, ErrorMessages.UNLOCK_PHONE_NUM);
          }
          this.unlockQuestionId = this.unlockAccountService.getRotatingQuestionId();
        } else {
          this.storageService.removeFromStorage('unlockCounter');
          this.navCtrl.push(AccountUnlockedPage, { payload: res });
        }
      }, err => {
        this.utility.showAlert(ErrorMessages.UNLOCK_EROOR_TITLE, "", ErrorMessages.UNLOCK_ERROR_MSG, ErrorMessages.BUTTON_OK);
        this.unlockAccountForm.get('answer').setValue('');
        this.unlockQuestionId = this.unlockAccountService.getRotatingQuestionId();
      });
      this.unlockAccountForm.reset();
  }
}
