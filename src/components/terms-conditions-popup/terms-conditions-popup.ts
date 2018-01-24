import { Component, Renderer } from '@angular/core';
import { TermsConditionsPage } from '../../pages/terms-conditions/terms-conditions';
import { MobileDepositTermsPage } from '../../pages/mobile-deposit-terms/mobile-deposit-terms';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'terms-conditions-popup',
  templateUrl: 'terms-conditions-popup.html'
})
export class TermsConditionsPopupComponent {

  constructor(public renderer: Renderer, public viewCtrl: ViewController,
    private navCtrl: NavController) {
    this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup', true);
    console.log(' working');
  }


  terms() {
    this.navCtrl.push(TermsConditionsPage);
  }
  deposit() {
    console.log('deposit screen');
    this.navCtrl.push(MobileDepositTermsPage);
  }

  accept() {
    let data = {'acceptence': true };
    this.viewCtrl.dismiss(data);
  }
}
