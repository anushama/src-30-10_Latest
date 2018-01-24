import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the OrderByPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'orderTransactionsBy',
})
export class OrderTransactionsByPipe implements PipeTransform {
  /**
   * Sort and organize transactions by date, amount and display name.
   */
  transform(value:[any], ...args) {
    console.log( value, args)
    if (args[0].accountType = "CREDITCARD"){

      let property, asc = false;
      
      switch (args[0].sort) {
        case 'dateNewFirst':
          property = 'transactionDateComparisonFormat';
          break;
        case 'dateOldFirst':
          property = 'transactionDateComparisonFormat';
          asc = true;
          break;
        case 'amountHighLow':
          property = 'amount';
          break;
        case 'amountLowHigh':
          property = 'amount';
          asc = true;
          break;
        case 'merchantAZ':
          property = 'displayName';
          asc = true;
          break;
        default:
          property = 'displayName';
      }
      
      value = value.sort(function(a, b) {
        if (a.pending !== b.pending) {
          // first compare pending flag - always show pending transactions at the top of the list
          if (a.pending) {
            return -1;
          }
          else {
            return 1;
          }
        }
        else {
          // compare the property to sorty by
          if (asc) {
            return (a[property] > b[property]) ? 1 : ((a[property] < b[property]) ? -1 : 0);
          }
          else {
            return (b[property] > a[property]) ? 1 : ((b[property] < a[property]) ? -1 : 0);
          }
        }
      });
    }
    return value;
  }
}
