import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AppSettings } from '../../pages/core/app-settings';

@Injectable()
export class ApplicationStatusProvider {
  constructor(public http: Http, private appSettings: AppSettings) {
    console.log('Hello ApplicationDetailsProvider Provider');
    // this.getApplicationStatusDeatils();
  }

   getApplicationStatusDeatils() {
    console.log('getProducts......');
    let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.tools.applicationStatus;
    console.log('application serviceserviceUrl is ==>' + serviceUrl);
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
  //  let msg = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(error);
  }
}
