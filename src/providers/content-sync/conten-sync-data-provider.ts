import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Platform} from "ionic-angular";
import {GlobalConstants} from "../../config/global-config";

/**
 * Service used by Content Sync Framework
 */
@Injectable()
export class ContentSyncDataProvider {

  constructor(public http: Http, public platform: Platform) {
  }

  private cacheData: Map<string, string> = new Map<string, string>();

  /**
   * return promise based on input url
   * @param url
   * @returns {Promise<any>}
   */
  public getLocalStorageData(url) {

    if (this.cacheData.has(url)) {
      console.log("found data in cache for url["+url+"]");
      return new Promise((resolve, reject) => resolve(this.cacheData.get(url)));
    }
    return this.http.get(url).map((res) => {
      let data = res.json();
      this.cacheData.set(url, data);
      return data;
    }).toPromise();
  }

  public getBasePlatformPath() {
    var url: string = "../../";
    if (this.platform.is('cordova')) { //you are on device
      if (this.platform.is('android')) {
        url = GlobalConstants.platformAndriodBasePath;
      } else if (this.platform.is('ios')) {
        url = GlobalConstants.platformIOSBasePath;
      }
    } else { // you are on browser
      url = "";
    }
    return url;
  }

  public addToCache(key, value) {
    if (!this.cacheData.has(key)) {
      this.cacheData.set(key, value);
    }
  }

  public getFromCache(key){

      return this.cacheData.get(key);
  }

}
