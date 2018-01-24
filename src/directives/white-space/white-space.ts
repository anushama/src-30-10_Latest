import { FormControl } from '@angular/forms';

export class CustomValidators {

  static validateWhiteSpace(c: FormControl) {
    let whitespaceRegEx = /^\S+$/;
    if(c.value !=""){
      return whitespaceRegEx.test(c.value) ? null : {
        whiteSpace: {
          valid: false
        }
      }
    }
  }
}
