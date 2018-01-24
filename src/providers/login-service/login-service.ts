import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { TouchID } from "@ionic-native/touch-id";
import { AndroidFingerprintAuth } from "@ionic-native/android-fingerprint-auth";
import { Subscription } from "rxjs/Subscription";
import { ApiService } from "../api-service";
import { QuickLoginSetupProvider } from "../quick-login-setup/quick-login-setup";
import { Utility } from "../../pages/core/utility";
import { AppSettings } from "../../pages/core/app-settings";
import { StorageProvider } from "../storage/storage";
import { SessionManager } from "../../pages/core/session-manager";
import { AccountsServiceProvider } from "../accounts-service/accounts-service";
import { AccountLockedPage } from "../../pages/account-locked/account-locked";
import { SecurityquestionPage } from "../../pages/securityquestion/securityquestion";
import { ErrorMessages } from "../../config/global-config";
import { LoginPage } from "../../pages/login/login";
import { PatternLoginSetupPage } from "../../pages/pattern-login/pattern-login-setup";
import { AccountsPage } from "../../pages/accounts/accounts";
import { FingerprintLoginOptionsPage } from "../../pages/fingerprint-auth-setup/fingerprint-login-options";


@Injectable()
export class LoginService {

  private quickLoginInfo: string = null;
  private pfPrivatePem: any;
  private pfQuickLoginUser: string = null;
  private patternLock: any;
  private errorMsgTitle: string = "";
  private navCtrl: NavController;
  private savedUser: string = null;
  public loginInfoObj: any;

  constructor(private platform: Platform,
    private apiService: ApiService, private http: Http,
    private serviceProvider: QuickLoginSetupProvider,
    private utility: Utility, private appSettings: AppSettings,
    private storageService: StorageProvider,
    private sessionManager: SessionManager, public accountsApi: AccountsServiceProvider, private touchId: TouchID, private androidTouch: AndroidFingerprintAuth) {
  }

  //Pattern Login
  public loginWithPattern(matchedPattern, patternLock, navControl: NavController) {
    this.errorMsgTitle = "Failed to Login with Pattern";
    this.navCtrl = navControl;

    var encPrivateKey = (<any>window).forge.pki.decryptRsaPrivateKey(this.pfPrivatePem, matchedPattern);
    this.loginInfoObj = this.getRequestInfo(encPrivateKey);
    //Service Call login function
    this.beforeLoginwithFingetprint();
  }

  //FINGER PRINT
  public loginWithFingerprint() {
    this.patternLock = null;
    this.errorMsgTitle = "Failed to Login with Fingerprint";
    console.log("in loginWithFingerprint method:::::::" + this.pfPrivatePem);
    this.storageService.readFromStorage('pfPrivatePem').then((data) => {
      if (data != null) {
        this.pfPrivatePem = data;
        var encPrivateKey = (<any>window).forge.pki.privateKeyFromPem(this.pfPrivatePem);
         this.loginInfoObj = this.getRequestInfo(encPrivateKey);

        //Service Call login function
        this.beforeLoginwithFingetprint();
      }
    });
  }

  private beforeLoginwithFingetprint() {
    console.log("beforeLoginwithFingetprint METHOD");
    let userInfo = {
      userId: this.pfQuickLoginUser,
      deviceToken: this.sessionManager.deviceToken
    };
    this.apiService.beforeLogin(userInfo).subscribe( //, this.appSettings
      (res: any) => {
        console.log("beforeLoginwithFingetprint METHOD SUCCESS:::" + res);
        let response = JSON.parse(res._body);
        this.storageService.writeToStorage("deviceToken", response.deviceToken);
        this.handleBeforLoginResponse(response);
      }, (err) => {
        console.log(err);

      }, () => {
        console.log("Finally Block...!");
      }
    );
  }

  handleBeforLoginResponse(response) {
    if (response.accountExists && response.accountLocked) {
      this.storageService.readFromStorage("unlockCounter").then(data => {
        if (data != null && Number(data) > 2) this.navCtrl.push(AccountLockedPage, { doubleLocked: true });
        else this.navCtrl.push(AccountLockedPage);
      })
    } else if (response.accountExists && !response.accountLocked && response.displaySecurityQuestion) {
      this.navCtrl.push(SecurityquestionPage, {"quickLogin": true});
      this.apiService.securityQuestionId = response.securityQuestionId;
      this.apiService.transactionId = response.transactionId;
      this.apiService.sessionId = response.sessionId;
      this.sessionManager.deviceToken = response.deviceToken;
      this.apiService.securityHash = response.securityHash;
    } else if (response.accountExists && !response.accountLocked && !response.displaySecurityQuestion) {
      this.loginInfoObj.secHash = response.securityHash;
      this.loginWithTouch();
    }
  }

