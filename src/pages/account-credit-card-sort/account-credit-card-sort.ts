import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AccountCreditCardSortPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account-credit-card-sort',
  templateUrl: 'account-credit-card-sort.html',
})
export class AccountCreditCardSortPage {
  public filterSort:any={sort:null,filter:null}
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.filterSort.sort = navParams.get('sort');
    this.filterSort.filter = navParams.get('filter');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountCreditCardSortPage');
    
  }
  updateSort(){
    this.viewCtrl.dismiss(this.filterSort);
  }

}
