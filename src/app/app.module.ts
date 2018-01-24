import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, LoadingController } from 'ionic-angular';
import { AppComponent } from './app.component';
import { HomePage } from '../pages/home/home';
import { LocationsPage } from '../pages/locations/locations';
import { HelploginPage } from '../pages/helplogin/helplogin';
import { DepositPage } from '../pages/deposit/deposit';
import { ToolsPage } from '../pages/tools/tools';
import { ProductsPage } from '../pages/products/products';
import { SettingsPage } from '../pages/settings/settings';
// import { LogoutPage } from '../pages/logout/logout';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule, Http, XHRBackend, RequestOptions } from "@angular/http";
import { ContactInfoPage } from '../pages/contact-info/contact-info';
import { ApiService } from '../providers/api-service';
import { AccountsPage } from '../pages/accounts/accounts';
import { AccountPage } from "../pages/account/account";
import { SecurityPage } from '../pages/security/security';
import { AccountHeaderComponent } from '../pages/accounts/account-header';
import { AccountRecentTransactionsComponent } from "../pages/account/account-recent-transactions";
import { AccountHeaderActionsComponent } from "../pages/accounts/account-header-actions";
import { AccountsFooterComponent } from '../pages/accounts/accounts-footer';
import { AccountListItemComponent } from '../pages/accounts/account-list-item';
import { UpdateMailingAddressPage } from '../pages/update-mailing-address/update-mailing-address';
import { UpdatePhoneNumPage } from '../pages/update-phone-num/update-phone-num';
import { UpdateEmailPage } from '../pages/update-email/update-email';
import { AccountShowhidePage } from '../pages/account-showhide/account-showhide';
import { IonicStorageModule } from '@ionic/storage'
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { InboxPage } from "../pages/inbox/inbox";
import { AccountCheckDisplayPage } from "../pages/account-check-display/account-check-display";
import { CheckingPage } from '../pages/checking/checking';
import { ExplorePage } from '../pages/explore/explore';
import { IrasPage } from '../pages/iras/iras';
import { SavingsPage } from '../pages/savings/savings';
import { CreditCardsPage } from '../pages/credit-cards/credit-cards';
import { AutoLoansPage } from '../pages/auto-loans/auto-loans';
import { MortgagesPage } from '../pages/mortgages/mortgages';
import { OtherVehicleLoansPage } from '../pages/other-vehicle-loans/other-vehicle-loans';
import { PersonalLoansPage } from '../pages/personal-loans/personal-loans';
import { CertificatesPage } from '../pages/certificates/certificates';
import { AccountLockedPage } from '../pages/account-locked/account-locked';
import { UnlockAccountPage } from '../pages/unlock-account/unlock-account';
import { AccountUnlockedPage } from '../pages/account-unlocked/account-unlocked';
import { CreateNewpasswordPage } from '../pages/create-newpassword/create-newpassword';
import { ContactServiceComponent } from '../pages/contact/contact-service';
import { AccountNicknamePage } from '../pages/account-nickname/account-nickname';
import { AccountNicknameItemComponent } from '../pages/account-nickname/account-nickname-item';
import { SecurityLockedPage } from '../pages/security-locked/security-locked';
import { Network } from '@ionic-native/network';

import { GetTimeoutValueProvider } from "../providers/get-timeout-value/get-timeout-value";
import { SharedMortgageDataProvider } from '../providers/shared-mortgage-data/shared-mortgage-data';

import { ContactInformationProvider } from '../providers/contact-information/contact-information';
import { UpdatePhonenumberServiceProvider } from '../providers/update-phonenumber-service/update-phonenumber-service';
import { UpdatePasswordProvider } from '../providers/update-password/update-password';

import { AccountsServiceProvider } from '../providers/accounts-service/accounts-service';
import { ApiEndpointProvider } from '../providers/api-endpoint/api-endpoint';
import { LogoutProvider } from '../providers/logout/logout';
import { ResetAccountsDataProvider } from "../providers/reset-accounts-data/reset-accounts-data";

import { MailingAddressServiceProvider } from '../providers/mailing-address-service/mailing-address-service';
import { CountryStateProvider } from '../providers/country-state/country-state';
import { SecurityquestionPage } from "../pages/securityquestion/securityquestion";
//Session Manager
import { SessionManager } from '../pages/core/session-manager';
//App settings for loading all gloabl data before login
import { AppSettings } from '../pages/core/app-settings';

