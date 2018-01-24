import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import { ApiEndpointProvider } from "./api-endpoint/api-endpoint";
import { PlatformServiceProvider } from '../providers/platform-service/platform-service';
import { AppSettings } from '../pages/core/app-settings';
import { SessionManager } from "../pages/core/session-manager";

/*
  Generated class for the ApiService provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApiService {

  public resultJson: any;
  public body: any;
  public checkSaveAccounts: any;
  public reditCardAccounts: any;
  public loanAccounts: any;
  public mortgageAccounts: any;
  public user: string;
  public pass: string;
  public hash: string;
  public ApiEndpoint: string;
  public securityQuestionId: any;
  public sessionId: any;
  public transactionId: any;
  public securityAnswer: any;
  public securityQuestion: any;
  public securityHash: any = null;
  public isTCAccepted: boolean;
  public backgroundImg: string;


  constructor(public http: Http, public api: ApiEndpointProvider, 
    private pltfmService: PlatformServiceProvider, private appSettings: AppSettings, private sessionManager: SessionManager) { //platform: Platform,
    console.log('Hello ApiService Provider');
    this.ApiEndpoint = this.api.getEndpoint();
  }

  setHash(hashVal: string) {
    this.hash = hashVal;
  }

   beforeLogin(userInfo) { //, appSettings
   let loginFormUsername = userInfo.userId;
   let deviceToken = userInfo.deviceToken;
    // this.appSettings = appSettings;
    let serviceUrl = this.appSettings.serviceUrls.baseUrl +
      this.appSettings.serviceUrls.login.beforeLoginUrl + this.pltfmService.isSDKorJS(); //this._rsaSDKOrJS
    console.log('beforelogin serviceurl - ' + serviceUrl);
    let data = "d=" + this.pltfmService.getRsaDeviceInfo() + "&deviceToken=" + (deviceToken == undefined ? null : encodeURIComponent(deviceToken))+ "&u=" + loginFormUsername + "&clientVersion=2.7&buildNumber=6183";
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append('MyMessage','MyCustomHeaderValue');
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(serviceUrl, data, options);
    //  return this.http.post(this.ApiEndpoint+"/rest/public/login/JS", data, options);
  }

  rsaRequest(user, pass) { //, appSettings
    // this.appSettings = appSettings;
    let serviceUrl = this.appSettings.serviceUrls.baseUrl +
      this.appSettings.serviceUrls.login.beforeLoginUrl + this.pltfmService.isSDKorJS(); //this._rsaSDKOrJS
    this.user = user;
    let data = "j_username=" + user + "&j_password=" + pass + "&hash=" + (this.hash == undefined ? null : this.hash) + "&clientVersion=2.7&buildNumber=6183";
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(serviceUrl, data, options);
    //   return this.http.post(this.ApiEndpoint+"/rest/public/login/JS", data, options);
  }

  login(user, pass) { //, appSettings
    // this.appSettings = appSettings;
    let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.login.loginUrl;
    this.user = user;
    let data = "j_username=" + user + "&j_password=" + pass + "&hash=" + encodeURIComponent(this.hash == undefined ? null : this.hash) + "&clientVersion=2.7&buildNumber=6183";
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(serviceUrl, data, options);
    //  return this.http.post(this.ApiEndpoint+"/j_security_check", data, options);
  }
    patternlogin(patternLoginInfo, pass) { //, appSettings
    // this.appSettings = appSettings;
    let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.login.loginUrl;
    this.user = patternLoginInfo.userId;
    this.hash = patternLoginInfo.secHash;
    var data = "j_username=" + patternLoginInfo.userId + "&j_password=" + pass ;
    data = data + "&base64DataBytes=" +encodeURIComponent(patternLoginInfo.base64DataBytes);
    data = data+ "&base64SignatureBytes=" + encodeURIComponent(patternLoginInfo.base64SignatureBytes);
    data=data+ "&quickLoginId="+patternLoginInfo.quickLoginInfo;
    data = data  + "&hash=" + encodeURIComponent(this.hash == undefined ? null : this.hash) + "&clientVersion=2.8&buildNumber=6201";
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(serviceUrl, data, options);
    //  return this.http.post(this.ApiEndpoint+"/j_security_check", data, options);
  }


  submitSecurityQuestion(secureAnswer, saveDevice, deviceToken) { //, appSettings
    // this.appSettings = appSettings;
    let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.login.saveSecurityAnsUrl;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    let data = "ddata=" + this.pltfmService.getRsaDeviceInfo() + "&token=" + encodeURIComponent(deviceToken) + "&save=" + saveDevice + "&username="
      + this.sessionManager.userName + "&qid=" + this.securityQuestionId + "&r=" + secureAnswer + "&sid=" + encodeURIComponent(this.sessionId)
      + "&tid=" + encodeURIComponent(this.transactionId);
    console.log("before submitting ::::::" + data);
    return this.http.post(serviceUrl, data, options);
  }

  getDeviceInformation() { //appSettings
    // this.appSettings = appSettings;
    let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.login.getDeviceInfoUrl;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(serviceUrl + options);
    // return this.http.get(this.ApiEndpoint+"/rest/private/settings/"+ options);
  }

  saveDevice(deviceInfo) { //, appSettings
    // this.appSettings = appSettings;
    let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.login.saveDeviceInfoUrl;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(serviceUrl + deviceInfo, options);
  }

  secondRequest() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(this.ApiEndpoint + "/rest/private/accounts", options);
  }
}
