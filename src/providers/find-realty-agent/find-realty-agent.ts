import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { AppSettings } from '../../pages/core/app-settings';

/*
  Generated class for the FindRealtyAgentProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class FindRealtyAgentProvider {

  // private appSettings: any;

  constructor(public http: Http, private appSettings: AppSettings) {
    console.log('Hello FindRealtyAgentProvider Provider');
    // this.appSettings = AppSettings.singletonInstance();

  }

getRealtyAgentInfo() {
    let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.realtor.realtorInfo;
    console.log('getUSStates serviceUrl - '+ serviceUrl);
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: false });
    return this.http.get(serviceUrl,options)
      .map(this.extractData)
      .catch(this.handleError);
  }

updateRealtyAgentInfo(realtyAgent: any) {
    let body = JSON.stringify(realtyAgent);
    console.log(body);
    let url = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.realtor.updateRealtorInfo;
     let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options)
      .map(data => {
        return data.status;
      }, error => {
        console.log(JSON.stringify(error.json()));
      });

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
