import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TruncatePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'formatPrice',
})
export class FormatPrice implements PipeTransform {
  /**
   * Truncates a string to the arguments value
   */
  transform(value: string, ...args) {
    let processedVal:any;
    value = value !== undefined ? 
      value !== null ? value.toString() : value
      : null;
    // value = value !== null ? value.toString() : value;
    if (value !== "0"){
      processedVal = value != null  ? ((parseFloat(value))/100).toFixed(2) : parseFloat("0").toFixed(2);
    } else {
      processedVal = parseFloat(value).toFixed(2)
    }
    // regex to add "," to thousands positions
    return processedVal.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
