import { NgModule } from '@angular/core';
import { IsDebitPipe } from './is-debit';
import { TruncatePipe } from './truncate';
import { FormatPrice } from './formatPrice';
import { FormatAccountNumberPipe } from './format-account-number';
import { CategoryPipe } from './category';
import { AEMContentSyncKeyValuePipe } from './aemkey';
import { TitleCasePipe } from './title-case/title-case';
import { ReversevaluePipe } from './reversevalue/reversevalue';
import { OrderTransactionsByPipe } from './order-transactions-by/order-transactions-by';

@NgModule({
    declarations: [
        IsDebitPipe,
        TruncatePipe,
        FormatPrice,
        FormatAccountNumberPipe,
        CategoryPipe,
        AEMContentSyncKeyValuePipe,
        TitleCasePipe,
        ReversevaluePipe,
        OrderTransactionsByPipe
    ],
    imports: [
    ],
    exports: [
        IsDebitPipe,
        TruncatePipe,
        FormatPrice,
        FormatAccountNumberPipe,
        CategoryPipe,
        AEMContentSyncKeyValuePipe,
        TitleCasePipe,
        ReversevaluePipe,
        OrderTransactionsByPipe
    ]
})
export class PipesModule {}