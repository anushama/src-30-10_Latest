import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UpdatePhoneNumPage } from '../update-phone-num/update-phone-num';
//import { StatusBar } from '@ionic-native/status-bar';
import { UpdateMailingAddressPage } from '../update-mailing-address/update-mailing-address';
import { UpdateEmailPage } from '../update-email/update-email';
import { ContactInformationProvider } from '../../providers/contact-information/contact-information';
import { SessionManager } from '../core/session-manager';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Utility } from '../core/utility';

/**
 * Generated class for the ContactInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({

  selector: 'page-contact-info',
  templateUrl: 'contact-info.html',
  providers: [ContactInformationProvider]
})
export class ContactInfoPage {

  public dayTimeNum: any = "";
  public eveningNum: any = "";
  public cellNum: any = "";
  public dayTimePhoneNumber: any = "";
  public eveningNumber: any = "";
  public cellNumber: any = "";
  public primaryEmailAddress: any;
  public secondaryEmail: any;
  public userName: string;
  public showDayTimePhoneNumber: boolean;
  public showEveningNumber: boolean;
  public showCellNumber: boolean;
  public showEmail: boolean;
  private streetAddress1: string;
  private streetAddress2: string;
  private cityAddress: string;
  private stateAddress: string;
  private zip: number;
  private mailingCountry: string;
  private physicalstreetAddress1: string;
  private physicalstreetAddress2: string;
  private physicalcityAddress: string;
  private physicalstateAddress: string;
  private physicalzip: number;
  private physicalCountry: string;
  public phoneNumber: any;
  public loading: any;
  //private mailingAddress:any;
  private isTherePhysicalAddress = false;
  private isMailingCountry = false;
  private isPhysicalCountry = false;
  //private sessionManager: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http,
    private contactInfoProvider: ContactInformationProvider,
    private utility: Utility, private sessionManager: SessionManager) {
      //this.sessionManager = SessionManager.singletonInstance();
  }

  //back to previous page;
  popView() {
    this.navCtrl.pop();
  }
  //go to edit phone number
  goToEditPhoneNumPage() {
    this.navCtrl.push(UpdatePhoneNumPage);
  }
  goToUpdateMailingAddress() {
    console.log('trigger');
    // this.navCtrl.push(UpdateMailingAddressPage);
    this.navCtrl.push(UpdateMailingAddressPage,{
      mailingAdr: this.sessionManager.contactInfo//this.mailingAddress
    });
  }
  goToEditEmailPage() {
    this.navCtrl.push(UpdateEmailPage);
  }

  ngOnInit() {
    let refreshData = this.navParams.get('refreshData');
    if (this.sessionManager.contactInfo == null || refreshData == true) {
      this.contactInfoProvider.getContactInfo()
        .subscribe(res => {
          let result = res.json();
          console.log(result);
          this.sessionManager.contactInfo = result;
          //this.mailingAddress = result;
          this.updateLocalObjects();
        }, error => {
          console.log(error);
        });
    } else {
      this.updateLocalObjects();
    }
  }

  private updateLocalObjects() {
    this.dayTimePhoneNumber = this.sessionManager.contactInfo.dayTimePhone;
    this.eveningNumber = this.sessionManager.contactInfo.eveningPhone;
    this.cellNumber = this.sessionManager.contactInfo.cellPhone;
    if (this.dayTimePhoneNumber != null) {
      this.dayTimeNum = this.setFormatNumber(this.dayTimePhoneNumber);
    }
    if (this.eveningNumber != null) {
      this.eveningNum = this.setFormatNumber(this.eveningNumber);
    }
    if (this.cellNumber != null) {
      this.cellNum = this.setFormatNumber(this.cellNumber);
    }
    this.dayTimePhoneNumber ? this.showDayTimePhoneNumber = true : this.showDayTimePhoneNumber = false;
    this.eveningNumber ? this.showEveningNumber = true : this.showEveningNumber = false;
    this.cellNumber ? this.showCellNumber = true : this.showCellNumber = false;

    this.primaryEmailAddress = this.sessionManager.contactInfo.primaryEmail;
    this.secondaryEmail = this.sessionManager.contactInfo.secondaryEmail;
    this.streetAddress1 = this.sessionManager.contactInfo.mailingAddress1;
    this.streetAddress2 = this.sessionManager.contactInfo.mailingAddress2;
    this.cityAddress = this.sessionManager.contactInfo.mailingCity;
    this.stateAddress = this.sessionManager.contactInfo.mailingState;
    this.zip = this.sessionManager.contactInfo.mailingZip;
    this.mailingCountry = this.sessionManager.contactInfo.mailingCountry != null ? this.sessionManager.contactInfo.mailingCountry : '';
    this.isMailingCountry = this.mailingCountry != '' ? true : false;

    // Show-up physical address
    if (this.sessionManager.contactInfo.physicalAddress1 != null) {
      this.physicalstreetAddress1 = this.sessionManager.contactInfo.physicalAddress1;
      this.physicalstreetAddress2 = this.sessionManager.contactInfo.physicalAddress2;
      this.physicalcityAddress = this.sessionManager.contactInfo.physicalCity;
      this.physicalstateAddress = this.sessionManager.contactInfo.physicalState;
      this.physicalzip = this.sessionManager.contactInfo.physicalZip;
      this.physicalCountry = this.sessionManager.contactInfo.physicalCountry != null ? this.sessionManager.contactInfo.physicalCountry : '';
      this.isPhysicalCountry = this.physicalCountry != '' ? true : false;
      this.isTherePhysicalAddress = true;
    }

    if (this.secondaryEmail) {
      this.showEmail = true;
    }
    this.userName = this.sessionManager.contactInfo.userDisplayName;
  }

  setFormatNumber(val) {
    var formatNumber;
    var x = val.replace(/\D/ig, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,6})/);
    console.log(x[0])
    if (x[0].length == 10) {
      formatNumber = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    } else {
      formatNumber = x[0];
    }
    return formatNumber;
  }

}
