import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { AppSettings } from '../../pages/core/app-settings';


@Injectable()
export class FindAtmProvider {
// public appSettings:AppSettings;
  public atmSearchList: any =null;
  public listSearchInput: any = null;
 
  constructor(public http: Http, private appSettings: AppSettings) {
    console.log('Hello FindAtmProvider Provider');
  }

   public getATMBranchDetails(locationObj) {
    // let  appSettings = AppSettings.singletonInstance();
    var data = "PostalCode=" + locationObj.postalCode + "&AddressLine=" + locationObj.addressLine;
    data = data + "&City=" +locationObj.city+ "&State=" +locationObj.state;
     data = data + "&Country=" +locationObj.country+ "&Offset="+locationObj.offset + "&Latitude=" +locationObj.latitude;
     data = data + "&Longitude=" +locationObj.longitude+ "&Type=" +locationObj.type;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    let url = this.appSettings.serviceUrls.atm.atmUrl+data;
  
    return this.http.get(url, options)
      .map(this.parseData)
      .catch(this.handleError);
  }

private parseData(res: Response) {
    let body = res.json();
    return body || {};
  }

    private parseSearchData(res: Response) {
    console.log("res in search"+res);
    let body = JSON.stringify(res);
    console.log("res in search--body"+body);
    return body || {};
  }


  private handleError(error: Response) {
    console.error(error);
    let msg = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(msg);
  }

 
}