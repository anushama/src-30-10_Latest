import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../pages/core/app-settings';
import { PlatformServiceProvider } from '../platform-service/platform-service';
// import { Observable } from "rxjs/Observable";

/*
  Generated class for the UnlockAccountProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UnlockAccountProvider {
  // private appSettings: any;

  constructor(public http: Http, private pltfmService: PlatformServiceProvider, private appSettings: AppSettings) {
    // this.appSettings = AppSettings.singletonInstance();
    console.log('Hello UnlockAccountProvider Provider');
  }

  getRotatingQuestionId(){
    let rotatingQuestionId = new Date().getSeconds() % 7 + 1; 
    return rotatingQuestionId; 
  }

  accountUnlock(postData: any){
    console.log(postData);
    let serviceUrl = this.appSettings.serviceUrls.baseUrl + 
        this.appSettings.serviceUrls.login.accountUnlockUrl;
    let body = "deviceInfo=" + this.pltfmService.getRsaDeviceInfo() +
               "&username=" + postData.username + "&rotatingQuestionId=" + postData.Id + 
               "&rotatingQuestionInput=" + postData.answer + "&securityCode=" + postData.code;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(serviceUrl, body, options)
      .map(res => { return res.json() })
      // .catch(res => {
      //   return Observable.of({});
      // });
  }

}
