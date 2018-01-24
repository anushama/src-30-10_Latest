import { Component } from '@angular/core';
import { App,IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { BillpaySortFiltersPage } from '../../pages/billpay-sort-filters/billpay-sort-filters'
/**
 * Generated class for the ShowAllEbillsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-show-all-ebills',
  templateUrl: 'show-all-ebills.html',
})
export class ShowAllEbillsPage {
  public eBills: any;
  public selectedSortOption:any;
  public order :any;
  public ascending = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,public app: App,public modalCtrl: ModalController) {
    this.eBills = this.navParams.get("totalEBillsResponse");
    //this.eBillsDataRefactor(this.eBills);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowAllEbillsPage');
  }
  // eBillsDataRefactor(eBills){
  //
  // }
  // // openSortOptions(){
  // //   this.app.getRootNav().push(BillpaySortFiltersPage, {viewOptions: ''});
  // // }

  openSortOptions(){
    let profileModal = this.modalCtrl.create(BillpaySortFiltersPage, {viewOptions: '',order:this.order,ascending:this.ascending});
    profileModal.onDidDismiss(data => {
      if (data != undefined && data != null) {
        console.log(data);
        this.order = data;
        if(this.order == "payeeNameAsc"){
          this.order = "payeeName";
          this.ascending = true;
        }else if(this.order == "payeeNameDesc"){
          this.order = "payeeName";
          this.ascending = false;
        }else{
          this.order = data
          this.ascending = false;
        }
      } else {
        return false;
      }
    });
    profileModal.present();
  }
}
