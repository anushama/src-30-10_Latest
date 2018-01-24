import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { Utility } from "../core/utility";

@IonicPage()
@Component({
  selector: 'page-find-reality-agent-success',
  templateUrl: 'find-reality-agent-success.html',
})
export class FindRealityAgentSuccessPage {

  constructor(private util: Utility, private navCtrl: NavController,private platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindRealityAgentSuccessPage');
  }
  navBackToContactUS() {
    this.navCtrl.popTo(this.navCtrl.getByIndex(0));
  }
}
