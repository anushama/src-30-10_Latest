import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { AccounttopayfromPage } from '../accounttopayfrom/accounttopayfrom';
import { AccounttopaytoPage } from '../accounttopayto/accounttopayto';
import { DatePicker } from '@ionic-native/date-picker';
import { Utility } from '../../pages/core/utility';
import { Times } from "../../config/dropdown-option";

@Component({
  selector: 'page-makeapayment',
  templateUrl: 'makeapayment.html',
  providers: [DatePicker]
})
export class MakeapaymentPage {
  // public date: any;
  // public myDate: any = new Date();
  // public payTime: any;
  // public timeChoose: any;
  // public monthButton: boolean = true;
  // public canlenderButton: boolean = false;  

  public flagFrom: boolean = true;
  public flagTo: boolean = true
  public flagVal: boolean = true;
  public amount: number;
  public date: any;
  public myDate: any = new Date();
  private fromAcctSelected: any;
  private toAcctSelected: any;
  public selectFlag: boolean = false;
  public payTime: any;
  public timeChoose: any;
  public segmentButtonStatus: boolean = true;
  public monthButton: boolean = false;
  public canlenderButton: boolean = false;
  public times: any;
  public selectStateOptions: any;
  
  type:any = 'One-Time';

   constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCntr : AlertController,
    private _modalCntrl : ModalController,
    public util : Utility,
    public datePicker: DatePicker,
  ) {
    
    this.times = Times;
    this.payTime = "onetime";
    this.selectStateOptions = {
      title: 'Select',
      mode: 'md'
    };
  }

  // showCalendar() {
  //   this.datePicker.show({
  //     date: new Date(),
  //     mode: 'date',
  //     minDate: new Date().getTime(),
  //     allowOldDates: false,
  //     androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
  //   }).then(
  //     date => {
  //       console.log(date);
  //       this.myDate = date;
  //     },
  //     err => console.log('Error occurred while getting date: ', err)
  //     );
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MakeapaymentPage');
  }

  itemOne(){
    // this.navCtrl.push(AccounttopayfromPage);
    let modal =  this._modalCntrl.create(AccounttopayfromPage);
    modal.present();
  }

  itemTwo(){
    // this.navCtrl.push(AccounttopayfromPage);
    let modal =  this._modalCntrl.create(AccounttopaytoPage);
    modal.present();
  }

  typeChange($event){
    console.log($event);
    
  }

  showCalendar() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      minDate: new Date().getTime(),
      allowOldDates: false,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
        if(date != null){
          console.log(date);
          this.myDate = date;
        }else{
          this.myDate = new Date();
        }

      },
      err => console.log('Error occurred while getting date: ', err)
      );
  }

  selectedOne() {
    this.selectFlag = false;
    this.segmentButtonStatus = true;
    this.payTime = "onetime";
    console.log("patTime is:  " + this.payTime);
  }
  selectedMonth() {
    this.selectFlag = true;
    this.payTime = "month";
    this.segmentButtonStatus = (this.payTime == "month" && this.timeChoose != undefined) ? true : false;
    console.log("patTime is:  " + this.payTime + "  " + this.timeChoose)
  }

  // displayNCUACert(){
  //   let msg='<div class="alertBorder"><div class="alertmsg"><p>Your savings federally insured to at least $250,000 and backed by the full faith and credit of the United States Government</p><h4 class="font-effect-emboss">NCUA</h4><p>National Credit Union Administration, a U.S.Government Agency</p></div></div>';
  //   let alert = this.alertCntr.create({     
  //       title: "",
  //       subTitle: msg,
  //       cssClass: 'ncua-alert',
  //       buttons: [
  //           {
  //           text: 'OK',
  //           role: 'OK'
  //           }
  //       ]
  //   });
  //   alert.present();
  //}

}