import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
//import { AppSettings } from '../../pages/core/app-settings';
import { ApiEndpointProvider } from "../api-endpoint/api-endpoint";
import { AppSettings } from '../../pages/core/app-settings';

@Injectable()
export class ProductServiceProvider {
  //private appSettings: AppSettings;
  public ApiEndpoint: any;

  constructor(public http: Http, public apiEndPoint: ApiEndpointProvider, private appSettings: AppSettings) {
    console.log('Hello ProductServiceProvider Provider');
    this.ApiEndpoint = this.apiEndPoint.getEndpoint();
  }

  // getProducts() {
  //   this.appSettings = AppSettings.singletonInstance();
  //   let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.product.productUrl;
  //   let serviceUrl = CONFIG.baseUrls +''+ CONFIG.mailingAddress.getMailingAddress;
  //   return this.http.get(serviceUrl).map(this.extractData)
  //     .catch(this.handleError);
  //
  // }

  getProducts() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    return this.http.get(this.ApiEndpoint + "/rest/public/products", options)
      .map(this.extractData).catch(this.handleError);
  }
  private extractData(res: Response) {
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
