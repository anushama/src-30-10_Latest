import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, Platform, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { FindAtmProvider } from '../../providers/find-atm/find-atm';
import { AtmBranchSearchListPage } from '../../pages/find-atm/atm-branch-search-list';
import { FilterLocationComponent } from '../../components/filter-location/filter-location';
import { BranchDetailsPage } from '../find-atm/branch-details';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { ErrorMessages } from '../../config/global-config';
import { Utility } from '../core/utility';
import { StorageProvider } from "../../providers/storage/storage";
declare var google: any;

@Component({
  selector: 'page-find-atm',
  templateUrl: 'find-atm.html'
})
export class FindAtmPage {
  @ViewChild('map') mapContainer: ElementRef;
  private map: any;
  private atmLocations: any = [];
  private atmBranchDetails: any;
  private details;
  //Set default lat/long
  private latitude: number = 38.895112;
  private longitude: number = -77.036366;
  private hourToggleStatus: any;
  private branchToggleStatus: any;
  private accessToggleStatus: boolean = true;
  private dogwalkMarker;
  private markers: any = [];
  private lastOpenedInfoWindow: any;
  private setZoom: boolean = false;
  private currentLocation: boolean = false;
  public searchInput: any;
  public geocoder: any;
  public searchSetZoomStatus: boolean = false;
  public searchLocObj: any;
  public atmLocationsList: any = null;
  public atmSearchDetails:any = null;
  public searchInputLength: any =0;
   private maxDistanceMeter:Number=0;
   private maxZoom:Number = 19;

  constructor(public navCtrl: NavController, private findAtmService: FindAtmProvider,
    private geolocation: Geolocation,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private platform: Platform,

    private launchNavigator: LaunchNavigator, private utility: Utility, private storageService: StorageProvider) {
     
     
  }

  ionViewDidLoad() {
    this.getATMBranchkLocationInfo();  
  }

  ionViewWillEnter() {
      this.searchInput = null;
      console.log("After coming back",this.findAtmService.atmSearchList);
      if(this.findAtmService.atmSearchList != null) {
        this.searchInput = this.findAtmService.listSearchInput;
        let typeObj:string = "";
        this.getATMBranchDetails(typeObj);
       //this.getATMBranchkLocationInfo();
      }  
  }

