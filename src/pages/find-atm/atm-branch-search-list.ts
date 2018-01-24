import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { BranchDetailsPage } from '../find-atm/branch-details';
import { FindAtmProvider } from '../../providers/find-atm/find-atm';
import { ErrorMessages } from '../../config/global-config';
import { Utility } from '../core/utility';
import { FindAtmPage } from '../find-atm/find-atm';
declare var google: any;

@Component({
  selector: 'page-atm-branch-search-list',
  templateUrl: 'atm-branch-search-list.html',
})
export class AtmBranchSearchListPage {
   private atmBranchList: any = [];
  private atmSearchDetails: any;
  public searchInput: any;
  public geocoder: any;
  private atmBranchLocations: any;
  private latitude: any;
  private longitude: any;
  public findAtm: FindAtmPage;
 public searchInputLength: any =0;

    constructor(public navCtrl: NavController, public navParams: NavParams, 
      private platform: Platform,private utility: Utility,
      private findAtmService: FindAtmProvider,) {
      this.atmBranchLocations = this.navParams.get('searchDetails');
      this.atmSearchDetails =this.atmBranchLocations.locations.location;
      this.atmBranchList= this.navParams.get('atmArr');
    this.searchInput = this.navParams.get('searchInput');
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AtmBranchSearchDetailsPage');
  }
  
  public focus(searchInput: string) {
    this.searchInputLength = searchInput.length;
  }
  public changeIcon() {
    this.searchInputLength = 0;
  }
  public clear(){
    this.searchInput = null;
    this.searchInputLength =0;
  }

  private goToATMDetails(item) {
    let filteredObj = this.atmSearchDetails.filter(function (obj) {
      return obj.id == item.LocationID
    });
    
    let selectedATM:any;
    if (filteredObj.length>0){
      selectedATM = filteredObj[0];
    }
    this.navCtrl.push(BranchDetailsPage, { atmBranchData:selectedATM });
  }

  goToMap() {
    this.searchInput = null;
    this.navCtrl.pop();
  }

  private getATMBranchDetails(typeData: string) {
    let reqObject = {
      postalCode: "",
      addressLine: "",
      city: "",
      state: "",
      country: "",
      offset: "",
      latitude: this.latitude,
      longitude: this.longitude,
      type: typeData
    };
    //Service call
    this.getATMBranch(reqObject);
  }

  goToInputSearchAddress(searchInput: string) {
    this.searchInput = searchInput;
    this.findAtmService.listSearchInput = this.searchInput;
    console.log("this.searchInput.." + this.searchInput);
    let thisObj = this;
    if (!searchInput) {
     this.alertForSearchNotEntered();
      return;
    }
    this.platform.ready().then(() => {
      this.geocoder = new google.maps.Geocoder();
      console.log("this.geocoder-" + this.geocoder);
      this.geocoder.geocode({ 'address': searchInput }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
         // let location = results[0].geometry.location;
           let location = results[0].geometry.location.toJSON();

          thisObj.latitude = location.lat;
          thisObj.longitude = location.lng;
          let tempType: string = "";
          thisObj.getATMBranchDetails(tempType);
          //thisObj.searchLocObj = results[0].geometry.location;
        }
        else {
          thisObj.alertForLocationNotFound();
          return;
        }
      });
      //this.searchSetZoomStatus = false;
    });
    
  }

  alertForSearchNotEntered() {
    this.utility.showAlert(ErrorMessages.POPUP_TTILE, '', ErrorMessages.ATM_ENTER_LOCATION, ErrorMessages.BUTTON_OK);
  }

  alertForLocationNotFound() {
    this.utility.showAlert(ErrorMessages.POPUP_TTILE, '', ErrorMessages.ATM_LOCATION, ErrorMessages.BUTTON_TRY_AGAIN);
  }

  private getATMBranch(reqObj: any) {
    this.atmBranchList = [];
    this.findAtmService.getATMBranchDetails(reqObj).subscribe(
      result => {
        this.atmBranchLocations = result;
        this.findAtmService.atmSearchList = this.atmBranchLocations;
        console.log("In list page ",this.findAtmService.atmSearchList);
        if (this.atmBranchLocations.locations.status !== "No Results Found.") {
          console.log("searchDetails in getATMBranch" + this.atmBranchLocations);
          let locations = this.atmBranchLocations.locations.location;
          this.atmSearchDetails = this.atmBranchLocations.locations.location;
          let locationObjlen = locations.length;

          for (var i = 0; i < locationObjlen; ++i) {
            let atribArray = locations[i].attributes.attribute;
            let formattedArray = atribArray.map(function (obj) {
              var rObj = {};
              rObj[obj.key] = obj.content;
              return rObj;
            });
            let atmLOcationObj = formattedArray.reduce(function (result, currentObject) {
              for (var key in currentObject) {
                if (currentObject.hasOwnProperty(key)) {
                  result[key] = currentObject[key];
                }
              }
              return result;
            }, {});
            this.atmBranchList.push(atmLOcationObj);
            
          }
         this.changeIcon();
        }
        else {
         
          console.log("data not available");
        }
      },
      err => {
        console.error('Error', err);
      })
  }

}
