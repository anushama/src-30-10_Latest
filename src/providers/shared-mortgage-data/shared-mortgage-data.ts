import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import 'rxjs/add/operator/map';

/*
  Generated class for the SharedMortgageDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SharedMortgageDataProvider {
  private sharedMortgageDataSource = new Subject<any>();
  constructor() {
    console.log('Hello SharedMortgageDataProvider Provider');
  }
  sharedMortgageData$ = this.sharedMortgageDataSource.asObservable();
  
  shareMortgageData(dataObj:any){
    this.sharedMortgageDataSource.next(dataObj);
  }
}
