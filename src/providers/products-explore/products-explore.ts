import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
//import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AppSettings } from '../../pages/core/app-settings';

/*
  Generated class for the ProductsExploreProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProductsExploreProvider {

  // private appSettings: AppSettings;

  constructor(public http: Http, private appSettings: AppSettings) {
    console.log('Hello ProductsExploreProvider Provider');
  }

  getProducts() {
    console.log('getProducts......');
    // this.appSettings = AppSettings.singletonInstance();
    console.log('appSettings......' + this.appSettings);
    let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.explore.exploreUrl;
    console.log('serviceUrl is' + serviceUrl);

    return this.http.get(serviceUrl).map(this.parseData)
      .catch(this.handleError);
  }
  private parseData(res: Response) {
    let body = res.json();
    console.log('response is', body);
    return body || {};
  }
  private handleError(error: Response) {
    console.error(error);
    let msg = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(msg);
  }
}