  public loginWithTouch() {
    console.log("loginWithTouch METHOD SUCCESS:::");
    this.apiService.patternlogin(this.loginInfoObj, "").subscribe(//, this.appSettings
      (res: any) => {
        console.log(res);
        let resp = JSON.parse(res._body);
        this.sessionManager.memberId = resp.memberId;
        this.handleLogin(resp, false, this.navCtrl);
      },
      err => {
        console.log("ERROR");
      });
  }

  private getRequestInfo(encPrivateKey) {
    console.log("QUICK LOGIN:::" + this.quickLoginInfo);
    var md = (<any>window).forge.md.sha1.create();
    md.update(this.quickLoginInfo, 'utf8');
    let signature = encPrivateKey.sign(md);

    encPrivateKey = null;
    let loginInfo = {
      quickLoginInfo: this.quickLoginInfo,
      base64DataBytes: (<any>window).forge.util.encode64(this.quickLoginInfo),
      base64SignatureBytes: (<any>window).forge.util.encode64(signature),
      userId: this.pfQuickLoginUser
    };
    console.log("LOGIN INFO LOGIN:::" + loginInfo);
    return loginInfo;
  }
  public getDeviceTokenFromLocalStorage(isPatternLoginFlow: boolean) {
    this.platform.ready().then(() => {
      if (isPatternLoginFlow) {
        this.getPatternLoginLocalStorageInfo();
      } else {
        this.getFingerprintnLoginLocalStorageInfo();
      }

      this.storageService.readFromStorage('deviceToken').then((data) => {
        if (data != null) {
          this.sessionManager = data;
        }
      });

      this.storageService.readFromStorage('pfQuickLoginUser').then((data) => {
        if (data != null) {
          this.pfQuickLoginUser = data;
        }
      });

    });
  }
  private getPatternLoginLocalStorageInfo() {
    this.storageService.readFromStorage('savedUser').then((data) => {
      if (data != null) this.savedUser = data;
    });
    this.storageService.readFromStorage('QuickLoginId').then((data) => {
      if (data != null) this.quickLoginInfo = data;
    });
    this.storageService.readFromStorage('pfPrivatePem').then((data) => {
      this.pfPrivatePem = data;
    });
  }
  private getFingerprintnLoginLocalStorageInfo() {
    this.storageService.readFromStorage('savedUser').then((data) => {
      if (data != null) this.savedUser = data;
    });
    this.storageService.readFromStorage('FPQuickLoginId').then((data) => {
      if (data != null) this.quickLoginInfo = data;
    });
    this.storageService.readFromStorage('FPPrivatePem').then((data) => {
      if (data != null) this.pfPrivatePem = data;
    });

  }

  handleLogin(resp: any, gotToResetPatternPage: boolean, navControl: NavController) {
    this.navCtrl = navControl;
    if (resp.attemptsRemaining && !resp.success && resp.attemptsRemaining > 0) {
      this.utility.showAlert(ErrorMessages.POPUP_TTILE, '', ErrorMessages.INVVALID_USER_PASSWORD, ErrorMessages.BUTTON_OK);
    }
    else if (resp.attemptsRemaining && !resp.success && resp.attemptsRemaining <= 0) {
      this.navCtrl.push(AccountLockedPage);
    } else if (resp.success) {
      //set member id to session
      this.sessionManager.memberId = resp.memberId;
      this.sessionManager.isLoggedIn = true;
      // ToDo - This localStorage needs to removed.
      if (gotToResetPatternPage == true) {
        gotToResetPatternPage = false;
        this.sessionManager.checkRootPage = LoginPage;
        this.navCtrl.push(PatternLoginSetupPage, { goToAccountsPage: true });
      }
      else {
        this.loadAccounts().subscribe(res => {
          this.sessionManager.accountsList = res.accountData;
          this.sessionManager.IRAAccounts = res.iraCertificateData;
          let accountsPopulated: boolean = this.areAccountsListsPopulated(this.sessionManager.accountsList, this.sessionManager.IRAAccounts)
          if (accountsPopulated === false) {
            this.sessionManager.accountsList = null;
            this.sessionManager.IRAAccounts = null;
            return false;
          } else {
            this.sessionManager.isLoggedIn = true;
            //The below line is added for showing user firstname in loginpage - Start - RM
            this.storageService.writeToStorage("formattedFirstName", res.accountData.firstName);
            //The below line is added for showing user firstname in loginpage - End - RM
            this.storageService.readFromStorage('loginOPtionShown').then((data) => {
              if (data != null) { 
                this.navCtrl.push(AccountsPage);
              }
              else {
                if (this.appSettings.isDeviceTouchAvailable) {
                  this.navCtrl.push(FingerprintLoginOptionsPage);
                }
                else {
                  this.navCtrl.push(AccountsPage);
                }
              }
            });
          }
        });
      }
    }
  }

