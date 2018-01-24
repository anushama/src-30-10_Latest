import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GetTimeoutValueProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class GetTimeoutValueProvider {
  public timeoutVal:number;
  public stayLoggedIn:boolean
  constructor(public http: Http) {
    // console.log('Hello GetTimeoutValueProvider Provider');
    this.timeoutVal = 600000;
    this.stayLoggedIn = false;
  }
  getTimeout(){
    return this.timeoutVal;
  }
  toggleStayLoggedIn(){
    return !this.stayLoggedIn;
  }
  getStayLoggedIn(){
    return this.stayLoggedIn;
  }
}
