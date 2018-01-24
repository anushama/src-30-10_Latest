import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AppSettings } from '../../pages/core/app-settings';

@Injectable()
export class LocationTrackerProvider {
  constructor(public http: Http, private appSettings:AppSettings) {
      
  }

  getLocationDataInfo(latitude, longitude) {
      console.log(latitude + " " + longitude);
      let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.login.greetingInfoUrl;
      let data = "&latitude=" + latitude + "&longitude=" + longitude;
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let options = new RequestOptions({ headers: headers, withCredentials: true });
      return this.http.post(serviceUrl, data, options);
  }
}
