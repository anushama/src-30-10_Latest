import { Component } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SelectAccountComponent } from '../transfers/select-account';
import { BillpayReviewPaymentPage } from '../billpay-review-payment/billpay-review-payment';
import { BillpayPaymentAmountPage } from '../billpay-payment-amount/billpay-payment-amount';
import { BillpaySelectPaymentFrequencyPage } from '../billpay-select-payment-frequency/billpay-select-payment-frequency';

/**
 * Generated class for the BillpayPayBillPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()

@Component({
    selector: 'page-billpay-pay-bill',
    templateUrl: 'billpay-pay-bill.html',
    providers: [DatePicker]
})

export class BillpayPayBillPage {
    public fromAccount =    {
            "availableBal": 778332,
            "ableToRemoteDeposit": true,
            "accountNum": "1663639035",
            "routingNumber": "2560-7844-6",
            "numLast4": "9035",
            "fullName": "Money Market Savings",
            "nickname": null,
            "currentBal": 778332,
            "asOfDate": "10/26/2017",
            "acctType": "DD3",
            "parentAcctType": "CHECKING_SAVING",
            "showAccount": true,
            "accountMask": "113f9746-19dd-4b32-a50f-64b6d697b585"
        }  

    public item = {
        payAccount: {
                        fullName:       'State Farm Insurance',
                        nickname:       '',
                        accountMask:    '',
                        parentAcctType: '',
                        numLast4:       '1234',
                        availableBal:   0
                    },
        payDate:        new Date('6/14/17'),
        payAmount:      325.5,
        frequency:      'One-Time',
        monthlyFreq:    0
    };

    public payBillForm: FormGroup;
    
    public myDate: any;

    constructor(public navCtrl: NavController,      public navParams: NavParams,
                public modalCtrl: ModalController,  public datePicker: DatePicker) {

        // this.payBillForm = new FormGroup({
        //     // monthlyFreq:      new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(32)])),
        //     payeeName:      new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(32)])),
            
        // });
                        
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BillpayPayBillPage');
    }

    reviewPayment() {
        this.navCtrl.push(BillpayReviewPaymentPage);
    }


    // setPayTo(item) {
    //     alert('Not yet implemented');
    // }

    setPayTo() {
        let selectAcctModal;
        if (this.item.payAccount) {
          selectAcctModal = this.modalCtrl.create("AccountToTransferFromPage", { numLast4: this.item.payAccount.numLast4 });
        } else {
          selectAcctModal = this.modalCtrl.create("AccountToTransferFromPage");
        }
        selectAcctModal.onDidDismiss(selectedAccount => {
          if (selectedAccount !== undefined && selectedAccount !== null) {
            this.fromAccount = selectedAccount;
          }
        })
        selectAcctModal.present();
      }
    
      setPaymentAmount() {
        let paymentAmtModal = this.modalCtrl.create(BillpayPaymentAmountPage);

        paymentAmtModal.onDidDismiss(paymentAmt => {
            if (paymentAmt) {
                this.item.payAmount = paymentAmt;
            }
            // alert("selection was " + (paymentAmt ? paymentAmt : "NOTHING - CANCELLED"));
        });

        paymentAmtModal.present();
    }


    isMonthly() {
        return (this.item.frequency.toUpperCase() === 'MONTHLY');
    }
    // setFrequency(item) {
    //     this.navCtrl.push(BillpaySelectPaymentFrequencyPage, {frequency: 'Annually'});
    // }

    setFrequency() {
        let selectFreqModal = this.modalCtrl.create(BillpaySelectPaymentFrequencyPage, { frequency: this.item.frequency });

        selectFreqModal.onDidDismiss(selectedFrequency => {
            if (selectedFrequency) {
                this.item.frequency = selectedFrequency;
            }
        });
        selectFreqModal.present();
      }
    
    // showCalendar(item) {
    //     alert('Not yet implemented');
    // }

    showCalendar() {
        let MDate = this.isMonthly() ? new Date(new Date().getTime() + (24 * 60 * 60 * 1000)) : new Date().getTime();
        console.log(MDate);
        this.datePicker.show({
            date: new Date(),
            mode: 'date',
            minDate: MDate,
            allowOldDates: false,
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
        }).then(
            date => {
                        date != null ? this.item.payDate = date : this.isMonthly() 
                                ? this.item.payDate = new Date(new Date().getTime() + (24 * 60 * 60 * 1000)) : this.myDate = new Date().getTime();
                    },
            err => console.log('Error occurred while getting date: ', err)
            );
        }



        
}
