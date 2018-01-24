import { Injectable } from '@angular/core';
import { AlertController, Platform } from "ionic-angular";

@Injectable()
export class Utility {
  adb: any;
  constructor(private alertCtrl: AlertController, private platform: Platform) {
    this.adb = (<any>window).ADB;

  }
  trackPage(pageName: String) {
    if (this.adb) {
      this.adb.trackState('PageView', { 'pageName': pageName });
    }
  }

  trackAction(pageName: String, buttonName: String) {
    if (this.adb) {
      this.adb.trackAction('customLink', { 'buttonName': pageName + '|' + buttonName, 'customLinkPageName': pageName });
    }
  }
  trackError(pageName: String, errorMessage: String) {
    if (this.adb) {
      this.adb.trackAction('TrackError', { 'errorMessage': pageName + '|' + errorMessage, 'trackErrorPageName': pageName, 'customEvent': 'TrackError' });
    }
  }
  trackAlert(pageName: String, alertMessage: String) {
    if (this.adb) {
      this.adb.trackAction('TrackAlert', { 'alertMessage': pageName + '|' + alertMessage, 'trackAllertPageName': pageName, 'customEvent': 'TrackAlert' });
    }
  }

  displayNCUACert() {
    // TODO: Build Modal to show NCUA Insured Certification
    //console.log('TODO: Build Modal to show NCUA Insured Certification');
    // let ncuaCert = this.modalCtrl.create(NCUACert);
    // ncuaCert.present();
    let msg = '<div class="alertBorder"><div class="alertmsg"><p>Your savings federally insured to at least $250,000 and backed by the full faith and credit of the United States Government</p><h4 class="font-effect-emboss">NCUA</h4><p>National Credit Union Administration, a U.S.Government Agency</p></div></div>';
    let alert = this.alertCtrl.create({
      title: "",
      subTitle: msg,
      cssClass: 'ncua-alert',
      buttons: [
        {
          text: 'OK',
          role: 'OK'
        }
      ]
    });
    alert.present();
    this.platform.pause.subscribe(() => {
      alert.dismiss();
    });
  }

  showAlert(title, subtitle, msg, buttonText, callback?, callbackParam?) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      message: msg,
      buttons: [
        {
          text: buttonText,
          role: 'OK',
          handler: () => {
            if (callback != undefined) {
              if(callbackParam != undefined && callbackParam != "") callback(callbackParam);
              else callback();
            }
            console.log('triggerd!');
          }
        }
      ]
    });
    alert.dismiss();
    alert.present();
    this.platform.pause.subscribe(() => {
      alert.dismiss();
    });
  }

  showConfirmDialg(title, subtitle, message, buttonText1, buttonText2, callback, callbackParam?, callback1?, callback1Param?) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      message: message,
      buttons: [
        {
          text: buttonText1,
          role: 'cancel',
          handler: () => {
            if (callback1 != undefined) {
              if(callback1Param != undefined && callback1Param != "") callback1(callback1Param);
              else callback1();
            }
            console.log('Cancel clicked');
          }
        },
        {
          text: buttonText2,
          handler: () => {
            if(callbackParam != undefined && callbackParam != "") callback(callbackParam);
            else callback();
          }
        }
      ]
    });
    alert.dismiss();
    alert.present();
    this.platform.pause.subscribe(() => {
      alert.dismiss();
    });
  }

  showDialg(title, subtitle, message, buttonText1, buttonText2, phoneNumber) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      message: message,
      buttons: [
        {
          text: buttonText1,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: buttonText2,
          handler: () => {
            if (phoneNumber !== '') window.open('tel:' + phoneNumber);
          }
        }
      ]
    });
    alert.present();
    alert.dismiss();
    this.platform.pause.subscribe(() => {
      alert.dismiss();
    });
  }

  public generatePublicPrivateKeys(isPatternSetup,patternCode){
    var privatePem:any;
    let key_size = 512;
    let public_exp:string = "10001";			//65537 in hex
    let keypair = new (<any>window).RSAKey();
    (<any>window).RSAGenerate(key_size,public_exp);

     if (isPatternSetup == true){
      let privateKeyUnencryptedVal = (<any>window).getPrivateKeyData(); //private key created by the library
      privatePem = (<any>window).forge.pki.encryptRsaPrivateKey(privateKeyUnencryptedVal, patternCode); // encrypted private key created by the library

     }else{
      privatePem = (<any>window).privatePEM();
     }
     let objKeys = {
      privatePem: privatePem,
      publicKeyPem:(<any>window).publicPEM()
     };
     return objKeys;

  }
}
