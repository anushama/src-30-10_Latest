import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { ReplaySubject } from "rxjs/Rx";


/*
  Generated class for the SharedLocalStorageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SharedLocalStorageProvider {
  //Using replay subject to endure that the data is passed in a Observable to the subscribed value.
  public sharedLocalStorageData: ReplaySubject<any> = new ReplaySubject(1);
  constructor(public http: Http, private localStorage: Storage) {
  }

  setValue(key, value) {
    let qi = key;
    this.localStorage.ready().then(() => {
      this.localStorage.set(key, value)
        .then((res) => {
          console.log(`SUCCESS : ${res} value set for key ${qi}`); 
        })
        .catch(err => { 
          console.log(`ERROR : ${err} in setting value for key ${qi}`); 
        });
    });
  }

  getValue(key) {
    // let data: any;
    return this.localStorage.ready().then(() => {
      return this.localStorage.get(key);
      // .then(res => {
      //   if (res !== null) {
        //   data = res;
        // } else {
        //   data = false;
        //   this.localStorage.set(key, data);
        // }
        // this.sharedLocalStorageData.next(data);
      // });
      // return this.sharedLocalStorageData;
    });
  }

  clearStore() {
    this.localStorage.ready().then(() => {
      this.localStorage.clear()
        .then(res => {
          console.log(`SUCCESS : ${res} response in clearing key/value store`);  
        })
        .catch(err => {
          console.log(`ERROR : ${err} response in clearing key/value store`); 
        });
    });
  }

  resetStore() {
    this.localStorage.ready().then(() => {
      // this.localStorage.forEach((value, key, index) => {
      //   if (key === 'isLoggedIn') {
      //     let qi = key;
      //     this.localStorage.remove(key)
      //       .then(res => {
      //         console.log(`SUCCESS : ${res} response while removing the key ${qi}`); 
      //       })
      //       .catch(err => {
      //         console.log(`ERROR : ${err} response while removing the key ${qi}`);
      //       });
      //   }
      //   // console.log("This is the value", value);
      //   // console.log("from the key", key);
      //   // console.log("index is", index);
      // });
      // this.localStorage.keys()
      //   .then(res => {
      //     console.log('Remaining keys ', res);
      //   })
      //   .catch(err => {
      //     console.log('Error in getting remaining keys ', err);
      //   });
      // let keys = ['isLoggedIn', 'memberInfo', 'contactInfo'];
      // keys.forEach(element => {
      //   let qi = element;
      //   this.localStorage.remove(element)
      //     .then(res => {
      //       console.log(`SUCCESS : ${res} response while removing the key ${qi}`); 
      //     })
      //     .catch(err => {
      //       console.log(`ERROR : ${err} response while removing the key ${qi}`);
      //     });
      // });
    });
  }

}
