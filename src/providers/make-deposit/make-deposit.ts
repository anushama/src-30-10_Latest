import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { AppSettings } from '../../pages/core/app-settings';
import { Utility } from "../../pages/core/utility";

/*
  Generated class for the MakeDepositProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MakeDepositProvider {

  constructor(public http: Http,private appSettings: AppSettings, private util: Utility) {
    console.log('Hello MakeDepositProvider Provider');
  }

  makeDeposit(amount:any, accountMask: any, frontImg, backImg) {
    let body = JSON.stringify({amount: parseInt(amount),backImage:backImg.replace("data:image/jpeg;base64,", ""),frontImage:frontImg.replace("data:image/jpeg;base64,", ""),toAcctMask:accountMask });
    let url = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.deposit.depositUrl;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options)
      .map(res=>{ return res.json() })
      .catch((errorResponse) => {
        return Observable.throw(errorResponse);
      });
  }
}
