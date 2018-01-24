import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { ApplicationDetailsPage} from '../application-details/application-details';
import {ApplicationStatusProvider} from '../../providers/application-status/application-status';
import { Utility } from '../core/utility';

@IonicPage()
@Component({
  selector: 'page-application-status',
  templateUrl: 'application-status.html',
})
export class ApplicationStatusPage {
  public activeApplication: any;
  public inActiveApplication: any;
  public appStatusAvailble: boolean = true;
  public activeApplicationStatus: boolean;
  public inActiveApplicationStatus: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, private appDetailService: ApplicationStatusProvider, private utility: Utility) {
    this.getApplicationDeatils();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApplicationStatusPage');
    // Adobe Analytics page tracking
    this.utility.trackPage('ApplicationStatusPage');
  }
  getApplicationDeatils() {
    let appStatusDetails;
    this.appDetailService.getApplicationStatusDeatils().subscribe(
      result => {
        appStatusDetails = result;

        this.activeApplication = appStatusDetails.filter(function(data) {
          return data.inactive == false;
        });
        this.inActiveApplication = appStatusDetails.filter(function(data) {
          return data.inactive == true;
        });
        this.appStatusAvailble = this.getApplicationStatus(appStatusDetails);
        this.activeApplicationStatus = this.getApplicationStatus(this.activeApplication);
        this.inActiveApplicationStatus = this.getApplicationStatus(this.inActiveApplication);
      }
    )
  }
  /* navigate to respected application details page */
  goToApplicationDetails(item) {
    let data = item;
    console.log('get the click data', data);
    this.navCtrl.push(ApplicationDetailsPage, { data });
  }
  /*navigate to proudcts page if no active or inactive appliaction availble */
  goToProducts() {
    this.navCtrl.push('UnderConstructionPage'); //ExplorePage
  }

  /*check if we have the active or inactive account status */
  getApplicationStatus(appliaction) {
    return appliaction.length > 0;
  }
}
