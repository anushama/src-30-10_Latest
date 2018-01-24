import { Component, Input, OnInit} from '@angular/core';
import { TermsConditionsPage } from '../../pages/terms-conditions/terms-conditions';
import { NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
/**
 * Generated class for the FooterComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'pf-footer',
  templateUrl: 'footer.html'
})
export class FooterComponent{
  @Input() public footerType:string = "footerLegal";
  public deviceClasses;
  constructor(public navCtrl: NavController, public platform: Platform) {
    /*platform.ready().then(() => {
      if(this.platform.is('ios')){
        console.log('ios device');
      }
      else if(this.platform.is('android')){
        console.log('android device');
      }
    });*/
  }
  /*ngOnInit(){
    this.getDeviceClass(device);
  }
  getDeviceClass(device: string){
    let cssClass;
    let iosDevice = "this.isMobile.ios()";
    let androidDevice = "this.isMobile.android()";
    if(device == iosDevice){
      cssClass="ios-footer";
      console.log("ios device");
    }
    else if(device == androidDevice){
      cssClass="android-footer";
      console.log("android device");
    }
  }*/
  
  
  

  gotoTermsAndConditions() {
    this.navCtrl.push(TermsConditionsPage);
  }
  
}
