import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MailingAddress} from './mailing-address';
import { SecurityPage } from "../security/security";
// import { CountryStateProvider } from '../../providers/country-state/country-state';
import { ContactInformationProvider } from '../../providers/contact-information/contact-information';
import { ZipCodeValidator } from "../../validators/zipcode";

/**
 * Generated class for the UpdateMailingAddressPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-update-mailing-address',
  templateUrl: 'update-mailing-address.html'
  //providers: [MailingAddressServiceProvider]
})
export class UpdateMailingAddressPage {
  private mailingForm: FormGroup;
  // public physicalForm: FormGroup;
  // public loading: any;
  public mailingAddress: MailingAddress;
  public countries: any;
  public states: any;
  public isToggled: boolean = false;
  public stateDisabled: boolean = false;
  public physicalStateDisabled: boolean = false;
  // public getCountryName: string;
  private selectCountryOptions: any;
  private selectStateOptions: any;
  // private mailingAddressData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private fb: FormBuilder, private contactInfoProvider: ContactInformationProvider) {
    this.mailingAddress = new MailingAddress('', '', '', '', '', '', '', '', '', '', '', '', '');

    this.mailingForm = this.fb.group({
      'mailingAddressForm': this.fb.group({
        'mailingAddress1': ['', Validators.compose([Validators.required, Validators.maxLength(26), Validators.pattern(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/)])],
        'mailingAddress2': ['', Validators.compose([Validators.maxLength(26), Validators.pattern(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/)])],
        'mailingCity': ['', Validators.compose([Validators.required, Validators.maxLength(26), Validators.pattern(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/)])],
        'mailingState': ['',],
        'mailingZip': ['',],
        'mailingCountry': ['',]
      }),
      'physicalAddressForm': this.fb.group({
        'physicalAddress1': ['', Validators.compose([Validators.required, Validators.maxLength(26), Validators.pattern(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/)])],
        'physicalAddress2': ['', Validators.compose([Validators.maxLength(26), Validators.pattern(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/)])],
        'physicalCity': ['', Validators.compose([Validators.required, Validators.maxLength(26), Validators.pattern(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/)])],
        'physicalState': ['',],
        'physicalZip': ['',],
        'physicalCountry': ['',]
      })
    });

    this.getCountries();
    this.getStates();

    this.selectCountryOptions = {
      title: 'Select Country'
    };
    this.selectStateOptions = {
      title: 'Select State'
    };
  }

  notify(ev) {
    this.isToggled = ev.checked;
  }

  ionViewDidLoad() {
    console.log('in View Loaded');
    this.getMailingAddress();
    // If there is a physical address, show the second form
    if (this.mailingAddress.physicalAddress1 != '') {
      this.notify({checked: true});
    }
    if (this.mailingAddress.mailingCountry != '') {
      this.stateDisabled = true;
    }
    else {
      this.mailingForm.get('mailingAddressForm').get('mailingState').setValidators([Validators.required]);
      this.mailingForm.get('mailingAddressForm').get('mailingZip').setValidators([Validators.required, ZipCodeValidator.isValid]);
      this.mailingForm.get('mailingAddressForm').get('mailingZip').updateValueAndValidity();
    }
    if (this.mailingAddress.physicalCountry != '') {
      this.physicalStateDisabled = true;
    }
    else {
      this.mailingForm.get('physicalAddressForm').get('physicalState').setValidators([Validators.required]);
      this.mailingForm.get('physicalAddressForm').get('physicalZip').setValidators([Validators.required, ZipCodeValidator.isValid]);
      this.mailingForm.get('physicalAddressForm').get('physicalZip').updateValueAndValidity();
    }
  }

  getMailingAddress(){
    let mailingAddressData = this.navParams.get('mailingAdr');
    console.log('Contact mail address received', mailingAddressData);
    this.mailingAddress.mailingAddress1 = mailingAddressData.mailingAddress1 !== null ? mailingAddressData.mailingAddress1 : '';
    this.mailingAddress.mailingAddress2 = mailingAddressData.mailingAddress2 !== null ? mailingAddressData.mailingAddress2 : '';
    this.mailingAddress.mailingCity = mailingAddressData.mailingCity !== null ? mailingAddressData.mailingCity : '';
    this.mailingAddress.mailingState = mailingAddressData.mailingState !== null ? mailingAddressData.mailingState : '';
    this.mailingAddress.mailingZip = mailingAddressData.mailingZip !== null ? mailingAddressData.mailingZip : '';
    this.mailingAddress.mailingCountry = mailingAddressData.mailingCountry !== null ? mailingAddressData.mailingCountry : '';
    this.mailingAddress.physicalAddress1 = mailingAddressData.physicalAddress1 !== null ? mailingAddressData.physicalAddress1 : '';
    this.mailingAddress.physicalAddress2 = mailingAddressData.physicalAddress2 !== null ? mailingAddressData.physicalAddress2 : '';
    this.mailingAddress.physicalCity = mailingAddressData.physicalCity !== null ? mailingAddressData.physicalCity : '';
    this.mailingAddress.physicalState = mailingAddressData.physicalState !== null ? mailingAddressData.physicalState : '';
    this.mailingAddress.physicalZip = mailingAddressData.physicalZip !== null ? mailingAddressData.physicalZip : '';
    this.mailingAddress.physicalCountry = mailingAddressData.physicalCountry !== null ? mailingAddressData.physicalCountry : '';
  }

  getCountries() {
    // this.countryStateProvider.getCountries().subscribe(
    this.contactInfoProvider.getCountries().subscribe(
      result => {
        this.countries = result;
      },
      err => {
        console.error('Error', err);
      },
      () => {
        //this.loading.dismiss();
        console.log('getCountries completed');
      })
  }

  getStates() {
    // this.countryStateProvider.getStates().subscribe(
    this.contactInfoProvider.getUSStates().subscribe(
      result => {
        this.states = result;
      },
      err => {
        console.error('Error', err);
      },
      () => {
        //this.loading.dismiss();
        console.log('getStates completed');
      })
  }

  changeCountry(country){
    if (country != '') {
      // this.mailingForm.get('mailingAddressForm').get('mailingState').setValue('');
      // this.mailingForm.get('mailingAddressForm').get('mailingZip').setValue('');
      this.mailingAddress.mailingState = '';
      this.mailingAddress.mailingZip = '';
      this.mailingForm.get('mailingAddressForm').get('mailingState').setValidators([]);
      this.mailingForm.get('mailingAddressForm').get('mailingZip').setValidators([]);
      this.stateDisabled = true;
    }
    else { // empty stands for US
      this.mailingForm.get('mailingAddressForm').get('mailingState').setValidators([Validators.required]);
      this.mailingForm.get('mailingAddressForm').get('mailingZip').setValidators([Validators.required, Validators.maxLength(10), Validators.pattern(/^\d{5}(-\d{4})?$/)]);
      this.stateDisabled = false;
    }
    this.mailingForm.get('mailingAddressForm').get('mailingState').updateValueAndValidity();
    this.mailingForm.get('mailingAddressForm').get('mailingZip').updateValueAndValidity();
  }

  changePhysicalCountry(physicalCountry) {
    if (physicalCountry != '') {
      // this.mailingForm.get('physicalAddressForm').get('physicalState').setValue('');
      // this.mailingForm.get('physicalAddressForm').get('physicalZip').setValue('');
      this.mailingAddress.physicalState = '';
      this.mailingAddress.physicalZip = '';
      this.mailingForm.get('physicalAddressForm').get('physicalState').setValidators([]);
      this.mailingForm.get('physicalAddressForm').get('physicalZip').setValidators([]);
      this.physicalStateDisabled = true;
    }
    else { // empty stands for US
      this.mailingForm.get('physicalAddressForm').get('physicalState').setValidators([Validators.required]);
      this.mailingForm.get('physicalAddressForm').get('physicalZip').setValidators([Validators.required, Validators.maxLength(10), Validators.pattern(/^\d{5}(-\d{4})?$/)]);
      this.physicalStateDisabled = false;
    }
    this.mailingForm.get('physicalAddressForm').get('physicalState').updateValueAndValidity();
    this.mailingForm.get('physicalAddressForm').get('physicalZip').updateValueAndValidity();
  }

  /*submit form data  */
  submitUpdateMailingAddress() { //formdata
    let submitData = {
      'mailingAddress1': this.mailingAddress.mailingAddress1,//formdata.mailingAddressForm.mailingAddress1,
      'mailingAddress2': this.mailingAddress.mailingAddress2,//formdata.mailingAddressForm.mailingAddress2,
      'mailingCity': this.mailingAddress.mailingCity,//formdata.mailingAddressForm.mailingCity,
      'mailingState': this.mailingAddress.mailingState,//formdata.mailingAddressForm.mailingState,
      'mailingZip': this.mailingAddress.mailingZip != null ? this.mailingAddress.mailingZip.replace(/[^0-9]/g, ''):this.mailingAddress.mailingZip,//formdata.mailingAddressForm.mailingZip,
      'mailingCountry': this.mailingAddress.mailingCountry,//formdata.mailingAddressForm.mailingCountry,// === 'US' ? "" : formdata.mailingAddressForm.mailingCountry,
      'physicalAddress1': this.mailingAddress.physicalAddress1,//formdata.physicalAddressForm.physicalAddress1,
      'physicalAddress2': this.mailingAddress.physicalAddress2,//formdata.physicalAddressForm.physicalAddress2,
      'physicalCity': this.mailingAddress.physicalCity,//formdata.physicalAddressForm.physicalCity,
      'physicalState': this.mailingAddress.physicalState,//formdata.physicalAddressForm.physicalState,
      'physicalZip': this.mailingAddress.physicalZip != null ? this.mailingAddress.mailingZip.replace(/[^0-9]/g, ''):this.mailingAddress.mailingZip,//formdata.physicalAddressForm.physicalZip,
      'physicalCountry': this.mailingAddress.physicalCountry,//formdata.physicalAddressForm.physicalCountry,// === 'US' ? "" : formdata.physicalAddressForm.physicalCountry,
      'token': null
    }
    console.log('Contact mail address submitted', submitData);
    //formdata.mailingAddressForm
    this.navCtrl.push(SecurityPage, {
      page: 'UpdateMailingAddressPage',
      payload: submitData
    });
  }

  // onSelectClicked($event : any){
  //   console.log($event.detail);
  //   // setTimeout(() => {
  //     if ($event.detail === 0) {
  //       $event.preventDefault();
  //       $event.currentTarget.blur()
  //       // $event.stopPropagation();
  //       // return false;
  //       window.focus();
  //     }
  //   // }, 1000);
  // }

  ngOnInit() {
    // this.getMailingAddress();
  }

  popView() {
    this.navCtrl.pop();
  }
}
