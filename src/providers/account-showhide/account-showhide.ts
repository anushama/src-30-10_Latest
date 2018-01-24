import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import{ Accounts } from '../../pages/account-showhide/accounts';
import{CONFIG} from '../../pages/core/config';

/*
  Generated class for the AccountShowhideProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AccountShowhideProvider {

   private _url = CONFIG.baseUrls +''+ CONFIG.accountsDetails.getAccounts;

  constructor(public http: Http) {
    console.log('Hello AccountShowhideServiceProvider Provider');
    console.log(this._url);
  }



    /*  get the Accounts services data */
   getAccountsData():Observable<Accounts> {
    return this.http.get(this._url)
     .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    console.log('response', body);
    return body|| { };
  }
  private handleError(error: Response) {
    console.error(error);
    let msg = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(msg);
  }




}
