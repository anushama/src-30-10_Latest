import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { BillpayProvider } from '../billpay/providers/billpay/billpay';

import { BillpayDirective } from '../billpay/directives/billpay/billpay';
import { BillpayDashboardPage } from '../billpay/pages/billpay-dashboard/billpay-dashboard';
import { BillpayHeaderPage } from '../billpay/pages/billpay-header/billpay-header';

import { BillpayPaymentsPage } from '../billpay/pages/billpay-payments/billpay-payments';
import { BillpayPayeesPage } from '../billpay/pages/billpay-payees/billpay-payees';
import { BillpayHistoryPage } from '../billpay/pages/billpay-history/billpay-history';
import { BillpayPayBillPage } from '../billpay/pages/billpay-pay-bill/billpay-pay-bill';
import { BillpayModifyAutoPayPage } from '../billpay/pages/billpay-modify-auto-pay/billpay-modify-auto-pay';
import { BillpayReviewPaymentPage } from '../billpay/pages/billpay-review-payment/billpay-review-payment';
import { BillpayPaymentScheduledPage } from '../billpay/pages/billpay-payment-scheduled/billpay-payment-scheduled';
import { BillpaySelectPaymentFrequencyPage } from '../billpay/pages/billpay-select-payment-frequency/billpay-select-payment-frequency';
import { BillpayPaymentAmountPage } from '../billpay/pages/billpay-payment-amount/billpay-payment-amount';
import { BillpayAddEditPayeePage } from '../billpay/pages/billpay-add-edit-payee/billpay-add-edit-payee';
import { BillpayPayToAccountPage } from '../billpay/pages/billpay-pay-to-account/billpay-pay-to-account';

import { BillpayDevUiIndexPage } from '../billpay/pages/billpay-dev-ui-index/billpay-dev-ui-index';

import { TruncatePipe } from '../billpay/pipes/truncate';
import { OrderBy } from '../billpay/pipes/orderby';
import { PhoneNumValidator } from '../validators/phone';

import { AnimateItemSlideDirective } from '../billpay/directives/animate-item-slide/animate-item-slide';
import { BillpaySortFiltersPage } from '../billpay/pages/billpay-sort-filters/billpay-sort-filters';
import { BillpayScheduledPaymentDetailsPage } from '../billpay/pages/billpay-scheduled-payment-details/billpay-scheduled-payment-details';
import { ShowAllEbillsPage } from '../billpay/pages/show-all-ebills/show-all-ebills';
import { PayeeDetailsPage } from '../billpay/pages/payee-details/payee-details';
import { AddPayeePage } from '../billpay/pages/add-payee/add-payee';
import { PhonemaskDirective } from "../directives/phonemask/phonemask";
import { HeaderComponentModule } from '../components/header/header.module';
import { PipesModule } from '../pipes/pipes.module';
import { DirectivesModule } from "../directives/directives.module";


@NgModule({
    declarations: [
      BillpayDirective,
      AnimateItemSlideDirective,
      TruncatePipe,
      OrderBy,
      BillpayDashboardPage,
      BillpayHeaderPage,
      BillpayPaymentsPage,
      BillpayPayeesPage,
      BillpayHistoryPage,
      BillpaySortFiltersPage,
      BillpayScheduledPaymentDetailsPage,
      BillpayPayBillPage,
      BillpayModifyAutoPayPage,
      BillpayReviewPaymentPage,
      BillpayPaymentScheduledPage,
      BillpaySelectPaymentFrequencyPage,
      BillpayPaymentAmountPage,
      BillpayAddEditPayeePage,
      ShowAllEbillsPage,
      PayeeDetailsPage,
      AddPayeePage,
      BillpayPayToAccountPage,
      BillpayDevUiIndexPage

    ],
    entryComponents: [
      BillpayDashboardPage,
      BillpayHeaderPage,
      BillpayPaymentsPage,
      BillpayPayeesPage,
      BillpayHistoryPage,
      BillpaySortFiltersPage,
      BillpayScheduledPaymentDetailsPage,
      BillpayPayBillPage,
      BillpayModifyAutoPayPage,
      BillpayReviewPaymentPage,
      BillpayPaymentScheduledPage,
      BillpaySelectPaymentFrequencyPage,
      BillpayPaymentAmountPage,
      BillpayAddEditPayeePage,
      ShowAllEbillsPage,
      PayeeDetailsPage,
      AddPayeePage,
      BillpayPayToAccountPage,
      BillpayDevUiIndexPage

    ],
    providers: [
      BillpayProvider
    ],

    imports: [IonicModule, HeaderComponentModule,PipesModule, DirectivesModule],

    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillPayModule {

}
