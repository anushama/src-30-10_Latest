import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
// import { PhoneNumValidator } from "../../../validators/phone";
import { BillpayAddEditPayeePage } from '../billpay-add-edit-payee/billpay-add-edit-payee';

/**
 * Generated class for the AddPayeePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-add-payee',
    templateUrl: 'add-payee.html',
})
export class AddPayeePage {
    payees: any;
    showList: boolean = false;
    
    // private addPayeeForm: FormGroup;
    // searchQuery: string = '';
    // public recipientName: any;
    // public selectedIndex: number;
    // public enableDisableFields: boolean = false;
    // private selectStateOptions: any;
    // public states: any;
    // public stateDisabled: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        // ,
        // private formBuilder: FormBuilder) {
        // this.addPayeeForm = new FormGroup({
        //     //recipientName: new FormControl('', [Validators.required]),
        //     selectedRecipientName: new FormControl('', [Validators.required]),
        //     selectedRecipientNickName: new FormControl('', [Validators.required]),
        //     selectedRecipientAccountNumber: new FormControl('', [Validators.required]),
        //     selectedRecipientAddress: new FormControl('', [Validators.required]),
        //     selectedRecipientCity: new FormControl('', [Validators.required]),
        //     selectedRecipientState: new FormControl('', [Validators.required]),
        //     selectedRecipientZipcode: new FormControl('', [Validators.required]),
        //     selectedRecipientPhoneNumber: new FormControl('', [Validators.required, PhoneNumValidator.isValid])
        // });
        // this.selectStateOptions = {
        //     title: 'Select State',
        //     mode: 'md'
        // };
        this.initializepayees();
        // this.stateDisabled = true;
    }

    initializepayees() {
        this.payees = [
            {
                name:           'Joe',
                nickname:       '',
                accountnumber:  '',
                addressLine1:   'Joe Ave',
                addressLine2:   '',
                city:           '',
                state:          '',
                zipCode:        '',
                phoneNumber:    ''                        
            },
            {
                name:           'Joe\'s pizza',
                nickname:       '',
                accountnumber:  '',
                addressLine1:   'Joe\'s pizza Lane',
                addressLine2:   '',
                city:           '',
                state:          '',
                zipCode:        '',
                phoneNumber:    ''                        
            },
            {
                name:           'Joel and Sons Moving',
                nickname:       '',
                accountnumber:  '',
                addressLine1:   'Joel and Sons Moving Drive',
                addressLine2:   '',
                city:           '',
                state:          '',
                zipCode:        '',
                phoneNumber:    ''                        
            },
            {
                name:           'Joe Financing',
                nickname:       '',
                accountnumber:  '',
                addressLine1:   'Joe Financing Road',
                addressLine2:   '',
                city:           '',
                state:          '',
                zipCode:        '',
                phoneNumber:    ''                        
            },
            {
                name:           'Repairs by Joseph',
                nickname:       '',
                accountnumber:  '',
                addressLine1:   'Repairs by Joseph Hall',
                addressLine2:   '',
                city:           '',
                state:          '',
                zipCode:        '',
                phoneNumber:    ''                        
            },
            {
                name:           'Ram Communications',
                nickname:       '',
                accountnumber:  '',
                addressLine1:   'Ram Communications Street',
                addressLine2:   '',
                city:           '',
                state:          '',
                zipCode:        '',
                phoneNumber:    ''                        
            }
        ];
    }

    payee() {
        return {
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
        }};


    getPayees(ev: any) {
        // Reset payees back to all of the payees
        this.initializepayees();
        // set val to the value of the searchbar
        let val = ev.target.value;
        console.log(val);
        // if the value is an empty string don't filter the payees
        if (val && (val.trim() != '') && (val.length > 2)) {
            // Filter the payees
            this.payees = this.payees.filter((item) => {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
            let targetPayee = this.payee();
            targetPayee.name = val;
            this.payees.unshift(targetPayee);
            this.showList = true;
        } else {
            this.showList = false;
        }
    }

    selectedPayee(index) {
        this.launchPayeeForm(this.payees[index]);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddPayeePage');
    }

    createSelectedPayee(selectedPayeeName) {
        this.launchPayeeForm(selectedPayeeName);
    }

    launchPayeeForm(payeeData) {
        this.navCtrl.push(BillpayAddEditPayeePage, {payee: payeeData, newPayee: true});        
    }
}
