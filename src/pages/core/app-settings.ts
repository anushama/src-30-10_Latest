import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AppSettings {
  public serviceUrls: any;
  public envJsonPath: string = "";
  public isDeviceTouchAvailable: boolean = false;;
  public isDeviceTouchEnabled: boolean = false;
  public isDeviceTouchLocked: boolean = false;
  public appPlatform: string = "";
  public FingerprintStatusType: any;
  public PlatformType: any;
  public isUserTouchEnabled: boolean;
  private IS_ANDROID : boolean   = false;
  private IS_IOS : boolean   = false;


  constructor(private http: Http, private platform: Platform) {
    if (this.platform.is('cordova')) {
      this.IS_ANDROID = this.platform.is('android');
      this.IS_IOS = this.platform.is('ios');
    }
  }

  private getBaseUrl() { //platform: Platform
    var url: string = "../../";
    if (this.platform.is('cordova')) {
      if (this.platform.is('android')) {
        url = "/android_asset/www/";
      } else if (this.platform.is('ios')) {
        url = "../www/";
      }
    }
    return url;
  }

  public getServiceUrls() { //http: Http, platform: Platform
    // this.httpProvider = http;
    this.envJsonPath = this.getBaseUrl(); //this.platform
    console.log("Base Path::::" + this.envJsonPath);
    //load env json
    return this.getServiceEnvUrls().map(
      result => {
        this.serviceUrls = result;
        return result;
      })
  }

  public getBillpayUrls(input) {
    let url: string = this.envJsonPath + "assets/data/" + input + ".json";
    console.log("PATHSERVICE" + url);
    return this.http.get(url);
  }

  private getServiceEnvUrls() {
    let url: string = this.envJsonPath + "assets/data/env.json";
    console.log("PATHSERVICE" + url);
    return this.http.get(url)
      .map(this.parseData)
      .catch(this.handleError);
  }

  private parseData(res: Response) {
    let body = res.json();
    console.log('response', body);

    return body || {};
  }

  private handleError(error: Response) {
    console.error(error);
    let msg = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(msg);
  }

  public isAndroid(){
    return this.IS_ANDROID;
  }
  public isIOS() {
    return this.IS_IOS;
  }

}
