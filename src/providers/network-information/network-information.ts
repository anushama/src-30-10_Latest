import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Network } from '@ionic-native/network';
/*
  Generated class for the NetworkInformationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class NetworkInformationProvider {

  public networkConnection: boolean;

  constructor(public http: Http, public network: Network) {
    console.log('Hello NetworkInformationProvider Provider');
  }

  getNetworkInformation() {
    console.log("getNetworkInformation");
    this.network.onDisconnect().subscribe((data) => {
      this.networkConnection = false;
    });
    this.network.onConnect().subscribe((data) => {
      this.networkConnection = true;
    });
    return this.networkConnection;
  }
}
