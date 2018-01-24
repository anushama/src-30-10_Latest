import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import * as patternLock from 'patternLock';

import { SessionManager } from '../core/session-manager';
import { ApiService } from '../../providers/api-service';
import { AppSettings } from '../core/app-settings';
import { Http } from '@angular/http';
import { QuickLoginSetupProvider } from '../../providers/quick-login-setup/quick-login-setup';
import { Utility } from '../core/utility';
import { StorageProvider } from '../../providers/storage/storage';
import { ErrorMessages } from '../../config/global-config';
import { LoginService } from "../../providers/login-service/login-service";
import { StatusBar } from "@ionic-native/status-bar";

@Component({
  selector: 'page-login-pattern',
  templateUrl: 'login-pattern.html',
})
export class LoginPatternPage {
  @ViewChild('patternlock-settings-div') input: ElementRef;
  public greetString: string;
  private lastActivityTime: any;
  public welcomeString = "WELCOME TO PENFED";
  private patternLock: any;
  private divId: any;
  private createdPattern: any;
  private userFirstName: string;
  private quickLoginInfo: string = null;
  private httpProvider: Http;
  private pfPatternID: string = null;
  private pfQuickLoginUser: string = null;
  private matchedPattern: string = null;
  public isPatternEnabled: boolean = false;
  private greetingexcla: string;
  private greetingcomma: string;

  constructor(public platform: Platform, public navCtrl: NavController,
    public navParams: NavParams, private view: ViewController,
    private elementRef: ElementRef,
    private http: Http,
    private serviceProvider: QuickLoginSetupProvider,
    private utility: Utility, private appSettings: AppSettings,
    private securedStorage: StorageProvider,
    private sessionManager: SessionManager,
    private loginService: LoginService, private statusBar: StatusBar
  ) {
    this.httpProvider = http;

    this.getWishMessage();
  }

  ngOnInit() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPatternPage');
    this.getDeviceTokenFromLocalStorage();
    this.loginService.getDeviceTokenFromLocalStorage(true);
    this.createPattern();
    this.loginService.checkTouchAvailable(this.navCtrl, true);
  }

  /*Added this method because of the Alert popup */
  ionViewWillEnter() {
    if (this.platform.is('ios')) this.statusBar.styleDefault();
    this.view.showBackButton(false);
  }

  ionViewWillLeave() {
    if (this.platform.is('ios')) this.statusBar.styleLightContent();
  }
  
  ionViewDidLeave() {
    this.divId.remove();

  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
    this.divId = document.getElementById('patternlock-settings-div');
    console.log(this.divId);
  }
  private loginWithPattern() {
    this.loginService.loginWithPattern(this.matchedPattern, this.patternLock, this.navCtrl);
  }

  private getDeviceTokenFromLocalStorage() {
    this.securedStorage.readFromStorage('QuickLoginId').then((data) => {
      if (data != null) {
        this.quickLoginInfo = data;
      }
    });

    this.securedStorage.readFromStorage('pfPatternID').then((data) => {
      if (data != null) {
        this.pfPatternID = data;
      }
    });
    this.securedStorage.readFromStorage('pfQuickLoginUser').then((data) => {
      if (data != null) {
        this.pfQuickLoginUser = data;
      }
    });

    this.securedStorage.readFromStorage('formattedFirstName').then((data) => {
      if (data != null) {
        this.userFirstName = data;
      }
    });

  }
  private quickLoginFailedAttempt() {
    console.log(this.quickLoginInfo);
    this.serviceProvider.quickLoginFailedAttempt(this.quickLoginInfo, this.pfQuickLoginUser).subscribe(
      (res: any) => {
        let response = JSON.parse(res._body);
        if (response.success) {
          if (Number(response.parameter) > 2) {
            this.isPatternEnabled = false;
            this.removeFromStorage();
            this.utility.showAlert(ErrorMessages.PATTERN_DISABLED, '', ErrorMessages.PATTERN_LOGIN_DISABLED, ErrorMessages.BUTTON_OK);


          } else {
            //Show mesage
            this.utility.showAlert(ErrorMessages.POPUP_TTILE, '', ErrorMessages.PATTERN_LOGIN_ENABLED, ErrorMessages.BUTTON_OK);

          }
        }
        else {
          if (response.message === "No quick login public key found") {
            this.removeFromStorage();
            this.utility.showAlert(ErrorMessages.POPUP_TTILE, '', ErrorMessages.PATTERN_LOGIN_QUICK_LOGIN, ErrorMessages.BUTTON_OK);
          }
        }

      },
      err => {
        console.log("Error--->"+err);
      });
  }
  private createPattern() {
    let thisvar = this;
    this.patternLock = new patternLock(this.divId, {
      onDraw: function (pattern) {

        console.log("pattern is " + pattern);
        if (pattern.length > 3) {
          thisvar.checkPatternMatch(pattern);
        } else {
          thisvar.resetPattern();
          console.log("PTRN is " + pattern);
        }
      }
    });
  }
  private resetPattern() {
    this.patternLock.reset();
  }

  private checkPatternMatch(pattern) {

    if (this.pfPatternID == pattern) {

      this.matchedPattern = pattern;
      this.loginWithPattern();
    }
    else {
      //Check Failed Attemp
      this.resetPattern();
      this.quickLoginFailedAttempt();
    }

  }

  goToLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  getWishMessage() {
    let currentDate = new Date();
    this.lastActivityTime = currentDate.getHours();
    if (this.lastActivityTime >= 0 && this.lastActivityTime < 12) {
      this.greetString = 'GOOD MORNING';
    } else if (this.lastActivityTime >= 12 && this.lastActivityTime < 17) {
      this.greetString = 'GOOD AFTERNOON';
    } else {
      this.greetString = 'GOOD EVENING'
    }
    this.greetingexcla = "!";
    this.greetingcomma = ",";
  }

  private removeFromStorage() {
    this.securedStorage.removeFromStorage('QuickLoginId');
    this.securedStorage.removeFromStorage('pfPrivatePem');
    this.securedStorage.removeFromStorage('pfQuickLoginUser');
    this.securedStorage.removeFromStorage('pfPatternID');
    this.securedStorage.removeFromStorage("quickLoginSetup");
  }
}
