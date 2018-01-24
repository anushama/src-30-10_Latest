import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { AppSettings } from '../../pages/core/app-settings';


@Injectable()
export class AddExtAcctProvider {

  constructor(public http: Http, private appSettings: AppSettings) {
    console.log('Hello AddExtAcctProvider Provider');
    // this.appSettings = AppSettings.singletonInstance();
  }

  externalAcctVerify(dataObj){
    console.log("before:" + dataObj);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    let data = JSON.stringify(dataObj);
    console.log("after:" + data);
    let url = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.accounts.verifyExternalAccountUrl;
    return this.http.post(url, data, options);
  }

  externalAcctAdd(dataObj){
    console.log("before:" + dataObj);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    let data = JSON.stringify(dataObj);
    console.log("after:" + data);
    let url = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.accounts.addExternalAccountUrl;
    return this.http.post(url, data, options);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || [];
  }

  private handleError(error: Response) {
     let msg = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(msg);
  }

}
