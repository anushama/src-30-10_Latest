import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the BillpayPayToAccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()

@Component({
  selector: 'page-billpay-pay-to-account',
  templateUrl: 'billpay-pay-to-account.html',
})

export class BillpayPayToAccountPage {

    public currentSelection = '1111';
    
    public accounts =   [
                            {
                                fullName:   'acc-Name 1',
                                last4:      '1111'
                            },
                            {
                                fullName:   'acc-Name 2',
                                last4:      '2222'
                            },
                            {
                                fullName:   'acc-Name 3',
                                last4:      '3333'
                            },
                            {
                                fullName:   'acc-Name 4',
                                last4:      '4444'
                            }
                        ];

    constructor(private viewCntrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
        if (this.navParams.data.frequency) {
            this.currentSelection = this.navParams.data.accntNumber;
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BillpayPayToAccountPage');
    }

    closeModal() {
        this.viewCntrl.dismiss();
    }

    addPayee() {
        this.viewCntrl.dismiss(this.currentSelection);
    }

    selectedAccount(accntNumber) {
        this.currentSelection = accntNumber;
    }

}
