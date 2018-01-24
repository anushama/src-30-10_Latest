import { Component, Input } from '@angular/core';
import { NavParams } from "ionic-angular";

@Component({
   selector:'account-header-credit-card-display',
   templateUrl:'account-header-credit-card-display.html'
 })

export class CreditCardDisplayComponent {
  
  @Input() public showAccountDetailsToggle:boolean;
  
  private creditCardParams:any;
  public showAccountDetails:boolean;
  constructor(private navParams: NavParams){
    this.creditCardParams = navParams.data;
    this.showAccountDetails = this.showAccountDetailsToggle;
  }
  ngOnChanges(){
    this.showAccountDetails = this.showAccountDetailsToggle;
  }
}