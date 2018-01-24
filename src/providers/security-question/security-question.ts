import { Injectable } from '@angular/core';
import { Http,RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../pages/core/app-settings';
import { Observable } from "rxjs/Observable";
/*
  Generated class for the SecurityQuestionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SecurityQuestionProvider {
// private appSettings: any;

  constructor(public http: Http, private appSettings: AppSettings) {
    // this.appSettings = AppSettings.singletonInstance();
    console.log('Hello SecurityQuestionProvider Provider');
  }

  getRandomUnlockQuestion(){
    let rotatingQuestion = new Date().getSeconds() % 7+1;
    return rotatingQuestion;
  }
  // username, rotatingQuestionId, securityCode, deviceInfo
  accountUnlock(formValues:any){
    console.log(formValues)
    let serviceUrl=this.appSettings.serviceUrls.baseUrl +this.appSettings.serviceUrls.login.accountUnlockUrl + "/";
    let body="username="+formValues.username+"&rotatingQuestionId="+formValues.Id+"&rotatingQuestionInput="+formValues.answer+"&securityCode="+formValues.code+"&deviceInfo=null";
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(serviceUrl, body, options)
      .map(res => { return res.json() })
      .catch(res => {
        return Observable.of({});
      });
  }
  
}
