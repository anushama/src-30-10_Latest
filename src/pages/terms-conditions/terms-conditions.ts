/*
    DATE        INI     DESCRIPTION
 2017-08-31     LFR     Implementation for ContentSync
*/

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utility } from '../core/utility';
import { ContentSyncExec } from "../../providers/content-sync-exec";


@IonicPage()
@Component({
  selector: 'page-terms-conditions',
  templateUrl: 'terms-conditions.html',
})
export class TermsConditionsPage {

  public termsAcond;
  public rxContent = false;

  ngOnInit() {
    console.log('TermsConditionsPage: going to req data from api');

    this.rxContent = false;

    this.contentSync.getContent('terms-conditions').
      subscribe(rxData => {
        this.termsAcond = rxData.data;
        this.rxContent = true;
      },
      error => <any>error);
  }


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private utility: Utility, public contentSync: ContentSyncExec) { }


  ionViewDidLoad() {
    //Analytics
    this.utility.trackPage('TermsConditionsPage');
    console.log('ionViewDidLoad TermsConditionsPage');
  }
  
  backToLogin() {
    this.navCtrl.pop()
  }

}
