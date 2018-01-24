import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utility } from "../../../pages/core/utility";
import { AddExtAcctProvider } from '../../providers/add-ext-acct';
import { ErrorMessages } from "../../../config/global-config";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-add-external-acct',
  templateUrl: 'add-external-acct.html',
})
export class AddExternalAcctPage {
  public acctnickname: any;
  public acctnumber: any;
  public routnumber: any;
  public type: any;
  addExtAcctForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private util: Utility, public addExtAcct: AddExtAcctProvider, private fb: FormBuilder) {
    this.type = 'CHECKING';
    this.createForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddExternalAcctPage');
  }
  createForm() {
    this.addExtAcctForm = this.fb.group({
      nickname: ['', Validators.required ],
      acctnumber:['', Validators.required ],
      routnumber:['', Validators.required ]
    });
  }

  helpDirection() {
    this.util.showAlert(ErrorMessages.BANK_ROUTING_NUMBER, "", ErrorMessages.BANK_ROUTING_NUMBER_DETAIL, ErrorMessages.BUTTON_OK)
  }

  confirm() {
    let accountType;
    this.addExtAcctForm.value.nickname;
    this.addExtAcctForm.value.routnumber;
    this.addExtAcctForm.value.acctnumber;
    (this.type == 'CHECKING') ? accountType = "DDA" : accountType = "RSV";
    let data = {
      accountNumber: this.addExtAcctForm.value.nickname,
      accountType: accountType,
      bankRoutingNumber: this.addExtAcctForm.value.routnumber
    }
    this.addExtAcct.externalAcctVerify(data).subscribe((res: any) => {
      //console.log(JSON.parse(res));
      console.log(res);
      let response = JSON.parse(JSON.stringify(res || null))
      console.log(response);
      console.log(response._body);
      if (response._body == 'BADROUTING') {
        this.util.showAlert(ErrorMessages.POPUP_TTILE, "", ErrorMessages.ROUTING_NUM_NOT_VALID, ErrorMessages.BUTTON_OK)
      } else {
        let passData = {
          institution: response._body,
          accountNumber: this.addExtAcctForm.value.acctnumber,
          accountType: this.type,
          acctNickname: this.addExtAcctForm.value.nickname,
          routnumber: this.addExtAcctForm.value.routnumber
        }
        this.navCtrl.push('ConfirmExtAcctPage', { data: passData })
      }
    }), error => {
      console.log(error);
    }
  }
}
