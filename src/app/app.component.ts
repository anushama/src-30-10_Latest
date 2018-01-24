import { Component, ViewChild, OnInit } from '@angular/core';
import { App, Nav, Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuController } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { AppSettingsProvider } from '../providers/app-settings/app-settings';
import { HttpModule } from "@angular/http";
import { GetTimeoutValueProvider } from "../providers/get-timeout-value/get-timeout-value";
import { LogoutProvider } from "../providers/logout/logout"
import { ResetAccountsDataProvider } from "../providers/reset-accounts-data/reset-accounts-data";
import { Geolocation } from '@ionic-native/geolocation';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { PlatformServiceProvider } from '../providers/platform-service/platform-service';
import { ApiService } from "../providers/api-service";
import { AppSettings } from '../pages/core/app-settings';
import { ContentSyncExec } from "../providers/content-sync-exec";
import { LoginPatternPage } from '../pages/login/login-pattern';
import { SessionManager } from '../pages/core/session-manager';
import { StorageProvider } from '../providers/storage/storage';
import { ErrorMessages } from "../config/global-config";
import { Utility } from '../pages/core/utility';
import { Keyboard } from "@ionic-native/keyboard";

@Component({
  templateUrl: 'app.html',
  providers: [AppSettingsProvider]
})
export class AppComponent implements OnInit {

  @ViewChild(Nav) nav: Nav;

  // rootPage: any = LoginPage;
  pages: any;
  rootPage: any;

  ngOnInit() {
    // this.contentSync.init();
    this.pages = this.appSetting.pages;
    this.appLaunched = true;


  }

  public sessionTimeout: any;
  public sessionTimer: number;
  public isLoggedIn: any;
  public stayLoggedIn: any;
  private islogoutAlertPresent: boolean = false;
  public activeSessionStart: any = null;
  public intervalCheck: any;
  private QuickLoginId: any;
  private appLaunched: boolean = false;

  constructor(platform: Platform, private splashScreen: SplashScreen,
    public menuCtrl: MenuController, public http: HttpModule,
    public getTimeout: GetTimeoutValueProvider, public appSetting: AppSettingsProvider,
    public logout: LogoutProvider, public resetAccountsData: ResetAccountsDataProvider,
    private storageService: StorageProvider,
    private pltfmService: PlatformServiceProvider,
    public contentSync: ContentSyncExec,
    public app: App, private sessionManager: SessionManager,
    private utility: Utility, private appSettings: AppSettings, private geolocation: Geolocation,
    private locationTracker: LocationTrackerProvider, private api: ApiService, private keyboard: Keyboard) {
    this.sessionTimer = this.getTimeout.getTimeout();

    // Handle back button navigation on Android
    platform.ready().then(() => {
      this.splashScreen.hide();
      this.checkLocalStorageForIsPatternEnable();
      // Get RSA device info
      if ((<any>window).rsaInfo) {
        // debugger;
        (<any>window).rsaInfo.getDeviceInfo((data) => {
          console.log('RSA device info');
          this.pltfmService.setRsaDeviceInfo(data);
          console.log(data);
        },
          (err) => {
            console.log('RSA device info error');
            console.log(err);
          });
      }

      this.appSettings.getServiceUrls().subscribe(data => { //this.httpProvider, this.platform
        //console.log("Service URLs--->" + JSON.stringify(data));
        this.getInitialImages();
      });

      // Register Android back button action
      platform.registerBackButtonAction(() => {
      
          let activeModalPortal = this.app._appRoot._modalPortal.getActive();

          if(activeModalPortal) {

          activeModalPortal.dismiss();

          }
        // Get current active page
        let activeView = this.nav.getActive().name;
        // let previousView = this.nav.getPrevious().name;
        if (activeView === 'LoginPage') { //AccountsPage
          // console.log('Active page - ', activeView);
          platform.exitApp();
          // navigator['app'].exitApp();
        }
        else if (activeView === 'AccountsPage') { // activeView === 'AccountsPage' this.nav.getViews().length === 2
          if (!this.islogoutAlertPresent) {
            if (this.menuCtrl.isOpen()) { this.menuCtrl.close(); }
            this.islogoutAlertPresent = true;
            this.utility.showConfirmDialg('Log Out & Close?', '', 'This will log you out and close the session.', 'OK', 'CANCEL', this.cancelCallBack, this, this.logoutCallBack, this)
          }
        }
        else if (this.nav.canGoBack()) {
          this.nav.pop();
        }
      });
    });

    this.storageService.readFromStorage('stayLoggedIn').then(res => {
      if (res !== null) {
        this.stayLoggedIn = res;
      } else {
        this.stayLoggedIn = false;
        this.storageService.writeToStorage("stayLoggedIn", this.stayLoggedIn);
      }
    });

    platform.pause.subscribe(() => {
      // hack fix: https://github.com/ionic-team/ionic/issues/10168
      this.closeOverlays(this.app);
      this.sessionTimeout = new Date();
      console.log('pause app', this.sessionTimeout);
    });

    platform.resume.subscribe(() => {
      let message: string;
      // let appSettings = AppSettings.singletonInstance();
      this.activeSessionStart = new Date();
      this.storageService.readFromStorage('byPassLogout').then(byPassLogoutResp => {
        console.log(byPassLogoutResp);
        if (byPassLogoutResp === null) {
          this.storageService.readFromStorage('stayLoggedIn').then(stayResp => {
            let timeIn: any = new Date();
            this.isLoggedIn = this.sessionManager.isLoggedIn;
            message = this.sessionManager.isLoggedIn !== null ?
              stayResp ? 'Your session has timed out. Please log in again to continue.' : "You've been logged out of the PenFed app due to your security settings. Please log in again. To stay logged in, visit the settings screen from the navigation."
              : null;
            if (stayResp && this.isLoggedIn) {
              //If Stay Logged In is True, calculate timer to see if you can continue, unless the time runs out.
              if ((timeIn.getTime() - this.sessionTimeout.getTime()) < this.sessionTimer) {
                console.log('still active');
              } else {
                this.logout.sessionLogout(this.appSettings).subscribe(res => {
                  // console.log(res);
                });
                this.resetAndGoToLoginPage(message)
              }
            } else if (!stayResp && this.isLoggedIn) {
              //If Stay Logged In is false, Logout if the app goes to background.
              this.logout.sessionLogout(this.appSettings).subscribe(res => {
                // console.log(res);
              });
              this.resetAndGoToLoginPage(message)
            }
          })
        } else { 
          this.storageService.removeFromStorage('byPassLogout');
          return false;
        }
      });
    });
  }

