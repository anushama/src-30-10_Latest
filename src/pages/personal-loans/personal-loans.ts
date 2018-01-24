import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PersonalLoansPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-personal-loans',
  templateUrl: 'personal-loans.html',
})
export class PersonalLoansPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalLoansPage');
    //Analytics
    (<any>window).ADB.trackState('PersonalLoansPage', {'pageName':'PersonalLoansPage'});

  }

}
