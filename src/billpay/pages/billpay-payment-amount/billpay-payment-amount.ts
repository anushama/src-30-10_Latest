import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Utility } from '../../../pages/core/utility';
import { ErrorMessages } from "../../config/global-config";
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

/**
 * Generated class for the BillpayPaymentAmountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-billpay-payment-amount',
    templateUrl: 'billpay-payment-amount.html',
})
export class BillpayPaymentAmountPage {

    public dueAmount  = 0;
    public minAmount  = 0;
    public paymentAmt = 0;

    amountForm: FormGroup;
    
    constructor(private viewCntrl: ViewController,
                public navCtrl: NavController,      public navParams: NavParams, 
                private formBuilder: FormBuilder,   private util: Utility) {

        this.amountForm = formBuilder.group({ paymentAmount: ['', [Validators.required]] });

        this.minAmount  = this.navParams.data.minAmount  ? this.navParams.data.minAmount : 0;
        this.dueAmount  = this.navParams.data.dueAmount  ? this.navParams.data.dueAmount : 0;
        this.paymentAmt = this.navParams.data.paymentAmt ? this.navParams.data.paymentAmt : 0;

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BillpayPaymentAmountPage');
    }

    closeModal() {
        this.viewCntrl.dismiss();
    }

    donePaymentAmount() {
        this.viewCntrl.dismiss(this.amountForm.controls.paymentAmount.value);
        console.log("Amount: ", this.amountForm.controls.paymentAmount.value);    
    }
}

/*

    constructor(private viewCntrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
        if (this.navParams.data.frequency) {
           this.currentSelection = this.navParams.data.frequency;
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BillpaySelectPaymentFrequencyPage');
    }

    selectedFrequency(freqType) {
        this.viewCntrl.dismiss(freqType);
        console.log("Frequency: ", freqType);    
    }*/
