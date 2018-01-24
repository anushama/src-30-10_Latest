import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UpdateContactInfoProvider } from '../../providers/update-contact-info/update-contact-info';
import { HelploginPage } from '../helplogin/helplogin';
import { SecurityLockedPage } from '../security-locked/security-locked';
//import { UpdateEmailPage } from '../update-email/update-email';
import { ContactInfoPage } from '../contact-info/contact-info';
import { ErrorMessages } from '../../config/global-config';
import { Utility } from "../core/utility";


@IonicPage()
@Component({
  selector: 'page-security',
  templateUrl: 'security.html',
})
export class SecurityPage {
  public securityNumber: any;
  public securityObj: any;
  public resCorrect: any;
  public token: any;
  public priEmail: any;
  public secEmail: any;
  public dayNum: any;
  public eveningNum: any;
  public cellNum: any;
  public mailingData:any;
  public page: any;
  public attemptTimes:number;

  user: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder, public UCIP: UpdateContactInfoProvider,private viewCtrl: ViewController, private utility: Utility) {
    this.user = fb.group({
      securityNumber: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(6)]]
    })
    //get page
    this.page = "" || this.navParams.get('page');

    //email data
    this.priEmail = this.navParams.get('priEmail');
    this.secEmail = this.navParams.get('secEmail');

    //contact number data
    this.dayNum = this.navParams.get('daynumber');
    this.eveningNum = this.navParams.get('eveningnumber');
    this.cellNum = this.navParams.get('cellnumber');

   // mailing address data
    this.mailingData = this.navParams.get('payload');
  }
  popView() {
    this.navCtrl.pop();
  }
  popUpMethod() {
    this.utility.showAlert(ErrorMessages.SECURTITY_HELP_TITLE, '', ErrorMessages.SECURTITY_HELP_MSG, ErrorMessages.BUTTON_OK);    
  }
  goToHelpLogin(){
    this.navCtrl.push(HelploginPage);
    //this.navCtrl.push(SecurityLockedPage);
  }
  onSubmit() {
    this.UCIP.getSecurityCode(this.securityNumber).subscribe(data => {
      let day, evening, cell;
    //console.log('Security Check Data before', data);
      this.securityObj = data.json();
      this.resCorrect = this.securityObj.responseCorrect;
      this.attemptTimes = this.securityObj.attemptsRemaining;
      this.token = this.securityObj.successToken;
      let times = this.attemptTimes;

      //console.log('Security Check Data after', data);
      if (this.resCorrect == true) {
        if (this.page == 'UpdateEmailAddressPage') {
          this.UCIP.updateEmailAddress(this.priEmail, this.secEmail, this.token).subscribe(data => {
            this.navCtrl.push(ContactInfoPage, {refreshData: true})
            .then(() => {
              //first we find the index of the current view controller:
                let index = this.viewCtrl.index;
                //then we remove it from the navigation stack
                for(let i=index;i>0;i--){
                 this.navCtrl.remove(i);
               }
             });
          }, error => {
            console.log(error);
          });
        } else if (this.page == 'UpdateContactNumberPage') {
          day = this.doUpdateContactNumber(this.dayNum);
          evening = this.doUpdateContactNumber(this.eveningNum);
          cell = this.doUpdateContactNumber(this.cellNum);

          this.UCIP.updatePhoneNumber(day, evening, cell, this.token).subscribe(data => {
            this.navCtrl.push(ContactInfoPage, {refreshData: true})
            .then(() => {
              //first we find the index of the current view controller:
                let index = this.viewCtrl.index;
                //then we remove it from the navigation stack
                for(let i=index;i>0;i--){
                 this.navCtrl.remove(i);
               }
             });
          }, error => {
            console.log(error);
          });
        } else if(this.page == 'UpdateMailingAddressPage'){
          this.mailingData.token = this.token;
            this.UCIP.updateMailingAddress(this.mailingData).subscribe(data => {
              console.log(data);
              let res = data.json();
              if (res.success) {
                this.navCtrl.push(ContactInfoPage, {refreshData: true})
                .then(() => {
                  //first we find the index of the current view controller:
                    let index = this.viewCtrl.index;
                    //then we remove it from the navigation stack
                    for(let i=index;i>0;i--){
                     this.navCtrl.remove(i);
                   }
                });
              // success is false
              } else {
                let errorMessage = 'There was an unknown error while processing your request. Please try again and contact PenFed if the problem persists.';
                if (res.message === 'NOPHYSICAL') {
                  errorMessage = 'You must have at least one physical address on file.';
                } else if (res.message === 'FRAUDADDRESS') {
                  errorMessage = 'There was a problem updating your contact information. Please contact PenFed for assistance.';
                }                
                this.utility.showAlert(ErrorMessages.POPUP_TTILE, "", errorMessage, ErrorMessages.BUTTON_TRY_AGAIN);
              }
            }, error => {
              console.log(error);
            });
        }
      } else if(this.resCorrect == false && times > 0){
        let msg = 'The code entered was not correct. Please try again. There are ' + times + ' attempts remaining.';
        this.utility.showAlert(ErrorMessages.POPUP_TTILE, '', msg, ErrorMessages.BUTTON_OK);        
      } else if(this.resCorrect == false && times < 0){
        this.navCtrl.push(SecurityLockedPage);
      }
    }, error => {
      this.utility.showAlert(ErrorMessages.SECURITY_CODE_ERROR, '', ErrorMessages.SECURITY_CODE_INVALID, ErrorMessages.BUTTON_OK);      
    });
  }

// release contact number
  releaseFormatNumber(val) {
    return val.replace(/\D/ig, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,6})/)[0];
  }
//format the data
  doUpdateContactNumber(val) {
    if (val == "") {
      return "";
    } else {
      return this.releaseFormatNumber(val);
    }
  }
}
