import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Utility } from '../core/utility';
import { ErrorMessages } from "../../config/global-config";
import { FormGroup, FormBuilder, Validators} from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-deposit-amount',
  templateUrl: 'deposit-amount.html',
})


export class DepositAmountPage {
  private amount: string;
  public dayTimeNum: number;
  public pageFrom: any;
  public pageTitle: any;
  amountForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private fb: FormBuilder, public viewCtrl: ViewController, private util: Utility) {
    this.pageFrom = navParams.get('pageFrom');
    this.pageTitle = navParams.get('pageTitle');
    this.amount = navParams.get('amount')!= undefined ? navParams.get('amount') : '';
    this.amountForm = fb.group({
      depositAmount: ['', [Validators.required]]
    })
  }

  ionViewDidLoad() {
    // Adobe Analytics page tracking
    //this.utility.trackPage('DepositAmountPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  openModalWithParams() {
    let data = this.amountForm.controls.depositAmount.value.replace(/[^0-9]/g, '');
    console.log(data);
    if (this.pageFrom == "deposit") {
      if (data != null && data > 500000) {
        this.util.showAlert(ErrorMessages.ERROR, "", ErrorMessages.DEPOSIT_AMOUNT_LIMIT, ErrorMessages.BUTTON_OK);
      } else if (data <= 0) {
        this.util.showAlert(ErrorMessages.ERROR, "", ErrorMessages.ZERO_INPUT, ErrorMessages.BUTTON_OK);
        // this.util.showAlert(ErrorMessages.ERROR, "", ErrorMessages.DEPOSIT_AMOUNT_LIMIT, ErrorMessages.BUTTON_OK);
      } else {
        this.viewCtrl.dismiss(data);
      }
    } else if (this.pageFrom == "transfer") {
      if (data == 0) {
        this.util.showAlert(ErrorMessages.ERROR, "", ErrorMessages.ZERO_INPUT, ErrorMessages.BUTTON_OK);
        // this.util.showAlert(ErrorMessages.ERROR, "", ErrorMessages.DEPOSIT_AMOUNT_LIMIT, ErrorMessages.BUTTON_OK);
      } else {
        this.viewCtrl.dismiss(data);
      }
    } else if (this.pageFrom == "payment"){
      if (data == 0) {
        this.util.showAlert(ErrorMessages.ERROR, "", ErrorMessages.ZERO_INPUT, ErrorMessages.BUTTON_OK);
        // this.util.showAlert(ErrorMessages.ERROR, "", ErrorMessages.DEPOSIT_AMOUNT_LIMIT, ErrorMessages.BUTTON_OK);
      } else {
        this.viewCtrl.dismiss(data);
      }
    }
  }


  // numberKeyed(val, element) {
  //   var x = val.replace(/\D/ig, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,6})/);
  //   if (x[0].length == 10) {
  //     element.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
  //   } else {
  //     element.value = x[0];
  //   }
  // }
  //
  // setFormatNumber(val) {
  //   var formatNumber;
  //   var x = val.replace(/\D/ig, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,6})/);
  //   if (x[0].length == 10) {
  //     formatNumber = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
  //   } else {
  //     formatNumber = x[0];
  //   }
  //   return formatNumber;
  // }


}
