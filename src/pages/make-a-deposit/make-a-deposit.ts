import { Component, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController, Platform } from 'ionic-angular';
import { Utility } from '../core/utility';
import { DepositAmountPage } from '../deposit-amount/deposit-amount';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { ReviewDepositPage } from '../review-deposit/review-deposit';
import { AccountsServiceProvider } from '../../providers/accounts-service/accounts-service';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-make-a-deposit',
  templateUrl: 'make-a-deposit.html',
})
export class MakeADepositPage {
  public deviceHeight: any = null;
  public deviceWidth: any = null;
  public flag: boolean = true;
  public flagVal: boolean = true;
  public value: number;
  public picture: any = {
    front: null,
    back: null
  };
  public side:string;
  public showCameraControls: boolean = false;
  public htmlEl: any;
  public depositAccount:any = null;
  public depositAmount:any = null;
  public accountMask:string=null;
  public reviewPhoto:boolean = false;

  // picture options
  constructor(public navCtrl: NavController, public navParams: NavParams, private utility: Utility,
    public modalCtrl: ModalController,  private elRef: ElementRef,
    private screen: ScreenOrientation ,private accountsService: AccountsServiceProvider, public view: ViewController, public platform: Platform, private storageService: StorageProvider) {
    if (this.navParams.data.fromAccount) {
      this.depositAccount = this.navParams.data.payload;
    }
    
    this.deviceHeight = this.platform.height();
    this.deviceWidth = this.platform.width();
    
    platform.ready().then(() => {
      platform.registerBackButtonAction(() => {
        if(this.showCameraControls){
          // this.cameraPreview.stopCamera().then(()=>{
          //   this.screen.unlock();
          //   this.htmlEl.classList.remove('camera-on');
          //   this.showCameraControls = false;
          //   this.side = null;
          //   this.reviewPhoto = false;
          // });
        } else if (this.showCameraControls === false){
          let previousView = this.navCtrl.getPrevious().name;
          if (previousView === 'AccountPage'){
            this.navCtrl.pop();
          } else{
            this.navCtrl.setRoot('AccountsPage');
          }
        }
      });
    })
  }
  //
  ionViewDidLoad() {
  this.htmlEl = document.getElementsByTagName('html')[0];
  }
  selectAccount(){

  }
  // returnToAccount() {
  //   this.navCtrl.pop();
  // }
  updateContinueButton(picture){
    let state = true;
    if (picture.front !== null && picture.back !== null && this.depositAccount!==null && this.depositAmount!==null){
      state = false;
    }
    return state;
  }
  selectDepositAccount() {
    //this.show="false";
    let options;
    if (this.depositAccount) {
      options = { pageFrom:"deposit", pageTitle:"ACCOUNT TO DEPOSIT TO", numLast4:this.depositAccount.numLast4 };
    } else {
      options = { pageFrom:"deposit", pageTitle:"ACCOUNT TO DEPOSIT TO" };
    }
    let profileModal = this.modalCtrl.create('AccountToTransferToPage', options);
    // depositAccount.numLast4
    profileModal.onDidDismiss(data => {
      console.log(data);
      if (data != null || data != undefined) {
        this.value = data;
        this.flagVal = false;
        this.depositAccount=data;
      }else{
        return false;
      }
    });
    profileModal.present();
  }
  selectDepositAmount() {
    //this.show="false";
    let profileModal = this.modalCtrl.create(DepositAmountPage,{ pageFrom:"deposit", pageTitle:"DEPOSIT AMOUNT" });
    profileModal.onDidDismiss(data => {
      console.log(data);
      if (data != null || data != undefined) {
        this.depositAmount = data;
        this.flagVal = false;
      }else{
        return false;
      }
    });
    profileModal.present();
  }
  launchCamera(checkSide){
    this.side = checkSide;
    this.storageService.writeToStorage('byPassLogout', true);
    this.screen.lock(this.screen.ORIENTATIONS.LANDSCAPE).then(()=>{
      this.htmlEl.classList.add('camera-on');
      this.showCameraControls = true;
    }).then(()=>{
      setTimeout(()=>{
        let cameraOptions:any = {
          x: 0,
          y: 0,
          width: this.deviceHeight,
          height: this.deviceWidth,
          camera: 'rear',
          tapPhoto: false,
          // tapFocus:true,
          previewDrag: true,
          toBack: true,
          alpha: 1
        };
        // this.cameraPreview.startCamera(cameraOptions).then(()=>{
        //   this.cameraPreview.getSupportedPictureSizes().then(res=>{
        //     console.log('getSupportedPictureSizes', res)
        //   })
        // })
      }, 2000)
    });
  }

  

  takePhoto(checkSide){
    let photoQuality:any = {
      width : (this.deviceHeight * 3),
      height : (this.deviceWidth * 3)
    };
    // photoQuality.width = this.deviceHeight * 3;
    // photoQuality.height = this.deviceWidth * 3;

    // this.cameraPreview.takePicture({
    //   width: photoQuality.width,
    //   height: photoQuality.height,
    //   quality: 100
    // }).then((imageData) => {
    //   this.picture[checkSide] = 'data:image/jpeg;base64,' + imageData;
    //   console.log(imageData, this.picture);
    //   this.reviewPhoto = true;
    // }, (err) => {
    //   console.log(err);
    //   this.cameraPreview.stopCamera();
    //   this.side = null;
    //   this.reviewPhoto = false;
    // });
  }
  usePhoto(checkSide){
    // this.cameraPreview.stopCamera().then(()=>{
    //   this.screen.unlock();
    //   this.htmlEl.classList.remove('camera-on');
    //   this.showCameraControls = false;
    //   this.side = null;
    //   this.reviewPhoto = false;
    // }).then(()=>{
    //   this.storageService.removeFromStorage('byPassLogout');
    // });
  }
  cancelPhoto(checkSide){
    // this.cameraPreview.stopCamera().then(()=>{
    //   this.htmlEl.classList.remove('camera-on');
    //   this.showCameraControls = false;
    //   this.screen.unlock();
    //   this.picture[checkSide] = null;
    //   this.side = null;
    //   this.reviewPhoto = false;
    // }).then(()=>{
    //   this.storageService.removeFromStorage('byPassLogout');
    // });
  }
  retakePhoto(checkSide){
    this.picture[checkSide] = null;
    this.reviewPhoto = false;
  }
  confirm(picture){
    //if (picture.front && picture.back) 
    this.navCtrl.push(ReviewDepositPage, {
      depositAccount:this.depositAccount,
      depositAmount:this.depositAmount,
      picture:picture
    });
  }
  resetCamera(side){
    this.picture[side] = null;
    this.side = null;
    this.reviewPhoto = false;
  }
  getDeviceSize(orientationType,platformData){
    if (orientationType === 'landscape'){

    } else if(orientationType === 'portrait'){

    }
    // this.landscapeWidth = this.platform.width > this.platform.height ? this.platform.width : this.platform.height;
    // this.landscapeHeight = this.platform.width > this.platform.height ? this.platform.height : this.platform.width;
  }
}
