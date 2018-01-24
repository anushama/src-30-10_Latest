import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { BillpaySortFiltersPage } from '../../pages/billpay-sort-filters/billpay-sort-filters';

import { BillpayPayBillPage } from '../../pages/billpay-pay-bill/billpay-pay-bill';
import { BillpayReviewPaymentPage } from '../../pages/billpay-review-payment/billpay-review-payment';
import { BillpayPaymentScheduledPage } from '../../pages/billpay-payment-scheduled/billpay-payment-scheduled';
import { BillpayPaymentAmountPage } from '../../pages/billpay-payment-amount/billpay-payment-amount';
import { BillpaySelectPaymentFrequencyPage } from '../../pages/billpay-select-payment-frequency/billpay-select-payment-frequency';

import { BillpayAddEditPayeePage } from '../../pages/billpay-add-edit-payee/billpay-add-edit-payee';
import { BillpayPayToAccountPage } from '../../pages/billpay-pay-to-account/billpay-pay-to-account';

import { AddPayeePage } from '../../pages/add-payee/add-payee';

/**
 * Generated class for the BillpayDevUiIndexPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 
@IonicPage()
@Component({
  selector: 'page-billpay-dev-ui-index',
  templateUrl: 'billpay-dev-ui-index.html',
})
export class BillpayDevUiIndexPage {
    public freqSelected = 'One-Time';
    public payToAccountSelected = '2222';

    constructor(public navCtrl: NavController, public navParams: NavParams,
                public modalCtrl: ModalController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BillpayDevUiIndexPage');
    }

    sortFromHistory() {
        this.navCtrl.push(BillpaySortFiltersPage, {viewOptions: 'hiddenPayees, eBills, status'});
    }

    sortFromPayees() {
        this.navCtrl.push(BillpaySortFiltersPage, {viewOptions: 'hiddenPayees, eBills'});
    }



    payBill() {
        this.navCtrl.push(BillpayPayBillPage);
    }

    setPaymentAmount(minimunAmount, dueAmount) {
        let paymentAmtModal = this.modalCtrl.create(BillpayPaymentAmountPage, 
            { 
                minAmount: minimunAmount,
                dueAmount: dueAmount,
                paymentAmt: 0
            }
        );

        paymentAmtModal.onDidDismiss(paymentAmt => {
            alert("selection was " + (paymentAmt ? paymentAmt : "NOTHING - CANCELLED"));
        });

        paymentAmtModal.present();
    }

    setFrequency() {
        let selectFreqModal = this.modalCtrl.create(BillpaySelectPaymentFrequencyPage, { frequency: this.freqSelected });

        selectFreqModal.onDidDismiss(selectedFrequency => {
            if (selectedFrequency) {
                this.freqSelected = selectedFrequency;
            }
            alert("selection was " + (selectedFrequency ? selectedFrequency : "NOTHING - CANCELLED"));
        });
        selectFreqModal.present();
    }

    reviewPayment() {
        this.navCtrl.push(BillpayReviewPaymentPage);
    }

    addPayee() {
        this.navCtrl.push(AddPayeePage);
    }






    paymentScheduled() {
        this.navCtrl.push(BillpayPaymentScheduledPage);
    }

    addEditPayee() {
        this.navCtrl.push(BillpayAddEditPayeePage, {payee: null});
    }

    editPayee(businessFlg) {
        let payee = {
            business: businessFlg,
            name: 'name',
            nickname: 'nickname',
            accountnumber: '123456789',
            addressLine1: '123 Main Ave',
            addressLine2: 'Suite 3a',
            city: 'Reston',
            state: 'VA',
            zipCode: '72018',
            phoneNumber: '(777) 111-2345'
        };

        this.navCtrl.push(BillpayAddEditPayeePage, {payee: payee});
    }

    payToAccount() {
        // let selectPayToAccountModal = this.modalCtrl.create(BillpayPayToAccountPage, { accntNumber: this.payToAccountSelected });
        let selectPayToAccountModal = this.modalCtrl.create(BillpayPayToAccountPage);

        selectPayToAccountModal.onDidDismiss(selectedAccnt => {
            if (selectedAccnt) {
                this.payToAccountSelected = selectedAccnt;
            }
            alert("selection was " + (selectedAccnt ? selectedAccnt : "NOTHING - CANCELLED"));
        });
        selectPayToAccountModal.present();
    }

}