import { ProductBaseComponent } from '../components/product-base/product-base';
import { ProductServiceProvider } from '../providers/product-service/product-service';
import { ProudctcarouselComponent } from '../components/proudctcarousel/proudctcarousel';
//import { ReversevaluePipe } from '../pipes/reversevalue/reversevalue';
import { ProductsExploreProvider } from '../providers/products-explore/products-explore';
import { ManageYourCardsPage } from "../pages/manage-your-cards/manage-your-cards";
import { ActivateCardPage } from "../pages/activate-card/activate-card";
import { Device } from '@ionic-native/device';
import { NetworkInformationProvider } from '../providers/network-information/network-information';
import { UpdateContactInfoProvider } from '../providers/update-contact-info/update-contact-info';
import { TermsConditionsPage } from '../pages/terms-conditions/terms-conditions';

import { AfbaDisclosurePage } from '../pages/afba-disclosure/afba-disclosure';
/*Geo Location Related imports - Start*/
import { Geolocation } from '@ionic-native/geolocation';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
/*Geo Location Related imports - End*/
import { CreditCardDisplayComponent } from "../pages/accounts/account-header-credit-card-display";
import { AccountHeaderAccountDetailsComponent } from "../pages/accounts/account-header-account-details";
import { SecurityQuestionProvider } from '../providers/security-question/security-question';
import { TermsConditionsPopupComponent } from '../components/terms-conditions-popup/terms-conditions-popup';
import { UnlockAccountProvider } from '../providers/unlock-account/unlock-account';
import { PlatformServiceProvider } from '../providers/platform-service/platform-service';
import { MemberInfoProvider } from '../providers/member-info/member-info';

import { QuickLoginSetupProvider } from '../providers/quick-login-setup/quick-login-setup';

import { FindRealtyAgentProvider } from '../providers/find-realty-agent/find-realty-agent';
// import { ApplicationStatusPage } from '../pages/application-status/application-status';
import { ApplicationStatusProvider } from '../providers/application-status/application-status';
import { ApplicationDetailsPage } from '../pages/application-details/application-details';
import { ReviewDepositPage } from "../pages/review-deposit/review-deposit";
import { MobileDepositTermsPage } from "../pages/mobile-deposit-terms/mobile-deposit-terms";
import { DepositAmountPage } from '../pages/deposit-amount/deposit-amount';
import { Utility } from '../pages/core/utility';
import { ContentSyncExec } from "../providers/content-sync-exec";
import { BillPayModule } from "../billpay/billpay.module";
import { Camera } from "@ionic-native/camera";
import { ContentSyncDataProvider } from "../providers/content-sync/conten-sync-data-provider";
import { FindRealtyAgentPage } from "../pages/find-realty-agent/find-realty-agent";
import { AccountCreditCardSortPage } from '../pages/account-credit-card-sort/account-credit-card-sort';

import { FingerprintAuthSetupPageModule } from "../pages/fingerprint-auth-setup/fingerprint-auth-setup.module";
import { TouchID } from '@ionic-native/touch-id';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { PatternLoginPageModule } from "../pages/pattern-login/pattern-login.module";

import { NativeStorage } from '@ionic-native/native-storage';
import { StorageProvider } from '../providers/storage/storage';
import { TravelNotificationsModule } from "../travel-notifications/travelnotifications.module";
import { FilterLocationComponent } from '../components/filter-location/filter-location';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { DatePicker } from '@ionic-native/date-picker';
import { TransfersModule } from '../transfers/transfers.module';

import { FindAtmPageModule } from "../pages/find-atm/find-atm.module";

import { PipesModule } from '../pipes/pipes.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { FormatZipcodePipe } from '../pipes/format-zipcode/format-zipcode';
import { MakeDepositProvider } from '../providers/make-deposit/make-deposit';
import { AlertsAndNotificationsPageModule } from '../pages/alerts-and-notifications/alerts-and-notifications.module';
import { Keyboard } from '@ionic-native/keyboard';
import { httpFactory } from "../providers/http-factory/http-factory";
import { HeaderComponentModule } from '../components/header/header.module'
import { FooterComponentModule } from '../components/footer/footer.module';
import { DirectivesModule } from "../directives/directives.module";
import { LoginPageModule } from "../pages/login/login.module";
import { LoginService } from '../providers/login-service/login-service';

