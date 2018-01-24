import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response} from '@angular/http';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { ApiEndpointProvider } from "../api-endpoint/api-endpoint";
import { Observable } from "rxjs/Observable";
import { AppSettings } from '../../pages/core/app-settings';
import { ErrorMessages } from '../../config/global-config';
import { Utility } from '../../pages/core/utility';

/*
  Generated class for the AccountsServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

@Injectable()
export class AccountsServiceProvider {
  public ApiEndpoint: any;
  constructor(public http: Http, public apiEndPoint: ApiEndpointProvider, public platform: Platform, 
    private appSettings: AppSettings,
    private utility: Utility) {
    console.log('Hello AccountsServiceProvider Provider');
    this.ApiEndpoint = this.apiEndPoint.getEndpoint();
    // this.appSettings = AppSettings.singletonInstance();
    // this.appSettings.getServiceUrls(this.httpProvider,this.platform);
  }
  //Update show hide IRA accounts
  updateHideAccounts(accountMasksToHide: any, showIRA: boolean, showMoneyMarket: boolean) {
    let body = JSON.stringify({ accountMasksToHide, showMoneyMarket, showIRA });
    console.log(body);
    let url = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.accounts.updateShowHideAccountsUrl;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options)
      .subscribe(data => {
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
  }

  //Update nickname server
  updateNickName(arr) {
    let body = JSON.stringify(arr);
    console.log(body);
    let url = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.contact.updateAccountNickNameUrl;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, body, options);
  }

  getCombinedAccounts(): Observable<any> {
    let accountsError:boolean = false;
    let iraError:boolean = false;

    let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.accounts.accountslsUrl;
    let IRAAccountServiceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.accounts.IRAAccountsUrl;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return Observable.forkJoin([
      this.http.get(serviceUrl, options).map(res => res.json()).catch(res => {
        accountsError = true;
        return Observable.of({
          checkSaveAccounts: [],
          loanAccounts: [],
          creditCardAccounts: [],
          mortgageAccounts: []
        });
      }),
      //private/accounts/certificates this.ApiEndpoint + "/rest/private/accounts/certificates"
      this.http.get(IRAAccountServiceUrl, options).map(res => res.json()).catch(res => {
        iraError = true;
        return Observable.of({
          iraAccounts: [],
          certificateAccounts: []
        });
      })
    ]).map((data) => {
      let res: any = {};
      let message = null;
      res.accountData = data[0];
      res.iraCertificateData = data[1];
      return res;
    }).catch(res => {
      return Observable.of({});
    })
  }

  getIRACertificates() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    let url = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.accounts.IRAAccountsUrl;
    return this.http.get(url, options)
      .map(this.parseData)
      .catch(this.handleError);
  }

  /*  get the Accounts services data */
  getAccountsData() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    let url = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.accounts.accountslsUrl;
    return this.http.get(url, options);
      // .map(this.parseData)
      // .catch(this.handleError);
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

  //Update show hide IRA accounts
  getCreditCardRewards(AccountMaskVal) {
    let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.accounts.creditcardRewardUrl + "/";
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(serviceUrl + AccountMaskVal, options);
  }

  getRecentTransactions(AccountMaskVal) {
    let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.accounts.recentTransactions + "/";
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(serviceUrl + AccountMaskVal, options)
      .map(res => { return res.json() }).catch(res => {
        this.utility.showAlert(ErrorMessages.SORRY, '', ErrorMessages.RECENT_TRANSACTION_DATA, ErrorMessages.BUTTON_OK);        
        return Observable.of({});
      });
  }
  

  getCreditCardTransactions(AccountMaskVal, filter?) {
    if (filter === (undefined || null)) filter = 'Recent';
    let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.creditCard.creditCardTransactionsUrl;
    var data = 'accountMask='+AccountMaskVal+'&statementPeriod='+filter;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(serviceUrl, data, options)
      .map(res => { return res.json() })
      .catch(res => {
        this.utility.showAlert(ErrorMessages.POPUP_TTILE, '', ErrorMessages.RECENT_CREDIT_TRANSACTION, ErrorMessages.BUTTON_OK);        
        return Observable.of({});
      });
  }

  getLoanTransactions(AccountMaskVal) {
    let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.accounts.loanAccountTransactions;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(serviceUrl + AccountMaskVal, options);
  }
  getCheckImage(accountMasksVal: number, amountInCents: number, checkNumber: number, postDate: any) {
    let serviceUrl = this.appSettings.serviceUrls.baseUrl + this.appSettings.serviceUrls.accounts.getCheckImage;
    let body: string = "accountMask=" + accountMasksVal + "&amountInCents=" + amountInCents + "&checkNumber=" + checkNumber + "&postDate=" + postDate;

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(serviceUrl, body, options)
      .map(res => { return res.json() })
      .catch(res => {
        this.utility.showAlert(ErrorMessages.POPUP_TTILE, '', ErrorMessages.CHECK_IMAGE, ErrorMessages.BUTTON_OK);        
        return Observable.of({});
      });
  }
}