  loadAccounts() {
    console.log("Load Account Data");
    // if (this.sessionManager.accountsList == null && this.sessionManager.IRAAccounts == null) { //refreshData == null
      return this.accountsApi.getCombinedAccounts()
    // }
  }

  areAccountsListsPopulated(...els) {
    let resp = false;
    els.forEach(arrayEl => {
      for (var key in arrayEl) {
        if (arrayEl.hasOwnProperty(key)) {
          var element = arrayEl[key];
          if (element !== null && element.length > 0) {
            resp = true;
          } else if (element === null) {
            resp = true;
          }
        }
      }
    });
    return resp;
  }

  
  checkTouchAvailable(navCtrl: NavController, verifyfingerprint?: boolean) {
    this.navCtrl = navCtrl;
    if (this.platform.is('ios')) {
      console.log("Insdie IOS");
      this.touchId.isAvailable()
        .then(
        res => {
          this.appSettings.isDeviceTouchAvailable = true;
          this.appSettings.isDeviceTouchEnabled = true;
          this.appSettings.isDeviceTouchLocked = false;
          if(verifyfingerprint) this.isTouchIdEnabled();
        },
        err => {
          if (err.code == -6) {
            this.appSettings.isDeviceTouchAvailable = false;
          } else this.appSettings.isDeviceTouchAvailable = true;
          if (err.code == -7) {
            this.appSettings.isDeviceTouchEnabled = false;
          } else this.appSettings.isDeviceTouchEnabled = true;
          if(err.code == -8) {
            this.appSettings.isDeviceTouchLocked = true;
          }
        }
        )
        .catch(error => console.error(error));
    } else if (this.platform.is('android')) {
      this.androidTouch.isAvailable()
        .then(
        (result) => {
          if (result.isAvailable) {
            this.appSettings.isDeviceTouchAvailable = true;
            this.appSettings.isDeviceTouchEnabled = true;
            this.appSettings.isDeviceTouchLocked = false;
            if(verifyfingerprint) this.isTouchIdEnabled();
          } else {
            if (result.isHardwareDetected) this.appSettings.isDeviceTouchAvailable = true;
            else this.appSettings.isDeviceTouchAvailable = false;
            if (result.hasEnrolledFingerprints) this.appSettings.isDeviceTouchEnabled = true;
            else this.appSettings.isDeviceTouchEnabled = false;
          }
        })
        .catch(error => {console.error("Android Fingerprint Error",error)});
    }
  }

  isTouchIdEnabled() {
    this.storageService.readFromStorage('FPQuickLoginId').then((data) => {
      if (data != null) { //data != null
        this.quickLoginInfo = data;
      }
    });
    this.storageService.readFromStorage('pfQuickLoginUser').then((data) => {
      if (data != null) { //data != null
        this.pfQuickLoginUser = data;
      }
    });
    this.storageService.readFromStorage('deviceToken').then((data) => {
      if (data != null) { //data != null
        this.sessionManager.deviceToken = data;
      }
    });
    this.storageService.readFromStorage('fingerprintLoginSetup').then(data => {
      console.log("fingerprintLoginSetup--->" + data);
      if (data != null) {
        this.appSettings.isUserTouchEnabled = true;
        this.verifyFingerPrint()
      } else {
        this.appSettings.isUserTouchEnabled = false;
        console.log("Touch Data not available" + JSON.stringify(data));
      }
    });
  }

  verifyFingerPrint() {
    if (this.platform.is('ios')) {
      this.touchId.verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel('Unlock the PenFed Mobile App using your Touch ID.', 'Login with Password')
        .then(
        res => this.loginWithFingerprint(),
        err => {
          
          if(err.code == -8) {
            this.appSettings.isDeviceTouchLocked = true;
            this.utility.showAlert("", "", ErrorMessages.FINGERPRINT_LOGIN_UNABLE_TO_VERIFY, ErrorMessages.BUTTON_OK);
          }
        });
    }
    else if (this.platform.is('android')) {
      this.androidTouch.encrypt({ clientId: 'PenFedMobile', disableBackup: true, dialogTitle: 'Fingerprint Login', dialogMessage:"Unlock the PenFed Mobile App using your fingerprint." })
        .then(result => {
          if (result.withFingerprint) {
            this.loginWithFingerprint()
          } else if (result.withBackup) {
            console.log('Successfully authenticated with backup password!');
            // this.loginWithFingerprint()
          } else console.log('Didn\'t authenticate!');
        })
        .catch(error => {
          if(error == "FINGERPRINT_ERROR") {
            this.utility.showAlert("", "", ErrorMessages.FINGERPRINT_LOGIN_UNABLE_TO_VERIFY, ErrorMessages.BUTTON_OK);
          }
          console.error(error)
        });
    }
  }
}