import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController} from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-accounttopayto',
  templateUrl: 'accounttopayto.html',
})
export class AccounttopaytoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCntrl : ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccounttopaytoPage');
  }

  closeModal(){
    this.viewCntrl.dismiss();
  }

}
