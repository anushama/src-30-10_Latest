import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PhoneNumValidator } from '../../../validators/phone';

/**
 * Generated class for the BillpayAddEditPayeePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-billpay-add-edit-payee',
  templateUrl: 'billpay-add-edit-payee.html',
})

export class BillpayAddEditPayeePage {
    public title        = 'Add';
    public caption      = 'new ';
    public disabledFld  = false;

    public payeeForm: FormGroup;

    public payee = {
        business:       false,
        name:           '',
        nickname:       '',
        accountnumber:  '',
        addressLine1:   '',
        addressLine2:   '',
        city:           '',
        state:          '',
        zipCode:        '',
        phoneNumber:    ''
    };

    constructor(public navCtrl: NavController, public navParams: NavParams, 
                public formBuilder: FormBuilder) {
        if (this.navParams.data.payee && (this.navParams.data.payee !== null)) {
            this.payee = this.navParams.data.payee;

            if (this.navParams.data.payee.business){
                this.disabledFld = this.navParams.data.payee.business;
            }

            if ((this.navParams.data.hasOwnProperty('newPayee') && !this.navParams.data.newPayee) || 
                    !this.navParams.data.hasOwnProperty('newPayee')) {
                this.title   = 'Edit';
                this.caption = '';
            }
        }

        this.payeeForm = new FormGroup({
            payeeName:      new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(32)])),
            nickname:       new FormControl('', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(32)])),
            accountnumber:  new FormControl('', Validators.compose([Validators.maxLength(32)])),
            addressline1:   new FormControl('', Validators.compose([Validators.required, Validators.maxLength(32)])),
            addressline2:   new FormControl('', Validators.compose([Validators.maxLength(32)])),
            city:           new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
            state:          new FormControl('', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])),
            zipcode:        new FormControl('', Validators.compose([Validators.maxLength(10)])),
            phonenumber:    new FormControl('', Validators.compose([PhoneNumValidator.isValid]))
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BillpayAddEditPayeePage');
    }


    savePayee() {
        alert('Not yet available');
    }
}
