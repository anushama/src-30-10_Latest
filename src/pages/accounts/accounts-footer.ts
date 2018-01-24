import { Component } from '@angular/core';
import { NavParams, NavController, ModalController, Platform } from "ionic-angular";

// @Component({
//   selector:'ncua-cert',
//   template:`<h1> Federally Insured by NCUA`
// })
// export class NCUACert{
//   constructor(public viewCtrl: ViewController){
//     console.log('Showing NCUA Certification')
//   }
// }

@Component({
  selector: 'accounts-footer',
  templateUrl: 'accounts-footer.html'
})
export class AccountsFooterComponent{
  public pfDate:object;  
  public footerParams:object;
  constructor(private platform: Platform, public navParams: NavParams, public navCtrl: NavController, public modalCtrl:ModalController){
    this.footerParams = this.navParams;
    this.pfDate = new Date(); 
  }
}
