import { Injectable } from '@angular/core';
import { Http,RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ApiEndpointProvider } from "../api-endpoint/api-endpoint";
import { AppSettings } from '../../pages/core/app-settings';

/*
  Generated class for the MemberInfoProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MemberInfoProvider {
  // private appSettings: any;
  public ApiEndpoint: any;
  constructor(public http: Http,public apiEndPoint: ApiEndpointProvider, private appSettings: AppSettings) {
    console.log('Hello MemberInfoProvider Provider');
    // this.appSettings = AppSettings.singletonInstance();
    this.ApiEndpoint = this.apiEndPoint.getEndpoint();
  }

  // getMemberInfo() {
  //   let memberInfoServiceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.member.memberInfoUrl;
  //   console.log('getMemberInfo serviceUrl - '+ memberInfoServiceUrl);
  //   let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  //   let options = new RequestOptions({ headers: headers, withCredentials: true });
  //   return this.http.get(memberInfoServiceUrl, options);
  // }

  getMemberInfo() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(this.ApiEndpoint + "/rest/private/accounts", options);
  }

}
