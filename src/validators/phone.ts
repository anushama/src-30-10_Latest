import { FormControl } from '@angular/forms';

export class PhoneNumValidator {

  static isValid(control: FormControl){
    const phoneNum = (control.value != null ) ? control.value.replace(/\D/g, '') : "";

    if (phoneNum == "" || (phoneNum.length >= 10 && phoneNum.length <= 16)){
      return null;
    }

    return {
      "invalidPhone": true
    };

  }
}
