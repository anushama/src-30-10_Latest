import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import {AccountsPage} from '../accounts/accounts'
//import {AccountListItemComponent} from '../accounts/account-list-item'
import { ProductsExploreProvider} from '../../providers/products-explore/products-explore';
import { SessionManager } from '../core/session-manager';


/**
 * Generated class for the ExplorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html',
})
export class ExplorePage {
  public exploreProduct: any;
  //public checkSaveAccount: any;

//    private sessionManager:any;
   public checkSaveAccounts:any = [];
   public loanAccounts:any =[];
   public cards:any=[];


  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public productsExploreProvider:ProductsExploreProvider,private sessionManager:SessionManager) { //
    this.getProductsExplore(); 
 }
  /*ngOnInit(){
  this.getProductsExplore();

  }*/

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExplorePage');
  }

 getProductsExplore(){
    //    this.sessionManager = SessionManager.singletonInstance(); 

   console.log('getProductsExplore... ExplorePage');
  // let products;
   this.productsExploreProvider.getProducts().subscribe(
      result=>{ 
         this.sessionManager.exploreList=result;

       console.log('Result in Explore ExplorePage');
        // products = result;
      console.log("products loading-- this.sessionManager.exploreList****",this.sessionManager.exploreList);
      this.checkSaveAccounts= this.sessionManager.exploreList.checkSaveAccounts;
        this.loanAccounts = this.sessionManager.exploreList.Loans;       
        this.cards = this.sessionManager.accountsList.cards;
       

      return this.sessionManager.exploreList;
         },
      err =>{
        console.error('Error in Explore page',err);
      }
   )


 }
}
