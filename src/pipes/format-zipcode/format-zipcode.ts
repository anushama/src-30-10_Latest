import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FormatZipcodePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'format-zipcode',
})
export class FormatZipcodePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value.toLowerCase();
  }
}
