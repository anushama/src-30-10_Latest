import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { AppSettings } from '../../pages/core/app-settings';


@Injectable()
export class TransfersProvider {

  constructor(public http: Http, private appSettings: AppSettings) {
    console.log('Hello TransfersProvider Provider');
    // this.appSettings = AppSettings.singletonInstance();
  }

  getScheduledTransfers() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    let url = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.transfer.scheduledTransferUrl;
    return this.http.get(url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteScheduledTransfer(transferId: string) {
    console.log("Delete schedule transfer Id - " + transferId);
    let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.transfer.transferUrl + '/' + transferId; //
    let headers = new Headers({ 'Content-Type': 'text/plain' });//text/plain application/x-www-form-urlencoded
    let options = new RequestOptions({ headers: headers });// withCredentials: true , body: transferId 
    return this.http.delete(serviceUrl, options); //
      // .map(this.extractData)
      // .catch(this.handleError); //, options
  }

  transferMoney(dataObj, type){
    console.log("before:" + dataObj);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    let data = JSON.stringify(dataObj);
    console.log("after:" + data);
    let url = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.transfer.transferUrl;
    if (type == 'POST') {
      return this.http.post(url, data, options)
        .map(this.extractData)
        .catch(this.handleError);
    }
    return this.http.put(url, data, options)
      .map(this.extractData)
      .catch(this.handleError);
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
