import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InboxPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {
  public headerParams: any;
  public pageNameParam: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pageNameParam = this.navParams.data;
    this.headerParams = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InboxPage');
  }

}
