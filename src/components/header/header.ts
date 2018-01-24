import { Component, Input } from '@angular/core';
import { ContentSyncExec } from "../../providers/content-sync-exec";
import { NavController, NavParams} from 'ionic-angular';
import { LoginPage } from "../../pages/login/login";
import { InboxPage } from '../../pages/inbox/inbox';
import { AccountsPage } from '../../pages/accounts/accounts';

@Component({
  selector: 'pf-header',
  templateUrl: 'header.html'
})
export class HeaderComponent {
  @Input() public leftIcon: string = "";
  @Input() public rightIcon: string = "";
  @Input() public pageTitle: string = "";
  fromLogin:Boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public contentSync: ContentSyncExec) {
    this.fromLogin=this.navParams.get('fromLogin');
  }
  backToLogin() {
    this.navCtrl.pop();
  }
  returnToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }
  popView(){
    this.navCtrl.pop();
  } 

  goToInbox(){
    this.navCtrl.push(InboxPage, {
      pageType:'INBOX_PAGE',
      payload: {}
    })
  }

  dismissView() {
    this.gotoAccountsPage();
  }

  //Redirect to accounts page
  gotoAccountsPage() {
    this.navCtrl.setRoot(AccountsPage);
  }

}

@Component({
  selector: 'pf-header-title',
  template: '<ng-content></ng-content>'
})
export class HeaderTitleComponent{
  constructor() {}
}
