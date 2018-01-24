import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { ContactInfoPage } from '../contact-info/contact-info';
import { Http} from '@angular/http';
import { ContactInformationProvider } from '../../providers/contact-information/contact-information';
import { UpdatePhonenumberServiceProvider } from '../../providers/update-phonenumber-service/update-phonenumber-service';
import { SecurityPage } from '../security/security';
//import { ContactNumberComponent } from './phoneData';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { PhoneNumValidator } from "../../validators/phone";
import { ErrorMessages } from '../../config/global-config';
import { Utility } from "../core/utility";


@IonicPage()
@Component({
  selector: 'page-update-phone-num',
  templateUrl: 'update-phone-num.html',
  providers: [ContactInformationProvider,UpdatePhonenumberServiceProvider]
})
export class UpdatePhoneNumPage {

  public dayTimePhoneNumber: any = "";
  public eveningNumber: any = "";
  public cellNumber: any = "";
  public dayTimeNum: any = "";
  public eveningNum: any = "";
  public cellNum: any = "";
  public emailAddress: any;
  public userName: string;
  public updateNumberValid: boolean;
  public loading: any;


  user: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public phoneNumberService: ContactInformationProvider, public updatePhoneNumber: UpdatePhonenumberServiceProvider, private fb: FormBuilder, public utility: Utility) {
    this.user = fb.group({
      daynumber: ['', [Validators.required, PhoneNumValidator.isValid]],
      eveningnumber: ['', [PhoneNumValidator.isValid]],
      cellnumber: ['', [PhoneNumValidator.isValid]]
    })
  }

  popView() {
    this.navCtrl.pop();
  }
  ngOnInit() {

     this.phoneNumberService.getContactInfo()
      .subscribe(res => {
        let result = res.json();
        this.dayTimePhoneNumber = result.dayTimePhone;
        this.eveningNumber = result.eveningPhone;
        this.cellNumber = result.cellPhone;
        if (this.dayTimePhoneNumber != null) {
          this.dayTimeNum = this.setFormatNumber(this.dayTimePhoneNumber);
        }
        if (this.eveningNumber != null) {
          this.eveningNum = this.setFormatNumber(this.eveningNumber);
        }
        if (this.cellNumber != null) {
          this.cellNum = this.setFormatNumber(this.cellNumber);
        }
      }, error => {
        console.log(error);
      })
  }
  goContactInfoPage(){
    if(this.dayTimeNum == "" && this.eveningNum == "" && this.cellNum == ""){
      this.utility.showAlert(ErrorMessages.ERROR, '', ErrorMessages.ATLEAST_ONE_PHONE_NUM, ErrorMessages.BUTTON_OK);      
    }else{
      this.navCtrl.push(SecurityPage,{
        daynumber:this.dayTimeNum,
        eveningnumber:this.eveningNum,
        cellnumber:this.cellNum,
        page:'UpdateContactNumberPage'
      })
    }
  }

  numberKeyed(val, element) {
    var x = val.replace(/\D/ig, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,6})/);
    if (x[0].length == 10) {
      element.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    } else {
      element.value = x[0];
    }
  }

  setFormatNumber(val) {
    var formatNumber;
    var x = val.replace(/\D/ig, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,6})/);
    if (x[0].length == 10) {
      formatNumber = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    } else {
      formatNumber = x[0];
    }
    return formatNumber;
  }

}
