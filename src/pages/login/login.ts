import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import { Component, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../providers/api-service';
import { Platform, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HelploginPage } from '../../pages/helplogin/helplogin';
import { SecurityquestionPage } from '../../pages/securityquestion/securityquestion';
import { Network } from '@ionic-native/network';
import { AccountLockedPage } from '../account-locked/account-locked';
import { AppSettings } from '../core/app-settings';
import { Http } from '@angular/http';
import { Device } from '@ionic-native/device'; // added native device module
import { MemberInfoProvider } from '../../providers/member-info/member-info';
import { TermsConditionsPage } from '../../pages/terms-conditions/terms-conditions';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { Geolocation } from '@ionic-native/geolocation';
import { TermsConditionsPopupComponent } from '../../components/terms-conditions-popup/terms-conditions-popup';
import { SessionManager } from '../core/session-manager';
import { Utility } from '../core/utility';
import { ErrorMessages } from "../../config/global-config";
import { StorageProvider } from "../../providers/storage/storage";
import { FindAtmPage } from '../../pages/find-atm/find-atm';
import { QuickLoginSetupProvider } from '../../providers/quick-login-setup/quick-login-setup';
import { TouchID } from '@ionic-native/touch-id';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { Subscription } from "rxjs/Subscription";
import { LoginService } from "../../providers/login-service/login-service";
import { StatusBar } from "@ionic-native/status-bar";

interface bootstrapResponse {
  _body?: string
}


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  private gotToResetPatternPage;
  public body: any;
  private lastActivityTime: any;
  public greetString: String;
  public greetingexcla: String;
  public greetingcomma: String;
  public welcomeString = "WELCOME TO PENFED";
  public showLoginForm: boolean = false;
  public loginForm: FormGroup;
  public readonly: boolean = false;
  public type = "password";
  public checkStatus = false;
  public welcomeMemberFlag: boolean = false;
  public userName: String;
  public networkConnection: boolean;
  public connectionType: any;
  public saveUserName = false;
  public userTouchedFlag: boolean = false;
  private httpProvider: Http;
  private userFirstName: String;
  private UUID: String;
  private fingerPrintQuickLoginInfo: any;
  private pfQuickLoginUser: any;
  private fingerprintLoginEnabled: boolean = false;
  private onLoginPageResume: Subscription;

  constructor(public platform: Platform, public api: ApiService, public navParams: NavParams,
    public formBuilder: FormBuilder, public navCtrl: NavController,
    private view: ViewController,
    private network: Network, public http: Http, public memberInfo: MemberInfoProvider,
    private device: Device, private modalCtrl: ModalController,
    private geolocation: Geolocation, public locationTracker: LocationTrackerProvider,
    public changeDetector: ChangeDetectorRef, private utility: Utility, private storageService: StorageProvider,
    private sessionManager: SessionManager, private appSettings: AppSettings,
    private serviceProvider: QuickLoginSetupProvider,
    private androidfingerAuth: AndroidFingerprintAuth,
    private touchId: TouchID,
    private loginService: LoginService, private statusBar: StatusBar) {
    this.onLoginPageResume = platform.resume.subscribe(() => {
      //Checking TouchId condition only when application on HomePage
      this.loginService.checkTouchAvailable(this.navCtrl, false);
      console.log("On Resume");
    });


    this.httpProvider = http;
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(16)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])),
      saveUserName: new FormControl(false, []),
      enableTouchId: new FormControl(false, [])
    });
    this.gotToResetPatternPage = (this.navParams.get("gotToResetPatternPage") != undefined) ? this.navParams.get("gotToResetPatternPage") : false;
  }

  ngOnInit() {
    // this.networkCheck();  LFR
    this.storageService.readFromStorage('formattedFirstName').then((data) => {
      if (data != undefined && data != 2) this.userFirstName = data;
    });
    this.storageService.readFromStorage('TCFlag').then((data) => {
      this.api.isTCAccepted = (data != null) ? data : false;
    });
    this.storageService.readFromStorage('BackgroundClass').then((data) => {
      this.api.backgroundImg = (data != null) ? data : '';
    });


    /* use for set terms-conditions scss
    // this.api.isTCAccepted= false;
    */
  }

  ngOnDestroy() {
    this.changeDetector.detach();
    this.onLoginPageResume.unsubscribe();
  }

  networkCheck() {
    this.platform.ready().then(() => {
      this.networkConnection = navigator.onLine;
      this.connectionType = (this.networkConnection) ? "" : "No Internet Connection";
      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        setTimeout(() => {
          this.connectionType = "No Internet Connection";
          this.networkConnection = false;
          this.changeDetector.detectChanges();
        }, 0);
      });
      let connectSub = this.network.onConnect().subscribe(() => {
        setTimeout(() => {
          this.networkConnection = true;
          this.changeDetector.detectChanges();
        }, 0);
      });
    });
  }

  checkLocalStorage() {
    this.storageService.readFromStorage('savedUser').then((data) => {
      if (data != null) {
        this.userName = data;
        this.readonly = true;
        this.saveUserName = true;
        this.sessionManager.userName = data;
        this.storageService.readFromStorage('formattedFirstName').then((data) => {
          if (data != null) {
            this.userFirstName = data;
            this.welcomeMemberFlag = true;
          }
        });
      }
    });
  }

  setLocalStorage() {
    this.storageService.writeToStorage("savedUser", this.loginForm.value.userName);
    this.storageService.writeToStorage("welcomeMemberFlag", true);
  }

  clearLocalStorage() {
    this.storageService.removeFromStorage("savedUser");
    this.storageService.removeFromStorage("formattedFirstName");
    this.storageService.writeToStorage("welcomeMemberFlag", false);
    this.welcomeMemberFlag = false;
  }

  /* Logged In as a different user start */
  differentUserLogin() {
    if (this.fingerPrintQuickLoginInfo != null) {
      this.disableFingerprintLogin();
    }
    else {
      this.storageService.removeFromStorage('QuickLoginId');
      this.storageService.removeFromStorage('pfPrivatePem');
      this.storageService.removeFromStorage('pfQuickLoginUser');
      this.storageService.removeFromStorage('pfPatternID');
      this.storageService.removeFromStorage('pfsaveduser');
      this.storageService.removeFromStorage('savedUser');
      this.storageService.removeFromStorage("formattedFirstName");
      this.storageService.removeFromStorage("quickLoginSetup");
      this.loginForm.controls['userName'].setValue("");
      this.storageService.writeToStorage("welcomeMemberFlag", false);
      this.loginForm.controls['saveUserName'].setValue(false);
      this.loginForm.controls['enableTouchId'].setValue(false);
      this.navCtrl.push(LoginPage);
      //
    }
  }

  ionViewDidEnter() {
    this.checkLocalStorage();
    this.storageService.readFromStorage('formattedFirstName').then((data) => {
      if (data != undefined && data != 2) this.userFirstName = data;
    });
    this.getWishMessage();
    // Adobe Analytics page tracking

    this.utility.trackPage('LoginPage');

    this.showLoginForm = false;
    if (this.navParams.get('showLoginForm')) {
      this.showLoginForm = this.navParams.get('showLoginForm');
    }
    let logedinUser = this.navParams.get("userName")
    if (logedinUser != null) {
      this.loginForm.controls['userName'].setValue(logedinUser);
      this.readonly = true;
    }

    //While coming from security page - In Login Page DOM  - password field appearing twice
    //The below code is added for resetting password field
    if (this.navParams.get('securityPage')) {
      this.showLoginForm = true;
      this.userTouchedFlag = true;
    }

    if (this.welcomeMemberFlag == false) {
      this.greetingexcla = "!";
      this.greetingcomma = ",";
    }
  }

  ionViewDidLoad() {
    this.getDeviceTokenFromLocalStorage();
    if (this.navParams.get('showTouch') == false) this.loginService.checkTouchAvailable(this.navCtrl, false);
    else this.loginService.checkTouchAvailable(this.navCtrl, true);

  }

  loginWithTouchID() {
    if (!this.appSettings.isDeviceTouchLocked) this.loginService.checkTouchAvailable(this.navCtrl, true);
    else {
      if (this.platform.is('android')) this.utility.showAlert(ErrorMessages.FINGERPRINT_NOT_ENABLED, '', ErrorMessages.TOUCH_ID_NOT_ENABLED_MSG, ErrorMessages.BUTTON_OK);
      else if (this.platform.is('ios')) this.utility.showAlert(ErrorMessages.TOUCH_ID_NOT_ENABLED, '', ErrorMessages.TOUCH_ID_NOT_ENABLED_MSG, ErrorMessages.BUTTON_OK);
    }
  }
  /*Added this method because of the Alert popup */
  ionViewWillEnter() {
    if (this.platform.is('ios')) this.statusBar.styleDefault();
    this.view.showBackButton(false);
  }

  ionViewWillLeave() {
    if (this.platform.is('ios')) this.statusBar.styleLightContent();
  }


  beforeLogin(loginForm) {
    if (this.networkConnection == false) {
      this.connectionType = "No Internet Connection";
      this.utility.trackAction('LoginPage', 'NetworkAlert')
      this.utility.showAlert(ErrorMessages.POPUP_TTILE, '', ErrorMessages.NETWORK_ERROR, ErrorMessages.BUTTON_OK);
    } else {
      console.log("Inside beforelogin else block");
      loginForm.value.saveUserName ? this.setLocalStorage() : this.clearLocalStorage();

      this.storageService.readFromStorage('deviceToken').then((data) => {
        if (data != undefined && data != 2) {
          this.sessionManager.deviceToken = data;
        }
        let userInfo = {
          userId: loginForm.value.userName,
          deviceToken: this.sessionManager.deviceToken
        };

        this.api.beforeLogin(userInfo).subscribe( //, this.appSettings
          (res: any) => {
             this.sessionManager.userName = loginForm.value.userName;
            let response = JSON.parse(res._body);
            this.storageService.writeToStorage("deviceToken", response.deviceToken);
            //set values to session manager
            this.sessionManager.deviceToken = response.deviceToken;
            this.sessionManager.DeviceUUID = this.device.uuid;
            if (response.loginErrorMessage != null && response.loginErrorMessage.length > 0) {
              this.utility.trackError('LoginPage', 'EnvironmentIssue')
              this.errorPopup(ErrorMessages.POPUP_TTILE, ErrorMessages.ENV_DOWN_MESSAGE);
            } else if (response != null && response.accountExists === false) {
              this.errorPopup(ErrorMessages.POPUP_TTILE, ErrorMessages.NOT_LISTED_USER);
              this.utility.trackError('LoginPage', 'IncorrectUserName')
              this.clearLocalStorage();
              this.showLoginForm = false;
              this.UUID = this.device.uuid;
            }
            if (response != null && response.accountExists) {
              (this.api.isTCAccepted) ? this.handleBeforeLoginResponse(response) : this.presentTermsModal(response);
            }
          }, (err) => {
          }, () => {
            console.log("Finally Block...!");
          }
        )
      });
    }
  }

  /* login with username and password for accessing accounts information. */
  login(loginForm) {
    console.log(loginForm);
    if (loginForm.valid) {
      this.showLoginForm = true;
      this.readonly = true;
      this.api.login(loginForm.value.userName, loginForm.value.password).subscribe( //, this.appSettings
        (res: any) => {
          let resp = JSON.parse(res._body);
          this.loginService.handleLogin(resp, this.gotToResetPatternPage, this.navCtrl)
        },
        err => {

        },
        () => {
          console.log("completed first req.. starting second");
          this.storageService.writeToStorage("userNameForPWD", this.loginForm.value.userName);
        });
      // }
      loginForm.value.saveUserName ? this.setLocalStorage() : this.clearLocalStorage()
    }
  }

  handleBeforeLoginResponse(response: any) {
    if (response.accountExists && response.accountLocked) {
      this.storageService.readFromStorage("unlockCounter").then(data => {
        if (data != null && Number(data) > 2) this.navCtrl.push(AccountLockedPage, { doubleLocked: true });
        else this.navCtrl.push(AccountLockedPage);
      })
    } else if (response.accountExists && !response.accountLocked && response.displaySecurityQuestion) {
      this.navCtrl.push(SecurityquestionPage);
      this.api.securityQuestionId = response.securityQuestionId;
      this.api.securityQuestion = response.securityQuestion;
      this.api.transactionId = response.transactionId;
      this.api.sessionId = response.sessionId;
      this.api.securityHash = response.securityHash;
    } else if (response.accountExists && !response.accountLocked && !response.displaySecurityQuestion) {
      this.showLoginForm = true;
      this.readonly = true;
      this.userTouchedFlag = true;
      this.api.setHash(response.securityHash);
    }
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
  }

  showPassword() {
    console.log("Entering into showPassword");
    this.checkStatus = !this.checkStatus;
    if (this.checkStatus) {
      this.type = "text";
    } else {
      this.type = "password";
    }
  }

  /* Navigating to Contact Page */
  contactPenFed() {
    this.navCtrl.push("ContactPage", {
      fromLogin: true
    });
  }

  /* Navigating to Products Page */
  productInformation() {
    this.navCtrl.push("UnderConstructionPage");
  }

  /* Navigating to Locations Page */
  locationsInformation() {
    this.navCtrl.push(FindAtmPage);
  }

  /* Navigating to NeedHelpLoggingIn Page */
  helpLoggingIn() {
    this.navCtrl.push(HelploginPage);
  }

  gotoTermsAndConditions() {
    console.log("Inside methdo");
    this.navCtrl.push(TermsConditionsPage);
  }

  errorPopup(title, msg) {
    this.utility.showAlert(title, '', msg, ErrorMessages.BUTTON_OK);
    this.loginForm.controls['userName'].setValue("");
    this.loginForm.controls['password'].setValue("");
    this.loginForm.controls['saveUserName'].setValue(false);
    this.loginForm.controls['enableTouchId'].setValue(false);
    this.welcomeMemberFlag = false;
  }

  /* terms and condition popup window method*/
  presentTermsModal(response: any) {
    this.utility.trackAlert('LoginPage', 'FirstTimeUser');
    let profileModal = this.modalCtrl.create(TermsConditionsPopupComponent, {}, { showBackdrop: true, enableBackdropDismiss: false });
    profileModal.onDidDismiss(data => {
      if (data.acceptence) {
        this.api.isTCAccepted = true;
        this.storageService.writeToStorage("TCFlag", true)
      }
      this.handleBeforeLoginResponse(response);
    });
    profileModal.present();
  }

  private disableFingerprintLogin() {
    console.log("Fingerprint ID::::" + this.fingerPrintQuickLoginInfo);
    this.storageService.removeFromStorage('FPQuickLoginId');
    this.storageService.removeFromStorage("DeviceTokenId");
    this.storageService.removeFromStorage("FPPrivatePem");
    this.storageService.removeFromStorage("pfsaveduser");
    this.storageService.removeFromStorage("savedUser");
    this.storageService.removeFromStorage("welcomeMemberFlag");
    this.storageService.removeFromStorage("pfQuickLoginUser");
    this.storageService.removeFromStorage("fingerprintLoginSetup");
    this.storageService.removeFromStorage("formattedFirstName");
    this.loginForm.controls['userName'].setValue("");
    this.storageService.writeToStorage("welcomeMemberFlag", false);
    this.loginForm.controls['saveUserName'].setValue(false);
    this.loginForm.controls['enableTouchId'].setValue(false);

    this.navCtrl.push(LoginPage);

  }


  private getDeviceTokenFromLocalStorage() {
    this.storageService.readFromStorage('FPQuickLoginId').then((data) => {
      if (data != null) {
        this.fingerPrintQuickLoginInfo = data;
      }
    });
    this.storageService.readFromStorage('pfQuickLoginUser').then((data) => {
      if (data != null) {
        this.pfQuickLoginUser = data;
      }
    });
  }
}
