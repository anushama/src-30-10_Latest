import { Component, Renderer } from '@angular/core';
import { TermsConditionsPage } from '../../pages/terms-conditions/terms-conditions';
import { DepositsAgreementPage } from '../../pages/deposits-agreement/deposits-agreement';
import { NavController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the TermsConditionsPopupComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'security-terms-conditions',
  templateUrl: 'security-terms-conditions.html'
})
export class SecurityTermsConditionsComponent {
  public termsAcceptedUser: any;

  constructor(public renderer: Renderer, public viewCtrl: ViewController,
    private navCtrl: NavController, private localStorage: Storage) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup', true);
    console.log(' working');
  }

  ionViewDidEnter() {
    this.localStorage.get('securityTermsAcceptedUser').then((data) => {
      this.termsAcceptedUser = data;
    });
  }
  securityterms() {
    this.navCtrl.push(TermsConditionsPage);
  }
  securityDepositTerms() {
    console.log('deposit screen');
    this.navCtrl.push(DepositsAgreementPage);
  }
  setSecurityTCAcceptFlag() {
    this.localStorage.ready().then(() => {
      this.localStorage.set("TCAcceptFlag", true);
      this.localStorage.set("TCFlag", true);
    });
  }
  securityTermsAccept() {
    this.setSecurityTCAcceptFlag();
    let data = { 'readonly': true, 'userName': this.termsAcceptedUser, 'acceptence': true };
    this.viewCtrl.dismiss(data);
  }
}
