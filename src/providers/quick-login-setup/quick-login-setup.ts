import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../pages/core/app-settings';

@Injectable()
export class QuickLoginSetupProvider {
  // private appSettings: any;
  public isPatternEnable: boolean;

  constructor(private http: Http,
    private platform: Platform, private appSettings: AppSettings) {

    // this.appSettings = AppSettings.singletonInstance();
  }

  public enableQuickLogin(requestInfo: any) {
    let body = JSON.stringify(requestInfo);
    console.log(body);
    let url = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.setting.enableQuickLoginUrl;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(url, body, options);
  }

  public disableQuickLogin(quickLoginInfo: string) {
    let data = "quickLoginId=" + quickLoginInfo;
    console.log("DISABLE QUICK LOGIN::::" + data);
    let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.setting.disableQuickLoginUrl;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, body: data });
    return this.http.delete(serviceUrl, options);

  }
  public quickLoginFailedAttempt(quickLoginInfo: string, userName: string) {
    let data = "quickLoginId=" + quickLoginInfo + "&username=" + userName
    let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.setting.quickLoginFailedAttemptUrl;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(serviceUrl, data, options);

  }

}
