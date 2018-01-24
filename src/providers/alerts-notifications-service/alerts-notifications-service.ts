import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { AppSettings } from '../../pages/core/app-settings';


@Injectable()
export class AlertsNotificationsServiceProvider {

  constructor(public http: Http, private appSettings: AppSettings) {
  
  }
  public getAlertPrefernces(){
     let url = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.setting.getPreferences;
      console.log("url "+url);  

      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let options = new RequestOptions({ headers: headers, withCredentials: true });
      return this.http.get(url, options)
        .map(this.extractData)
        .catch(this.handleError);
  }
 public saveAlertPrefernces(preferences: any){
    let body = JSON.stringify(preferences);
    console.log("Response Obj"+body);
     let url = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.setting.savePreferences;
      console.log("url "+url);  
     let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        return this.http.post(url, body, options);
}
  public addDeviceUID(reqObj:any){
    let body = JSON.stringify(reqObj);
    console.log("Response Obj"+body);
     let url = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.setting.addDeviceUID;
      console.log("url "+url);  
     let headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        return this.http.post(url, body, options);
  
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
