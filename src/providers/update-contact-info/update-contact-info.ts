import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
// import { ApiEndpointProvider } from "../api-endpoint/api-endpoint";
//import { Observable } from "rxjs/Observable";
import { AppSettings } from '../../pages/core/app-settings';
import { Platform } from 'ionic-angular';
/*
  Generated class for the AccountsServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UpdateContactInfoProvider {
    constructor(public http: Http, public platform: Platform, private appSettings: AppSettings) { // public apiEndPoint: ApiEndpointProvider,
    }

  getSecurityCode(securityCode:any) {
    let serviceUrl = this.appSettings.serviceUrls.baseUrl +this.appSettings.serviceUrls.contact.validateSecurityUrl;
    console.log('getSecurityCode serviceUrl - '+serviceUrl);
    let body = JSON.stringify({securityCode});
    console.log('securityCode - '+body);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    // return this.http.post(this.ApiEndpoint + "/rest/public/login/validateSecurityCode", body, options);
    return this.http.post(serviceUrl, body, options);

  }

  updateEmailAddress(priEmail, secEmail, token){
    let serviceUrl=this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.contact.updateEmailAddrUrl;
    console.log('updateEmailAddress serviceUrl - '+ serviceUrl);
    let data = "primaryEmail="+priEmail+"&secondaryEmail="+secEmail+"&t="+token;
    console.log('updateEmailAddress - '+data);
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    // return this.http.post(this.ApiEndpoint + "/rest/private/settings/contactemail", data, options);
    return this.http.post(serviceUrl, data, options);
  }

  updatePhoneNumber(dayTimePhone, eveningPhone, cellPhone, token){
    let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.contact.updateContactPhoneUrl;
    console.log('updatePhoneNumber serviceUrl - '+ serviceUrl);
    let data = "dayTimePhone="+dayTimePhone+"&eveningPhone="+eveningPhone+"&cellPhone="+cellPhone+"&t="+token;
    console.log('updatePhoneNumber - '+data);
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    // return this.http.post(this.ApiEndpoint + "/rest/private/settings/contactphone", data, options);
    return this.http.post(serviceUrl, data, options);
    //return this.http.post(this.ApiEndpoint + "/rest/private/settings/contactphone", data, options)

  }

  updateMailingAddress(data:any){
    let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.contact.updateMailingAddressUrl;
    console.log('updateMailingAddress serviceUrl - '+ serviceUrl);
    let body = JSON.stringify(data);
    console.log('updateMailingAddress - '+data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    // return this.http.post(this.ApiEndpoint+ "/rest/private/settings/mailingaddr", body, options);
    return this.http.post(serviceUrl, body, options);
      // .subscribe(res=>{
      //   return res.json()
      // },
      // err=>{
      //   console.log(err)
      //   return Observable.of({'success':false});
      // });
  }
}
