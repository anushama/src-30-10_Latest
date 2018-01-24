import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the LogoutProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LogoutProvider {
  // public ApiEndpoint:any;
  constructor(public http: Http) { //public apiEndPoint: ApiEndpointProvider,
    // this.ApiEndpoint = this.apiEndPoint.getEndpoint();
  }

  sessionLogout(appSettings:any){
    let serviceUrl = appSettings.serviceUrls.baseUrl + appSettings.serviceUrls.login.logoutUrl;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(serviceUrl, options);
  }
}
