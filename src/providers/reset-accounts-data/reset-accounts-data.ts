import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the ResetAccountsDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ResetAccountsDataProvider {
  resetAccounts:EventEmitter<any> = new EventEmitter();
  constructor() {}
  resetData(){
    this.resetAccounts.emit(true);
  }
  getResetEvent(){
    return this.resetAccounts;
  }
}
