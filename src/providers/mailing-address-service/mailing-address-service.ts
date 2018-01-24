import { Injectable } from '@angular/core';
import { Http, RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Rx';
//import { MailingAddress } from '../../pages/update-mailing-address/mailing-address';
//import { CONFIG } from '../../pages/core/config';
/*
  Generated class for the MailingAddressServiceProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

@Injectable()
export class MailingAddressServiceProvider {
  //private _url = CONFIG.baseUrls +''+ CONFIG.mailingAddress.getMailingAddress;
  constructor(public http: Http) {
    console.log('Hello MailingAddressServiceProvider Provider');

  }

  /*  get the update mailing address services data */
  //  getMallingAddressData():Observable<MailingAddress> {
  //   return this.http.get(this._url)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }

  // private extractData(res: Response) {
  //   let body = res.json();
  //   console.log('response', body);
  //   return body|| { };
  // }
  // private handleError(error: Response) {
  //   console.error(error);
  //   let msg = `Error status code ${error.status} at ${error.url}`;
  //   return Observable.throw(msg);
  // }

  getContactInfo() {
    return this.http.get('https://mobile-dev.penfed.org/webapp/rest/private/settings/contactinfo');
  }
  setContactInfo(data:any){
    let body = JSON.stringify({data});
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post('https://mobile-dev.penfed.org/webapp/rest/private/settings/mailingaddr', body, options)
      .map(res=>{
        return res.json()
      },
      err=>{
        console.log(err)
        return Observable.of({'success':false});
      });
  }

   /* getCountries(){
      return this.http.get('https://raw.githubusercontent.com/annexare/Countries/master/countries.json').map(res=>res.json());
    }*/
}
