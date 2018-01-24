import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  Slides, ViewController } from 'ionic-angular';
//import { StatusBar } from '@ionic-native/status-bar';
//import { SplashScreen } from '@ionic-native/splash-screen';
//import { HttpModule } from "@angular/http";
import {ProductServiceProvider} from '../../providers/product-service/product-service';
/**
 * Generated class for the SavingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-savings',
  templateUrl: 'savings.html',
})
export class SavingsPage {

    savingsData: any;
    theClickedIndex: number;
    name: any;
    text: any;
    features: any;
    featuresText: any;
    nextSlide: String;
    prevSlide:String;
    @ViewChild(Slides) slider: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private savingsProvider:ProductServiceProvider,public viewCtrl: ViewController) {
       this.getSavingsProduct();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SavingsPage');
    //Analytics
    (<any>window).ADB.trackState('SavingsPage', {'pageName':'SavingsPage'});

    this.getSavingsProduct();
  }

   getSavingsProduct(){
        let products;
        return this.savingsProvider.getProducts().subscribe(
        result => { products = result;
            console.log("products loading",products);
            this.savingsData = products.filter(function(el) {

            return el.categoryId == 5;
            });
            console.log('rel', this.savingsData[0])
            return this.savingsData.length > 0 ? true :false;
            })
    }

}