  // Checking whether location service is enabled or not
  private getATMBranchkLocationInfo() {
    this.platform.ready().then(() => {
      let options = { timeout: 5000, enableHighAccuracy: true };
      this.storageService.writeToStorage('byPassLogout', true);
      this.geolocation.getCurrentPosition(options).then((data) => {
        console.log('My latitude : ', data.coords.latitude);
        console.log('My longitude: ', data.coords.longitude);
        this.latitude = data.coords.latitude;
        this.longitude = data.coords.longitude;
        this.searchLocObj = new google.maps.LatLng(this.latitude, this.longitude);
        this.currentLocation = true;
        this.setupMap(this.latitude, this.longitude,null);

        let typeObj: string = "";
        this.getATMBranchDetails(typeObj);
      }, err => {
        this.displayDefaultLocation(err);
        console.log("entered into error blocks");
      });
    });
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
    if (this.findAtmService.atmSearchList != null){
      this.atmBranchDetails = this.findAtmService.atmSearchList;
     // 
     this.atmLocations = [];
     this.clearMarker();
      
      this.prepareLocationObject();
    }else{
       //Service call
      this.getATMBranch(reqObject);
    }
   
  }
  //focus
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
  // Functinality for Input search address
  public goToInputSearchAddress(searchInput: string) {
    
    this.searchInput = searchInput;
    console.log("this.searchInput.." + this.searchInput);
    console.log("Enterd through list page");
    let thisObj = this;
    this.clearMarker();
    if (!searchInput) {
      this.alertForSearchNotEntered();
      return;
    }
    this.platform.ready().then(() => {
      this.geocoder = new google.maps.Geocoder();
      console.log("this.geocoder-" + this.geocoder);
      this.geocoder.geocode({ 'address': searchInput }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          
         // let location = results[0].geometry.location
         let location = results[0].geometry.location.toJSON();
         
          thisObj.latitude = location.lat;
          thisObj.longitude = location.lng;
          let tempType: string = "";
          thisObj.getATMBranchDetails(tempType);
          thisObj.searchSetZoomStatus = true;
          thisObj.searchLocObj = location;//results[0].geometry.location;
          
        }
        else {
          thisObj.alertForLocationNotFound();
          return;
        }
      });
      this.searchSetZoomStatus = false;
    });
    
  }

  alertForSearchNotEntered() {
    this.utility.showAlert(ErrorMessages.POPUP_TTILE, '', ErrorMessages.ATM_ENTER_LOCATION, ErrorMessages.BUTTON_OK);
  }

  alertForLocationNotFound() {
    this.utility.showAlert(ErrorMessages.POPUP_TTILE, '', ErrorMessages.ATM_LOCATION, ErrorMessages.BUTTON_TRY_AGAIN);
  }

  private displayDefaultLocation(err:any) {
     let typeObj: string = "";
    this.getATMBranchDetails(typeObj);
    if(err.code != 3)
    this.utility.showAlert(ErrorMessages.POPUP_TTILE, '', ErrorMessages.ATM_ENABLE_LOCATION, ErrorMessages.BUTTON_OK);
  }

  // Getting Location details
  private getATMBranch(reqObj: any) {
    this.atmLocations = [];
    this.findAtmService.getATMBranchDetails(reqObj).subscribe(
      result => {
        this.atmBranchDetails = result;
  
        this.prepareLocationObject();
      },
      err => {
        console.error('Error', err);
      })
  }
 private prepareLocationObject(){
  
 if (this.atmBranchDetails.locations.status !== "No Results Found.") {
          console.log("searchDetails in getATMBranch" + this.atmBranchDetails);
       let startLong = this.atmBranchDetails.locations.StartLongitude;
        let startLat = this.atmBranchDetails.locations.StartLatitude;
        var zoomLevel:Number = 15;
          let locations = this.atmBranchDetails.locations.location;
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
            //Calculate zoom level
            zoomLevel =  this.calculateZoomLevel(parseInt(atmLOcationObj.DistanceMeters),parseFloat(atmLOcationObj.Distance));
            //ALL FALSE
            if (this.hourToggleStatus != true && this.accessToggleStatus != true && this.branchToggleStatus != true) {
            if (atmLOcationObj.RestrictedAccess != "Restricted Access" || !atmLOcationObj.RestrictedAccess) {
            this.atmLocations.push(atmLOcationObj);
            console.log("access- ON, hour- off " + atmLOcationObj);
            }
          }
            // ACCESS
            else if (this.accessToggleStatus == true && this.hourToggleStatus != true && this.branchToggleStatus != true) {
            if (atmLOcationObj.RestrictedAccess == "Restricted Access" || atmLOcationObj.RestrictedAccess == undefined) {
            this.atmLocations.push(atmLOcationObj);
            console.log("access- ON, hour- off " + atmLOcationObj);
            }
            }
            // HOURS
            else if (this.hourToggleStatus == true && this.accessToggleStatus != true && this.branchToggleStatus != true)  {
            if (atmLOcationObj.LimitedHours != true) {
            this.atmLocations.push(atmLOcationObj);
            console.log("hour- ON, access-off " + atmLOcationObj);
            }
            }
            //ACCESS & HOURS
            else if (this.accessToggleStatus == true && this.hourToggleStatus == true && this.branchToggleStatus != true) {            if ((atmLOcationObj.RestrictedAccess == "Restricted Access" || atmLOcationObj.RestrictedAccess == undefined) && atmLOcationObj.LimitedHours != true) {
            this.atmLocations.push(atmLOcationObj);
            console.log("Hour Access- ON " + atmLOcationObj);
            }
            }
            // HOURS & BRANCH
            else if (this.accessToggleStatus != true && this.hourToggleStatus == true && this.branchToggleStatus == true) {
            if (atmLOcationObj.LocationType == "BRANCH" && atmLOcationObj.LimitedHours != true) {
            this.atmLocations.push(atmLOcationObj);
            console.log("Hour Access- ON " + atmLOcationObj);
            }
            }
            // ACCESS & BRANCH
            else if (this.accessToggleStatus == true && this.hourToggleStatus != true && this.branchToggleStatus == true) {
            if (atmLOcationObj.LocationType == "BRANCH" && (atmLOcationObj.RestrictedAccess == "Restricted Access" || atmLOcationObj.RestrictedAccess == undefined)) {
            this.atmLocations.push(atmLOcationObj);
            console.log("Hour Access- ON " + atmLOcationObj);
            }
            }
            //ALL 3
            else if (this.accessToggleStatus == true && this.hourToggleStatus == true && this.branchToggleStatus == true) {
            if (atmLOcationObj.LocationType == "BRANCH" && (atmLOcationObj.RestrictedAccess == "Restricted Access" || atmLOcationObj.RestrictedAccess == undefined) && atmLOcationObj.LimitedHours != true) {
            this.atmLocations.push(atmLOcationObj);
            console.log("Hour Access- ON " + atmLOcationObj);
            }
            }
          }
           this.setupMap(startLat,startLong,zoomLevel);

              this.addMarkersToMap(this.atmLocations);

           this.findAtmService.atmSearchList = null;
           this.changeIcon();
        }
        else {
          this.addMarkersToMap("noData");
          console.log("data not available");
        }
 }

  // InfoWindow for locator
  private buildInfoDetailsWindow(marker, mark) {
    let contentString = '<div class="info-content"><span>' + mark.LocationName + '</span></div>';
    var content = document.createElement('div');
    content.className = "atm-info"
    content.innerHTML = (contentString);
    var button = content.appendChild(document.createElement('input'));
    button.type = 'button';
    button.id = 'showMoreButton';
    button.className = 'info-content';
    button.value = 'Details';
    button.addEventListener('click', () => {
      console.log("enterd into info method");
      console.log("marker....", mark);
      this.goToATMDetails(mark);
    });
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      if (this.lastOpenedInfoWindow) {
        this.lastOpenedInfoWindow.close();
      }
      this.lastOpenedInfoWindow = infoWindow;
      infoWindow.open(this.map, marker);
    });
    google.maps.event.addListener(this.map, 'click', () => {
      infoWindow.close(this.map, marker);
    });
  }

  // Adding Markers on Map
  private addMarkersToMap(markers) {
    console.log("Entered into addmarkerTo map Function");
    if (markers != "noData") {
      this.dogwalkMarker = new google.maps.Marker();
      for (let mark of markers) {
        var position = new google.maps.LatLng(mark.Latitude, mark.Longitude);
        if (mark.LocationType == 'BRANCH') {
          this.dogwalkMarker = new google.maps.Marker({ position: position, title: mark.title, icon: 'assets/PenFed Branch Icon.svg' });
        } else {
          this.dogwalkMarker = new google.maps.Marker({ position: position, title: mark.title, icon: 'assets/ATM Icon.svg' });
        }
        this.dogwalkMarker.setMap(this.map);
        this.markers.push(this.dogwalkMarker);
        this.buildInfoDetailsWindow(this.dogwalkMarker, mark);
      }
    }
    if (this.currentLocation) {
      let latLng = new google.maps.LatLng(this.latitude, this.longitude);
      let currentLatLng = new google.maps.Marker({ position: latLng, icon: 'assets/My Location Icon.svg' });
      currentLatLng.setMap(this.map);
      this.markers.push(currentLatLng);
    }
    if (this.setZoom == true) {
      this.map.setZoom(11);
    }
    else if (this.searchSetZoomStatus == true) {
      this.map.setZoom(15);
      this.map.setCenter(this.searchLocObj);
      
    }
    else {
      this.map.setZoom(15);
    }
  }

  // Go to ATM/Branch Detail List page
  goToAtmBranchListPage() {
    let input = this.searchInput;
    this.searchInput = null;
    this.searchSetZoomStatus = false;
    this.navCtrl.push(AtmBranchSearchListPage, {
      searchDetails: this.atmBranchDetails,
      atmArr: this.atmLocations,
      searchInput: input
    });
  }

  // FIlter popup
  public onFilter() {
    let profileModal = this.modalCtrl.create(FilterLocationComponent, { branchToggleStatus: this.branchToggleStatus, hourToggleStatus: this.hourToggleStatus, accessToggleStatus: this.accessToggleStatus }, { showBackdrop: true, enableBackdropDismiss: false, cssClass: 'atm-modal-wrapper' });
    profileModal.onDidDismiss(data => {
      console.log("Modal on dismiss::" + data);
      if (data != null) {
        this.branchToggleStatus = data.branchToggleStatus;
        this.accessToggleStatus = data.accessToggleStatus;
        this.hourToggleStatus = data.hourToggleStatus;
        var typeDetails: string = "";
        this.clearMarker();
        if (data.branchToggleStatus == true) {
          typeDetails = "FCS";
          this.setZoom = true;
          this.findAtmService.atmSearchList = null;
        }
       else{
          this.findAtmService.atmSearchList = this.atmBranchDetails;
        }
        //
        this.getATMBranchDetails(typeDetails);
        
      }
      else {
        this.setZoom = false;
        console.log("else block");
      }
    });
    profileModal.present();
  }

  // getting locator compete details
  private goToATMDetails(item) {
    console.log(item)
    let tempLocations = this.atmBranchDetails.locations.location;
    let filteredObj = tempLocations.filter(function (obj) {
      return obj.id == item.LocationID
    });
    let selectedATM: any;
    if (filteredObj.length > 0) {
      selectedATM = filteredObj[0];
    }
    this.navCtrl.push(BranchDetailsPage, { atmBranchData: selectedATM });
  }

  // clearing the locators
  private clearMarker() {
    this.setZoom = false;
    for (var i = 0; i < this.markers.length; ++i) {
      this.markers[i].setMap(null);
    }
  }

  //go to native map direction
  getDirection() {
    this.atmLocations =[];
    this.clearMarker();
    this.getATMBranchkLocationInfo();

  }
  private calculateZoomLevel(distanceMeter,distance){
    var zoomLevel:Number= 15;
    this.maxZoom = 19;
    if (this.maxDistanceMeter < distanceMeter ){
      this.maxDistanceMeter = distanceMeter;
      if (distance > 32.0){
        zoomLevel = 5;
        this.maxZoom = 10;
      } else if (distance <= 32.0 && distance > 16.0){
       zoomLevel = 5;
       this.maxZoom = 10;
      } else if (distance <= 16.0 && distance > 8.0){
        zoomLevel = 8;
        this.maxZoom = 15;
      } else if (distance <= 8.0 && distance > 4.0){
      zoomLevel = 10;
      this.maxZoom = 15;
      } else if (distance <= 4.0 && distance > 2.0){
      zoomLevel = 14;
      } else if (distance <= 2.0 ){
      zoomLevel = 15;
    }   
  }
   
  return zoomLevel;
  
  }
  private setupMap(lat,lang,zoomLevel){
    if (!zoomLevel){
      zoomLevel =8;
    }
    let mpDiv = document.getElementById('map');
    let latLng = new google.maps.LatLng(lat, lang);
    let mapOptions = {
      center: latLng,
      disableDefaultUI: true,
      zoom: zoomLevel,
      minZoom:zoomLevel,
      maxZoom:this.maxZoom,
      myLocationButton: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(mpDiv, mapOptions); 
    this.map.setZoom(zoomLevel);

   /* if (!this.map){
      this.map = new google.maps.Map(mpDiv, mapOptions); 
    }
    else{
      this.map.setOptions(mapOptions);
      this.map.setZoom(zoomLevel);
    }*/
    
  }

}
