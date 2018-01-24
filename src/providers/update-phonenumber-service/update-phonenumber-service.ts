import { Injectable } from '@angular/core';

import { Http, RequestOptions, Headers} from '@angular/http';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
//import { ContactInformationProvider } from '../../providers/contact-information/contact-information';
//import { NgForm } from '@angular/forms';
/*
  Generated class for the UpdatePhonenumberServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UpdatePhonenumberServiceProvider {
  public endPoints = "https://mobile-dev.penfed.org/webapp/rest/private/settings/contactphone";
  constructor(public http: Http) {

  }

  updatePhoneNumber() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    var data = "cellNumber=123455&t=9214f42d08087293aa2b7d28d366d8f60afbd93b";

    return this.http.post(this.endPoints, data, options);
  }
}
