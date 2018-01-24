import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiEndpointProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ApiEndpointProvider {

  public ApiEndpoint:string = "https://mobile-qa.penfed.org/webapp";
  // public ApiEndpoint:string = "https://mobile-dev.penfed.org/webapp";

  // version%3D3%2E0%2E0%2E0%5F5%26pm%5Ffpua%3Dmozilla%2F5%2E0%20%28linux%3B%20android%206%2E0%3B%20nexus%205%20build%2Fmra58n%29%20applewebkit%2F537%2E36%20%28khtml%2C%20like%20gecko%29%20chrome%2F55%2E0%2E2883%2E95%20mobile%20safari%2F537%2E36%7C5%2E0%20%28Linux%3B%20Android%206%2E0%3B%20Nexus%205%20Build%2FMRA58N%29%20AppleWebKit%2F537%2E36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F55%2E0%2E2883%2E95%20Mobile%20Safari%2F537%2E36%7CMacIntel%26pm%5Ffpsc%3D24%7C400%7C671%7C671%26pm%5Ffpsw%3D%26pm%5Ffptz%3D%2D4%26pm%5Ffpln%3Dlang%3Den%2DUS%7Csyslang%3D%7Cuserlang%3D%26pm%5Ffpjv%3D0%26pm%5Ffpco%3D1%26pm%5Ffpasw%3D%26pm%5Ffpan%3DNetscape%26pm%5Ffpacn%3DMozilla%26pm%5Ffpol%3Dtrue%26pm%5Ffposp%3D%26pm%5Ffpup%3D%26pm%5Ffpsaw%3D400%26pm%5Ffpspd%3D24%26pm%5Ffpsbd%3D%26pm%5Ffpsdx%3D%26pm%5Ffpsdy%3D%26pm%5Ffpslx%3D%26pm%5Ffpsly%3D%26pm%5Ffpsfse%3D%26pm%5Ffpsui%3D%26pm%5Fos%3DAndroid%26pm%5Fbrmjv%3D55%26pm%5Fbr%3DChrome%26pm%5Finpt%3D%26pm%5Fexpt%3D


// Ramesh Local Token version%3D3%2E0%2E0%2E0%5F5%26pm%5Ffpua%3Dmozilla%2F5%2E0%20%28iphone%3B%20cpu%20iphone%20os%209%5F1%20like%20mac%20os%20x%29%20applewebkit%2F601%2E1%2E46%20%28khtml%2C%20like%20gecko%29%20version%2F9%2E0%20mobile%2F13b143%20safari%2F601%2E1%7C5%2E0%20%28iPhone%3B%20CPU%20iPhone%20OS%209%5F1%20like%20Mac%20OS%20X%29%20AppleWebKit%2F601%2E1%2E46%20%28KHTML%2C%20like%20Gecko%29%20Version%2F9%2E0%20Mobile%2F13B143%20Safari%2F601%2E1%7CMacIntel%26pm%5Ffpsc%3D24%7C375%7C667%7C667%26pm%5Ffpsw%3D%26pm%5Ffptz%3D%2D4%26pm%5Ffpln%3Dlang%3Den%2DUS%7Csyslang%3D%7Cuserlang%3D%26pm%5Ffpjv%3D0%26pm%5Ffpco%3D1%26pm%5Ffpasw%3D%26pm%5Ffpan%3DNetscape%26pm%5Ffpacn%3DMozilla%26pm%5Ffpol%3Dtrue%26pm%5Ffposp%3D%26pm%5Ffpup%3D%26pm%5Ffpsaw%3D375%26pm%5Ffpspd%3D24%26pm%5Ffpsbd%3D%26pm%5Ffpsdx%3D%26pm%5Ffpsdy%3D%26pm%5Ffpslx%3D%26pm%5Ffpsly%3D%26pm%5Ffpsfse%3D%26pm%5Ffpsui%3D%26pm%5Fos%3DMac%26pm%5Fbrmjv%3DNaN%26pm%5Fbr%3DMozilla%26pm%5Finpt%3D%26pm%5Fexpt%3D

  public uniqueToken:string = "version%3D3%2E0%2E0%2E0%5F5%26pm%5Ffpua%3Dmozilla%2F5%2E0%20%28iphone%3B%20cpu%20iphone%20os%209%5F1%20like%20mac%20os%20x%29%20applewebkit%2F601%2E1%2E46%20%28khtml%2C%20like%20gecko%29%20version%2F9%2E0%20mobile%2F13b143%20safari%2F601%2E1%7C5%2E0%20%28iPhone%3B%20CPU%20iPhone%20OS%209%5F1%20like%20Mac%20OS%20X%29%20AppleWebKit%2F601%2E1%2E46%20%28KHTML%2C%20like%20Gecko%29%20Version%2F9%2E0%20Mobile%2F13B143%20Safari%2F601%2E1%7CMacIntel%26pm%5Ffpsc%3D24%7C375%7C667%7C667%26pm%5Ffpsw%3D%26pm%5Ffptz%3D%2D4%26pm%5Ffpln%3Dlang%3Den%2DUS%7Csyslang%3D%7Cuserlang%3D%26pm%5Ffpjv%3D0%26pm%5Ffpco%3D1%26pm%5Ffpasw%3D%26pm%5Ffpan%3DNetscape%26pm%5Ffpacn%3DMozilla%26pm%5Ffpol%3Dtrue%26pm%5Ffposp%3D%26pm%5Ffpup%3D%26pm%5Ffpsaw%3D375%26pm%5Ffpspd%3D24%26pm%5Ffpsbd%3D%26pm%5Ffpsdx%3D%26pm%5Ffpsdy%3D%26pm%5Ffpslx%3D%26pm%5Ffpsly%3D%26pm%5Ffpsfse%3D%26pm%5Ffpsui%3D%26pm%5Fos%3DMac%26pm%5Fbrmjv%3DNaN%26pm%5Fbr%3DMozilla%26pm%5Finpt%3D%26pm%5Fexpt%3D";

  constructor(public http: Http) {
    console.log('Hello ApiEndpointProvider Provider');
  }
  getEndpoint(){
    return this.ApiEndpoint;
  }
  getToken(){
    return this.uniqueToken;
  }
}
