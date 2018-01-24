import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { ApiEndpointProvider } from "../api-endpoint/api-endpoint";

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../pages/core/app-settings';


@Injectable()
export class ContactInformationProvider {

  // private appSettings: any;
  public ApiEndpoint: any;
  constructor(public http: Http,public apiEndPoint: ApiEndpointProvider, private appSettings: AppSettings) {
    // this.appSettings = AppSettings.singletonInstance();
    this.ApiEndpoint = this.apiEndPoint.getEndpoint();

  }

  userName:string;

  getContactInfo() {
    let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.contact.contactInfoUrl;
    console.log('getContactInfo serviceUrl - '+ serviceUrl);
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(serviceUrl, options);
  }

  getCountries() {
    let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.contact.countriesUrl;
    console.log('getCountries serviceUrl - '+ serviceUrl);
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(serviceUrl, options)
       .map(this.extractData)
       .catch(this.handleError);
  }

  getUSStates() {
    let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.contact.statesUrl;
    console.log('getUSStates serviceUrl - '+ serviceUrl);
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(serviceUrl, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError(error: Response) {
     let msg = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(msg);
  }
}
