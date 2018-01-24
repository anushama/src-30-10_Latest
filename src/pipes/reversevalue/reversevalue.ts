import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ReversevaluePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'reversevalue',
})
export class ReversevaluePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value) {
    if (!value) return;

    return value.reverse();
  }
}
