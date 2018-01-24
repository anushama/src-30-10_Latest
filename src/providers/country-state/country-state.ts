import { Injectable } from '@angular/core';
import { Http ,Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AppSettings } from '../../pages/core/app-settings';
//import { CountryState } from '../../model/countries';
//import { AppSettings } from '../../pages/core/app-settings';
//import { CONFIG } from '../../pages/core/config';
/*
  Generated class for the CountryStateProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CountryStateProvider {


  constructor(public http: Http, private appSettings: AppSettings) {
    console.log('Hello CountryStateProvider Provider');

  }
 getCountries() {
   //let appSettings =  AppSettings.singletonInstance();
   //let countryUrl= appSettings.serviceUrls.baseUrl + appSettings.serviceUrls.contact.countryUrl;
  //  let countryUrl = CONFIG.baseUrls +''+ CONFIG.countries;
    return this.http.get('assets/data/countries.json')
      .map(this.extractData)
      .catch(this.handleError);
  }
 getStates() {
    //let appSettings =  AppSettings.singletonInstance();
   //let statesUrl = appSettings.serviceUrls.baseUrl + appSettings.serviceUrls.contact.statesUrl;
    // let statesUrl = CONFIG.baseUrls +''+ CONFIG.states.US;
    return this.http.get('assets/data/US.json')
      .map(this.extractData)
      .catch(this.handleError);
  }

 private extractData(res: Response) {
    let body = res.json();
   // console.log('response', body);
    return body|| { };
  }
  private handleError(error: Response) {
    //console.error(error);
    let msg = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(msg);
  }
}
