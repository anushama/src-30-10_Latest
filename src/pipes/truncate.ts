import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TruncatePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  /**
   * Truncates a string to the arguments value
   */
  transform(value: string, ...args) {
    let maxLength:number = 20;
    if(value.length>maxLength){
      if (args.length && args[0] <= maxLength){
        value = value.slice(0, args[0]);
      } else{
        value = value.slice(0, maxLength);
      }
      value = value + '...';
    }
    return value;
  }
}
