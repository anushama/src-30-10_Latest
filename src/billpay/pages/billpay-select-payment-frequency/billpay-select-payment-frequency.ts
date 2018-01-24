import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';

/**
 * Generated class for the BillpaySelectPaymentFrequencyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()

@Component({
  selector: 'page-billpay-select-payment-frequency',
  templateUrl: 'billpay-select-payment-frequency.html',
})

export class BillpaySelectPaymentFrequencyPage {
    public currentSelection: string = 'One-Time';

    public frequencies =    [
                                {label:   'One-Time',         value: 'One-Time'}, 
                                {label:   'Weekly',           value: 'Weekly'},
                                {label:   'Every 2 Weeks',    value: 'Every-2-Weeks'},
                                {label:   'Twice a month',    value: 'Twice-a-month'},
                                {label:   'Every 4 weeks',    value: 'Every-4-weeks'},
                                {label:   'Monthly',          value: 'Monthly'},
                                {label:   'Every 2 Months',   value: 'Every-2-Months'},
                                {label:   'Quarterly',        value: 'Quarterly'},
                                {label:   'Semi-Annually',    value: 'Semi-Annually'},
                                {label:   'Annually',         value: 'Annually'}
                            ];

    constructor(private viewCntrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
        if (this.navParams.data.frequency) {
           this.currentSelection = this.navParams.data.frequency;
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BillpaySelectPaymentFrequencyPage');
    }

    closeModal() {
        this.viewCntrl.dismiss();
    }

    selectedFrequency(freqType) {
        this.viewCntrl.dismiss(freqType);
        console.log("Frequency: ", freqType);    
    }
}
