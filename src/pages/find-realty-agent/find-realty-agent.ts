import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { RealtyAgent } from './realty-agent';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ContactInformationProvider } from '../../providers/contact-information/contact-information';
import { FindRealtyAgentProvider } from '../../providers/find-realty-agent/find-realty-agent';
import { Utility } from '../core/utility';
import { AfbaDisclosurePage } from '../../pages/afba-disclosure/afba-disclosure';
import { PhoneNumValidator } from "../../validators/phone";
import { SessionManager } from '../core/session-manager';

@IonicPage()
@Component({
  selector: 'page-find-realty-agent',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  templateUrl: 'find-realty-agent.html',
})
export class FindRealtyAgentPage {

  private realtyAgentForm: FormGroup;
  public realtyAgent: RealtyAgent;
  public isToggled: boolean = false;
  public states: any;
  public statesList = [];
  public location: any;
  public filteredStates: any;
  public filteredStatesList = [];
  public filteredPropertyLocationsList = [];
  public elementRef;
  public realtyAgentData: any;
  private selectStateOptions: any;
  public phoneNumber: any;
  private loading: any;

  regex: RegExp;
  @ViewChild(Content) content: Content;
  constructor(myElement: ElementRef, public navCtrl: NavController,
    private contactInfoProvider: ContactInformationProvider, private realtyAgentProvider: FindRealtyAgentProvider,
    public navParams: NavParams, private fb: FormBuilder, private utility: Utility,
    private sessionManager: SessionManager) {
    this.realtyAgent = new RealtyAgent('', '', '', '', '', '', '', '', '');
    this.regex = new RegExp('[a-zA-Z0-9]');
    this.elementRef = myElement;

    // Refrence to reactive form elements
    this.realtyAgentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, PhoneNumValidator.isValid]],
      email: ['', [Validators.required]],
      location: ['', [Validators.required]],
      type: ['',],
      withAgent: ['',],
      buying: [false,],
      selling: [false,]
    });
    this.selectStateOptions = {
      title: 'Select State'
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindRealtyAgentPage');
    this.utility.trackPage('FindRealtyAgentPage');
    this.getStates()
      .then(res => {
        console.log(res);
        // Populate states
        this.states = res;
        for (let i = 0; i < this.states.length; i++) {
          this.statesList.push(this.states[i].value);
        }
        if (this.sessionManager.isLoggedIn) {
          this.getRealtyAgentInfo()
            .then(res => {
              // Realty agent info
              this.realtyAgentData = res;
              let userDisplayName = this.realtyAgentData.userDisplayName;
              let firstAndLastNames = userDisplayName != null ? userDisplayName.split(" ") : "";
              let phoneNum = this.realtyAgentData.dayTimePhone;
              this.phoneNumber = phoneNum;

              this.realtyAgentForm.patchValue({
                firstName: this.realtyAgentData.userDisplayName !== null ? firstAndLastNames[0] : '',
                lastName: this.realtyAgentData.userDisplayName !== null ? firstAndLastNames[1] : '',
                // phoneNumber: this.realtyAgentData.dayTimePhone !== null ? this.realtyAgentData.dayTimePhone : '',
                phoneNumber: this.realtyAgentData.dayTimePhone !== null ? this.phoneNumber : '',
                email: this.realtyAgentData.primaryEmail !== null ? this.realtyAgentData.primaryEmail : '',
                // city: this.realtyAgentData.mailingCity !== null ? this.realtyAgentData.mailingCity : ''
              });
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  getRealtyAgentInfo() {
    return this.realtyAgentProvider.getRealtyAgentInfo().toPromise()
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  }

  //getting states
  getStates() {
    return this.contactInfoProvider.getUSStates().toPromise()
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  }

  // filter for states and propery location
  filter(token) {
    if (token == 1 && this.realtyAgent.state !== "") {
      this.filteredStatesList = this.statesList.filter(function (el) {
        return el.toLowerCase().indexOf(this.realtyAgent.state.toLowerCase()) > -1;
      }.bind(this));
    }
    else if (token == 2 && this.realtyAgent.location !== "") {
      this.filteredPropertyLocationsList = this.statesList.filter(function (el) {
        return el.toLowerCase().indexOf(this.realtyAgent.location.toLowerCase()) > -1;
      }.bind(this));
    }
    else {
      this.filteredStatesList = [];
      this.filteredPropertyLocationsList = [];
    }
  }

  select(item, token) {
    if (token == 1) {
      this.realtyAgent.state = item;
      this.filteredStatesList = [];
    }
    if (token == 2) {
      this.realtyAgent.location = item;
      this.filteredPropertyLocationsList = [];
    }
  }

  handleClick(event) {
    var clickedComponent = event.target;
    var inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.filteredStatesList = [];
      this.filteredPropertyLocationsList = [];
    }
  }

  notify(ev) {
    this.isToggled = ev.checked;
  }

  submitRealtorInfo() {
    console.log("Enter into submitRealtorInfo");
    this.utility.trackAction('FindRealtyAgentPage', 'SUBMIT FORM')
    let realtyAgentDetails = {
      'withAgent': (this.isToggled == false || this.isToggled == undefined) ? "No" : "Yes",
      'firstName': this.realtyAgentForm.value.firstName,
      'lastName': this.realtyAgentForm.value.lastName,
      'city': this.realtyAgentForm.value.city,
      'state': this.realtyAgentForm.value.state,
      'phoneNumber': this.realtyAgentForm.value.phoneNumber,
      'email': this.realtyAgentForm.value.email,
      'location': this.realtyAgentForm.value.location,
      'type': (this.realtyAgentForm.value.buying == true && this.realtyAgentForm.value.selling == true) ? "Both" : (this.realtyAgentForm.value.buying == true) ? "Buying" : (this.realtyAgentForm.value.selling == true) ? "Selling" : " "
    }
    console.log(realtyAgentDetails);
    if (this.realtyAgentForm.valid) {
      this.realtyAgentProvider.updateRealtyAgentInfo(realtyAgentDetails).subscribe(data => {
        if (data == 200) {
          this.navCtrl.push("FindRealityAgentSuccessPage");
        }
      })

    }
  }
  goToAfbd() {
    this.navCtrl.push(AfbaDisclosurePage);
  }

}
