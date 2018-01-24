import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TitleCasePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'titleCase',
})
export class TitleCasePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if (!value) {
      return '';
    } else {
      return value.replace(/\w\S*/g, (txt => {
        if (txt !== 'ELOC' && txt !== 'IRA' ) {
          return txt[0].toUpperCase() + txt.substr(1).toLowerCase();
        } else{
          console.log(txt);
          return txt;
        }
      } ));
    }
  }
}
