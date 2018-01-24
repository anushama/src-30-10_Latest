import { Injectable } from '@angular/core';
//import 'rxjs/add/operator/map';
import { DepositPage } from '../../pages/deposit/deposit';
import { ToolsPage } from '../../pages/tools/tools';
import { AccountsPage } from '../../pages/accounts/accounts';
// import { PaymentsPage } from '../../pages/payments/payments';
import { ProductsPage } from '../../pages/products/products';
import { SettingsPage } from '../../pages/settings/settings';
import { UnderConstructionPage } from '../../pages/under-construction/under-construction';
import { LoginPage } from '../../pages/login/login';
import { CheckingPage } from '../../pages/checking/checking';
import { IrasPage } from '../../pages/iras/iras';
import { AutoLoansPage } from '../../pages/auto-loans/auto-loans';
import { CertificatesPage } from '../../pages/certificates/certificates';
import { SavingsPage } from '../../pages/savings/savings';
import { OtherVehicleLoansPage } from '../../pages/other-vehicle-loans/other-vehicle-loans';
import { CreditCardsPage } from '../../pages/credit-cards/credit-cards';
import { PersonalLoansPage } from '../../pages/personal-loans/personal-loans';
import { MortgagesPage } from '../../pages/mortgages/mortgages'; //
// import { ApplicationStatusPage } from '../../pages/application-status/application-status';
//import { MakeADepositPage } from "../../pages/make-a-deposit/make-a-deposit";
import { BillpayDashboardPage } from "../../billpay/pages/billpay-dashboard/billpay-dashboard";
import { FingerprintAuthSetupPage } from '../../pages/fingerprint-auth-setup/fingerprint-auth-setup';
import { FindAtmPage } from '../../pages/find-atm/find-atm';


@Injectable()
export class AppSettingsProvider {

  public pages: any;

  constructor() {

    this.pages = [
      { title: 'ACCOUNTS', component: AccountsPage, iconName: 'list-box', color: '#0F2D52' },

      {
        title: 'DEPOSITS & TRANSFERS', component: DepositPage, iconName: 'shuffle', subpages: [{ title: 'MAKE DEPOSIT', component: 'MakeADepositPage', },
          { title: 'TRANSFER MONEY', component: 'TransferMoneyPage' }, { title: 'SCHEDULED TRANSFERS', component: 'TransferMoneyPage' }], flag: false, color: '#0F2D52'
      },
      {
        title: 'ACCOUNT PAYMENTS', component: 'TransferMoneyPage', iconName: 'logo-usd', subpages: [{ title: 'MAKE PAYMENT', component: 'TransferMoneyPage' },
          { title: 'SCHEDULED PAYMENTS', component: 'TransferMoneyPage', }], flag: false, color: '#0F2D52'
      },
      { title: 'BILL PAY', component: BillpayDashboardPage, iconName: 'md-cash', color: '#0F2D52' },
      {
        title: 'TOOLS', component: ToolsPage, iconName: 'hammer', subpages: [
          { title: 'APPLICATION STATUS', component: 'ApplicationStatusPage' },
          { title: 'TRAVEL NOTIFICATIONS', component: 'TravelNotificationsPage', },
          { title: 'FIND AN ATM/BRANCH', component: FindAtmPage, },
          { title: 'INBOX', component: UnderConstructionPage, },
          { title: 'ARTICLES & ADVICE', component: UnderConstructionPage, }
        ], flag: false, color: '#0F2D52'
      },
      {
        title: 'PRODUCTS', component: ProductsPage, iconName: 'car', subpages: [
          // { title: 'CURRENT RATES & OFFERS',component: ExplorePage }, //TO-DO - Change the view name
          { title: 'CURRENT RATES & OFFERS', component: FingerprintAuthSetupPage },
          { title: 'CREDIT CARDS', component: CreditCardsPage },
          { title: 'AUTO LOANS', component: AutoLoansPage },
          { title: 'MORTGAGES', component: MortgagesPage },
          { title: 'PERSONAL LOANS', component: PersonalLoansPage },
          { title: 'OTHER VEHICLE LOANS', component: OtherVehicleLoansPage },
          { title: 'CHECKING', component: CheckingPage },
          { title: 'SAVINGS', component: SavingsPage },
          { title: 'CERTIFICATES', component: CertificatesPage },
          { title: 'IRAs', component: IrasPage }
        ], flag: false
      },
      { title: 'SETTINGS', component: SettingsPage, iconName: 'settings', color: '#0F2D52' },
      // { title: 'Under Construction', component: UnderConstructionPage, iconName: 'settings' },
      { title: 'CONTACT US', component: "ContactPage", iconName: 'chatboxes', color: '#0F2D52' },
      { title: 'LOG OUT', component: LoginPage, iconName: 'lock' }
    ];
  }

  resetFlag() {
    for (let f in this.pages) {
      if (this.pages[f].subpages) {
        this.pages[f].flag = false;
      }
    }
  }

}
