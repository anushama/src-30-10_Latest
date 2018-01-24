import { Component, Renderer } from '@angular/core';
import { NavController, ViewController,NavParams } from 'ionic-angular';

/**
 * Generated class for the FilterLocationComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'filter-location',
  templateUrl: 'filter-location.html'
})
export class FilterLocationComponent {
  public locationObj: any;
  //public checkSaveAccountsToggleStatus: any = [];
  public hourToggleStatus: any ;
  public branchToggleStatus: any ;
    public accessToggleStatus: any;
  public initToggleStatus: any =[];
  private refreshData: boolean = false;

  constructor(public renderer: Renderer, public viewCtrl: ViewController,
    private navCtrl: NavController,private navParams: NavParams) {
      this.renderer.setElementClass(viewCtrl.pageRef().nativeElement, 'my-popup', true);
      console.log('Hello FilterLocationComponent Component'); 
      /*this.initToggleStatus=[
        this.hourToggleStatus= this.hourToggleStatus,
        this.branchToggleStatus=this.branchToggleStatus
      ];*/
      // if(this.accessToggleStatus == undefined) {
      //   this.accessToggleStatus = this.navParams.get('accessToggleStatus');
      // }
      this.hourToggleStatus = this.navParams.get('hourToggleStatus'); 
      this.accessToggleStatus = this.navParams.get('accessToggleStatus');
      this.branchToggleStatus = this.navParams.get('branchToggleStatus');
  }

  popView(){
    this.navCtrl.pop();
  }


  filterLocation(){
    console.log("this.hourToggleStatus..."+this.hourToggleStatus);
    this.dismiss();
   }
  dismiss(){
    let obj ={
      hourToggleStatus: this.hourToggleStatus,
      branchToggleStatus:this.branchToggleStatus,
      accessToggleStatus:this.accessToggleStatus
    };
    this.viewCtrl.dismiss(obj);
  }


}
