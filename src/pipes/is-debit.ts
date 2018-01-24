import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the IsDebitPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'isDebit',
})
export class IsDebitPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    //let resp:string;
    if(args[0]=== true){
      value = "-"+value;
    }
    return value;
  }
}
