import { Injectable } from '@angular/core';
import { NativeStorage } from "@ionic-native/native-storage";
import { Storage } from '@ionic/storage';
import {AppSettings} from "../../pages/core/app-settings";

@Injectable()
export class StorageProvider {

  constructor(public storage: NativeStorage, public localStorage : Storage, public appSettings : AppSettings) {
    console.log('Hello StorageProvider Provider');
  }
  writeToStorage(key: string, value: any) {
    if(this.appSettings.isAndroid() || this.appSettings.isIOS()) {
      this.storage.setItem(key, value);
    } else {
      this.localStorage.set(key, value);
    }
  }

  removeFromStorage(key) {
    if(this.appSettings.isAndroid() || this.appSettings.isIOS()) {
      this.storage.remove(key);
    } else {
      this.localStorage.remove(key);
    }
  }

  readFromStorage(key) {
    if(this.appSettings.isAndroid() || this.appSettings.isIOS()) {
      return this.storage.getItem(key)
        .then(
          data => {
            return data;
          },
          error => {
            console.log("Storage Read Error" + JSON.stringify(error));
            return null;
          });
    } else {
      return this.localStorage.get(key)
        .then(
          data => {
            return data;
          },
          error => {
            console.log("Storage Read Error" + JSON.stringify(error));
            return null;
          });
    }



  }

  clearStorage() {
    if(this.appSettings.isAndroid() || this.appSettings.isIOS()) {
      this.storage.clear();
      this.writeToStorage("TCFlag", true)
    } else {
      this.localStorage.clear();
      this.writeToStorage("TCFlag", true)
    }
  }
}