@NgModule({
  declarations: [
    FindRealtyAgentPage,
    AppComponent,
    HomePage,
    DepositPage,
    ToolsPage,
    ProductsPage,
    SettingsPage,
    LocationsPage,
    HelploginPage,
    AccountsPage,
    AccountPage,
    ContactInfoPage,
    AccountHeaderComponent,
    AccountHeaderActionsComponent,
    AccountListItemComponent,
    UpdateMailingAddressPage,
    AccountRecentTransactionsComponent,
    AccountsFooterComponent,
    AccountShowhidePage,
    ChangePasswordPage,
    CheckingPage,
    ExplorePage,
    IrasPage,
    OtherVehicleLoansPage,
    SavingsPage,
    CreditCardsPage,
    AutoLoansPage,
    MortgagesPage,
    CertificatesPage,
    PersonalLoansPage,
    UpdatePhoneNumPage,
    UpdateEmailPage,
    SecurityquestionPage,
    SecurityPage,
    InboxPage,
    AccountCheckDisplayPage,
    ProductBaseComponent,
    ProudctcarouselComponent,
    AccountLockedPage,
    UnlockAccountPage,
    ManageYourCardsPage,
    ActivateCardPage,
    AccountUnlockedPage,
    CreateNewpasswordPage,
    TermsConditionsPage,
    AfbaDisclosurePage,
    CreditCardDisplayComponent,
    AccountHeaderAccountDetailsComponent,
    TermsConditionsPopupComponent,
    ContactServiceComponent,
    AccountNicknamePage,
    AccountNicknameItemComponent,
    SecurityLockedPage,
    // ApplicationStatusPage,
    ApplicationDetailsPage,
    ReviewDepositPage,
    MobileDepositTermsPage,
    DepositAmountPage,
    AccountCreditCardSortPage,
    DepositAmountPage,
    FilterLocationComponent,
    FormatZipcodePipe
  ],

  imports: [
    BrowserModule,
    BillPayModule,
    TravelNotificationsModule,
    TransfersModule,
    DirectivesModule,
    PipesModule,
    FingerprintAuthSetupPageModule,
    AlertsAndNotificationsPageModule,
    FindAtmPageModule,
    PatternLoginPageModule,
    HeaderComponentModule,
    FooterComponentModule,
    HttpModule,
    LoginPageModule,
    IonicModule.forRoot(AppComponent),
    IonicStorageModule.forRoot()
  ],
  exports: [
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    FindRealtyAgentPage,
    AppComponent,
    HomePage,
    DepositPage,
    ToolsPage,
    ContactInfoPage,
    // PaymentsPage,
    ProductsPage,
    SettingsPage,
    LocationsPage,
    HelploginPage,
    AccountsPage,
    AccountPage,
    ChangePasswordPage,
    CheckingPage,
    ExplorePage,
    IrasPage,
    OtherVehicleLoansPage,
    SavingsPage,
    CreditCardsPage,
    AutoLoansPage,
    MortgagesPage,
    CertificatesPage,
    PersonalLoansPage,
    UpdateMailingAddressPage,
    AccountShowhidePage,
    SecurityquestionPage,
    UpdatePhoneNumPage,
    UpdateEmailPage,
    SecurityPage,
    InboxPage,
    AccountCheckDisplayPage,
    AccountLockedPage,
    UnlockAccountPage,
    ManageYourCardsPage,
    ActivateCardPage,
    AccountUnlockedPage,
    CreateNewpasswordPage,
    TermsConditionsPage,
    AfbaDisclosurePage,
    TermsConditionsPopupComponent,
    ContactServiceComponent,
    AccountNicknamePage,
    AccountNicknameItemComponent,
    SecurityLockedPage,
    // ApplicationStatusPage,
    ApplicationDetailsPage,
    ReviewDepositPage,
    MobileDepositTermsPage,
    DepositAmountPage,
    AccountCreditCardSortPage,
    DepositAmountPage,
    FilterLocationComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    Device,
    Keyboard,
    Geolocation,
    LocationTrackerProvider,
    LaunchNavigator,
    ApiService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },

    GetTimeoutValueProvider,
    SharedMortgageDataProvider,
    ContactInformationProvider,
    UpdatePhonenumberServiceProvider,
    UpdatePasswordProvider,
    AccountsServiceProvider,
    ApiEndpointProvider,
    LogoutProvider,
    MailingAddressServiceProvider,
    CountryStateProvider,
    ResetAccountsDataProvider,
    SessionManager,
    AppSettings,
    ResetAccountsDataProvider,
    ProductServiceProvider,
    ProductsExploreProvider,
    NetworkInformationProvider,
    UpdateContactInfoProvider,
    SecurityQuestionProvider,
    UnlockAccountProvider,
    PlatformServiceProvider,
    MemberInfoProvider,
    QuickLoginSetupProvider,
    ApplicationStatusProvider,
    FindRealtyAgentProvider,
    Utility,
    ContentSyncExec,
    Camera,
    ContentSyncDataProvider,
    TouchID,
    AndroidFingerprintAuth,
    NativeStorage,
    StorageProvider,
    IonicStorageModule,
    DatePicker,
    ScreenOrientation,
    MakeDepositProvider,
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, Utility, LoadingController],
    },
    LoginService
  ]
})
export class AppModule { }
