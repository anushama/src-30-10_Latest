import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-accounttopayfrom',
  templateUrl: 'accounttopayfrom.html',
})
export class AccounttopayfromPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCntrl : ViewController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccounttopayfromPage');
  }

  closeModal(){
    this.viewCntrl.dismiss();
  }

}
