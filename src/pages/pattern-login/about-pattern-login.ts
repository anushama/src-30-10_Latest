import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PatternLoginSetupPage } from '../pattern-login/pattern-login-setup';


/**
 * Generated class for the AboutPatternLoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-about-pattern-login',
  templateUrl: 'about-pattern-login.html',
})
export class AboutPatternLoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPatternLoginPage');
    //(<any>window).ADB.trackState('AboutPatternLoginPage', {'pageName':'AboutPatternLoginPage'});
  }
//back to previous page;
  popView() {
    this.navCtrl.pop();
  }

   setupPattern(){
    this.navCtrl.push(PatternLoginSetupPage);
  }

}
