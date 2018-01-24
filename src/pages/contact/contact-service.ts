import { Component, Input } from '@angular/core';
import { NavParams, NavController } from "ionic-angular";
import {ContactServiceInformation} from "../core/contact-service"

@Component({
  selector:"contact-service",
  templateUrl:"contact-service.html"
  //styleUrls: ['contact-service.scss']
})
export class ContactServiceComponent{
  @Input() public localNumber:string;
  @Input() public parentPage:string = null;
           public overseasNumber:string;
           public email:string;
           public showEmail:boolean = true;

  constructor(private navParams:NavParams, private navCtrl:NavController){
    this.localNumber = ContactServiceInformation.localNumber;
    this.overseasNumber = ContactServiceInformation.overseasNumber;
    this.email = ContactServiceInformation.email;
  }
  ngOnChanges(){
    if ((this.parentPage===undefined) || (this.parentPage===null)){
      this.showEmail=true;
    } else if(this.parentPage=='securityLock'){
      this.showEmail=false;
    }
  }

}
