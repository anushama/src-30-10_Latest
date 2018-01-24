import { FormControl } from '@angular/forms';

export class ZipCodeValidator {

  static isValid(control: FormControl){
    const zipcode = (control.value != null ) ? control.value.replace(/\D/g, '') : "";

    if (zipcode == "" || (zipcode.length == 5)  || (zipcode.length == 9)){
      return null;
    }

    return {
      "invalidPhone": true
    };

  }
}
