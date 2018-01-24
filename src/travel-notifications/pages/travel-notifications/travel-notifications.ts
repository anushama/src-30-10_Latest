import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { Utility } from '../../../pages/core/utility';
import { SessionManager } from '../../../pages/core/session-manager';
import { ContactInformationProvider } from '../../../providers/contact-information/contact-information';
import { AccountsServiceProvider } from '../../../providers/accounts-service/accounts-service';
import { TravelNotificationsProvider } from '../../providers/travel-notifications/travel-notifications';

/**
 * Generated class for the TravelNotificationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-travel-notifications',
  templateUrl: 'travel-notifications.html'
})
export class TravelNotificationsPage {
  // private sessionManager: any;
  private loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private contactInfoProvider: ContactInformationProvider,
    private accountsService: AccountsServiceProvider,
    private travelNotificationService: TravelNotificationsProvider, 
    private utility: Utility, private viewCtrl: ViewController, private sessionManager: SessionManager) {
    // this.sessionManager = SessionManager.singletonInstance();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TravelNotificationsPage');
    //Analytics
    this.utility.trackPage('TravelNotificationsPage');
    this.viewCtrl.setBackButtonText('');

  }

  getContactInfo() {
    if (this.sessionManager.contactInfo != null) {
      return Promise.resolve(this.sessionManager.contactInfo);
    } else {
      return this.contactInfoProvider.getContactInfo().toPromise()
        .then(res => {
          let result = res.json();
          console.log(result);
          // this.sessionManager.contactInfo = result;
          return result;//this.sessionManager.contactInfo;
        })
        .catch(error => {
          console.log(error);
          return error;
        });
    }
  }

  getMemberInfo() {
    if (this.sessionManager.accountsList != null) {
      return Promise.resolve(this.sessionManager.accountsList);
    } else {
      return this.accountsService.getAccountsData().toPromise()
        .then(res => {
          let result = res.json();
          console.log(result);
          // this.sessionManager.accountsList = result;
          return result;//this.sessionManager.accountsList;
        })
        .catch(error => {
          console.log(error);
          return error;
        });
    }
  }

  getTarvelNotifications() {
    let refreshData = this.navParams.get('refreshData');
    if (this.sessionManager.travelNotifications == null || refreshData == true) {
      Promise.all([this.getContactInfo(), this.getMemberInfo()])
        .then(res => {
          console.log(res);
          this.sessionManager.contactInfo = res[0];
          this.sessionManager.accountsList = res[1];
          this.travelNotificationService.getTravelNotifications()
            .subscribe(res => {
              let result = res.json();
              console.log(result);
              this.sessionManager.travelNotifications = result;
            },
            err => {
              console.log(err);
            },
            () => {
              this.loading.dismiss();
            });
        })
        .catch(error => {
          console.log(error);
        });
    } 
  }
}
