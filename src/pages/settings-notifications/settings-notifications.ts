import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SessionManager } from '../core/session-manager';

/**
 * Generated class for the SettingsNotificationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings-notifications',
  templateUrl: 'settings-notifications.html',
})
export class SettingsNotificationsPage {
  storageService: any;

  public doNotDisturb:boolean = false;
  public showDetails:boolean = false;
  public accountsList: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private sessionManager: SessionManager) {
    // No More Local Storage Usage
    // this.localStorage.sharedLocalStorageData.subscribe(res=>{
    //   console.log('bootstrap doNotDisturb', res);
    //   this.doNotDisturb = res;
    // })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsNotificationsPage');
     this.getAccountsList();
  }


  toggleDetails(data) {
    if (data.showDetails) {
        data.showDetails = false;
        data.icon = 'ios-add-circle-outline';
    } else {
        data.showDetails = true;
        data.icon = 'ios-remove-circle-outline';
    }
  }

  getAccountsList(){
    //let sessionManager = SessionManager.singletonInstance(); 
    this.accountsList = this.sessionManager.accountsList;
    console.log("this.accountsList.."+this.accountsList);
    console.log("this.sessionManager.."+this.sessionManager);
 
  }

    popView() {
    this.navCtrl.pop();
  }

    toggleDonotDisturb(e){
    // Bind to the event value rather than the native object, because it causes a loop trying to decifer between a slide toggle and a click.
    this.doNotDisturb = e.value;
    this.storageService.writeToStorage('doNotDisturb', this.doNotDisturb);
  }

}