  getInitialImages() {
    let options = { timeout: 5000, enableHighAccuracy: true };
    this.geolocation.getCurrentPosition(options).then((data) => {
      this.locationTracker.getLocationDataInfo(data.coords.latitude, data.coords.longitude).subscribe(res => {
        let result = res.json();
        this.api.backgroundImg = result.backgroundClass;
        this.storageService.writeToStorage("BackgroundClass", result.backgroundClass);
      }, err => {
        console.log(err);
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  appLogOut(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.checkLocalStorageForIsPatternEnable();
    this.nav.setRoot(this.rootPage).then(() => {
      this.logout.sessionLogout(this.appSettings).subscribe(res => {
          console.log('Log Out');
        }, err => {
          //The current app returns an error once you call the logout endpoint. TODO - follow up on service endpoint
          console.log('Log Out Error');
        });
      this.resetAccountsData.resetData();
      this.sessionManager.resetManager();
      this.menuCtrl.close('sideMenu');
    });
  }

  goToPage(sub) {
    // ToDo - This needs to be refactored
    let checkLogin = false;
    switch (sub.title) {
      case 'TRANSFER MONEY':
      case 'SCHEDULED TRANSFERS':
      case 'MAKE DEPOSIT':
        checkLogin = true;
        break;
      default:
      //
    }
    if (checkLogin) {
      if (this.sessionManager.isLoggedIn) {
        this.nav.setRoot(sub.component, { 'pageTitle': sub.title });
      } else {
        this.menuCtrl.close('sideMenu');
        // this.utility.showAlert(ErrorMessages.POPUP_TTILE, ErrorMessages.MUST_BE_LOGGED_IN, '', ErrorMessages.BUTTON_OK);
      }
    } else {
      this.nav.setRoot(sub.component, { 'pageTitle': sub.title });
    }
  }

  // submenu dropdown collapse
  getMenuActive(show) {
    if (this.menuCtrl.isOpen('sideMenu')) {
      return show = !show;
    } else {
      return false;
    }
  }
  // dropdown change color
  getSideNav(show) {
    if (this.menuCtrl.isOpen('sideMenu')) {
      return show = !show;
    } else {
      return this.menuCtrl.isOpen('sideMenu');
    }
  }
  // only one dropdown can be toggled
  dropDownCtrl(p) {
    if (p.flag) {
      p.flag = false;
    } else {
      this.appSetting.resetFlag();
      p.flag = true;
    }
  }
  //when menu close, reset all flag
  resetMenu() {
    this.appSetting.resetFlag();
  }

  checkSession(event) {
    //if isLoggedIn is true, check to see if session is still active
    if (this.sessionManager.isLoggedIn === true) {
      //Get the date right now
      let date = new Date();
      // Check to see if global activeSessionStart is set
      if ((this.activeSessionStart === null) || (this.activeSessionStart === undefined)) {
        this.activeSessionStart = new Date();
      }
      // If active session time between each tap is less than the overall session time of 10 minutes, continue;
      if ((date.getTime() - this.activeSessionStart.getTime()) < this.sessionTimer) {
        this.activeSessionStart = new Date();
      } else {
        //Otherwise, reset and log out
        this.resetAndGoToLoginPage('Your session has timed out. Please log in again to continue.')
      }
    }
  }

  resetAndGoToLoginPage(alertMsg) {
    this.checkLocalStorageForIsPatternEnable();
    if (alertMsg === undefined) alertMsg = 'Your session has timed out. Please log in again to continue.';
    this.activeSessionStart = null;
    this.resetAccountsData.resetData();
    this.sessionManager.resetManager();
    this.utility.showAlert(ErrorMessages.POPUP_TTILE, '', alertMsg, ErrorMessages.BUTTON_OK);
    this.nav.push(this.rootPage, { 'showTouch' : false })
  }

  private checkLocalStorageForIsPatternEnable() {
    this.storageService.readFromStorage('quickLoginSetup').then(res => {
      if (res !== null) {
        this.rootPage = LoginPatternPage;
      }
      else {
        this.rootPage = LoginPage;
      }
    });
  }
  closeOverlays(appObj) {
    let overlay = appObj._appRoot._overlayPortal._views;
    let openModals = appObj._appRoot._modalPortal._views;
    let menus = appObj._appRoot._overlayPortal._app._menuCtrl._menus;
    if (overlay.length) {
      overlay.map(overlayItem => {
        overlayItem.dismiss();
      });
    }
    if (openModals.length) {
      openModals.map(modalItem => {
        modalItem.dismiss();
      })
    }
    if (menus.length) {
      menus.map(menuItem => {
        if (menuItem.isOpen === true) menuItem.close();
      })
    }
  }

  logoutCallBack(thisref) {
    thisref.appLogOut({});
    thisref.islogoutAlertPresent = false;
  }

  cancelCallBack(thisref) {
    thisref.islogoutAlertPresent = false;
  }
}
