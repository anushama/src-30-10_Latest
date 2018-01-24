/*
    DATE        INI     DESCRIPTION
 2017-08-31     LFR     Implementation for ContentSync
*/

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { AfbaDisclosurePage } from '../../pages/afba-disclosure/afba-disclosure';
import { ContentSyncExec } from "../../providers/content-sync-exec";
import { TermsConditionsPage } from '../../pages/terms-conditions/terms-conditions';
import { FindRealtyAgentPage } from "../find-realty-agent/find-realty-agent";
/**
 * Generated class for the ContactPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  public contactInfo;
  public rxContent = false;

  fromLogin:Boolean;

  ngOnInit() {
    console.log('ContactUs: going to req data from api');

    this.rxContent = false;

    this.contentSync.getContent('contactus').subscribe(data => {
                this.contactInfo = data;
                this.contactInfo.options[0].info = this.contactInfo.options[0].info.split('\\\\r\\\\n\\\\r\\\\n');
                for (let k=1; k < this.contactInfo.options.length; k++) {
                    var email = (this.contactInfo.options[k].info.indexOf('@') >= 0)
                    this.contactInfo.options[k]['icon'] = email ? 'ios-mail' : 'md-call';
                    this.contactInfo.options[k]['href'] = email ? 'mailto:' : 'tel:';
                }
                this.contactInfo.realtyagent.desc = this.contactInfo.realtyagent.desc + '<a href=""'+ this.contactInfo.realtyagent.hotspotA + '</a>';
                // this.contactInfo.realtyagent.desc = this.contactInfo.realtyagent.desc.replace('{hotspot: hotspotA}', '<a href="">' + this.contactInfo.realtyagent.hotspotA) + '</a>';
                this.rxContent = true;
              },
      error => <any>error);
  }



  constructor(public navCtrl: NavController, public navParams: NavParams,
              public contentSync: ContentSyncExec) {
    this.fromLogin=this.navParams.get('fromLogin');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUs');
  }

  backToLogin() {
    this.navCtrl.pop();
  }

  findRealAgent() {
    this.navCtrl.push(FindRealtyAgentPage);
  }

  gotoAFBADisclosure(){
    this.navCtrl.push(AfbaDisclosurePage);
  }
  goToTermsAndConditions(){
    this.navCtrl.push(TermsConditionsPage);
  }
}
