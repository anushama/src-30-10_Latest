import {AbstractControl} from '@angular/forms';

export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('newpassword').value; // to get value in input tag
       let confirmPassword = AC.get('repeatpassword').value; // to get value in input tag
        if(password != confirmPassword) {
            console.log('false');
            AC.get('repeatpassword').setErrors( {MatchPassword: true} )
        } else {
            console.log('true');
            return null
        }
    }
}