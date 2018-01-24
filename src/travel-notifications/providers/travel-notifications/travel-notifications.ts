import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../../pages/core/app-settings';

/*
  Generated class for the TravelNotificationsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

@Injectable()
export class TravelNotificationsProvider {
  // private appSettings: any;

  constructor(public http: Http, private appSettings: AppSettings) {
    console.log('Hello TravelNotificationsProvider Provider');
    // this.appSettings = AppSettings.singletonInstance();
  }

  getTravelNotifications() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    let url = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.travelNotifications.notificationsUrl;
    return this.http.get(url, options);
  }

}
