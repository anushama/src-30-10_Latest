import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the BranchDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-branch-details',
  templateUrl: 'branch-details.html',
})
export class BranchDetailsPage {
  private ATMDetails: any;
  private locationId: any;
  private locationDetails: any;
  private currentLatitude: any;
  private currentLongitude: any;
  private branchLatLng: any;
  private destinationLatitude;
  private destinationLongitude;
  private list;
  private title;
  public locationName:any;
  private serviceStringArr;
  private serviceString :any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, private launchNavigator: LaunchNavigator, public geolocation: Geolocation, ) {



    this.locationDetails = this.navParams.get("atmBranchData");
    let latVal = this.locationDetails.address.lat;
    let longVal = this.locationDetails.address.long;

    // this.branchLatLng= new google.maps.LatLng(latVal,longVal);
    this.ATMDetails = this.locationDetails;
    this.serviceStringArr = this.ATMDetails.services.service;
   if (typeof this.serviceStringArr === "string") {
        this.serviceString = this.serviceStringArr;
   }
    this.list = this.locationDetails.attributes.attribute;
    for(let i=0;i<this.list.length;i++)
      {
        if(this.list[i].key == "LocationName") {
          this.locationName = this.list[i].content;
        }
        if(this.list[i].key == "LocationType")
          {
            if(this.list[i].content == "ATM")
              {
                this.title = "ATM DETAILS";
              }
              else if(this.list[i].content == "BRANCH")
              {
                this.title = "BRANCH DETAILS";
              }
          }
      }
    this.destinationLatitude = this.locationDetails.address.lat;
    this.destinationLongitude = this.locationDetails.address.long;

    console.log("latitude and longitude", this.destinationLatitude, this.destinationLongitude);
    //   this.branchLatLng= new google.maps.LatLng(this.destinationLatitude,this.destinationLongitude);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BranchDetailsPage');
  }
  popView() {
    this.navCtrl.pop();
  }

  getCurrentLocationDetails() {
    let options = {timeout: 5000, enableHighAccuracy: true};
    this.geolocation.getCurrentPosition(options).then((data) => {
      console.log('My latitude : ', data.coords.latitude);
      console.log('My longitude: ', data.coords.longitude);
      this.currentLatitude = data.coords.latitude;
      this.currentLongitude = data.coords.longitude;
    }, err => {
      console.log('current location not enabled');
    });
  }

  getDirection() {
    //     this.getCurrentLocationDetails();
    //alert(this.currentLongitude);
    this.launchNavigator.navigate([this.destinationLatitude, this.destinationLongitude], {
      //start: [this.currentLatitude,this.currentLongitude]
    });

  }


}
