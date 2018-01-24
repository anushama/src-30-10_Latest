import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UpdatePasswordProvider } from '../../providers/update-password/update-password';
import { ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Utility } from '../core/utility';
import { ErrorMessages } from '../../config/global-config';
import { StorageProvider } from "../../providers/storage/storage";
import { CustomValidators } from "../../validators/white-space";

@IonicPage()
@Component({
  selector: 'page-create-newpassword',
  templateUrl: 'create-newpassword.html',
})
export class CreateNewpasswordPage {
  util: any;
  changePasswordForm: FormGroup;
  public display: boolean;
  public buttonValidate: boolean = true;
  public localuserNameForPWD: string;
  public newPassword: string;
  public token: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder, public UPP: UpdatePasswordProvider, private viewCtrl: ViewController,private utility: Utility,private storageService: StorageProvider) {
    this.changePasswordForm = fb.group({
      newpassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16), CustomValidators.validateWhiteSpace, Validators.pattern(/^(?=.*\d){1,16}/)]],
      repeatpassword: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.storageService.readFromStorage('userForBillPay').then((data) => {
      if (data != null) {
        this.localuserNameForPWD = data;
      }
      console.log(this.localuserNameForPWD);
    });
    this.token = this.navParams.get('token');
  }

  popView() {
    this.navCtrl.pop();
    // Adobe Analytics page tracking
    this.utility.trackPage('CreateNewpasswordPage');
  }
  onBlurMethod() {
    let password = this.changePasswordForm.controls.newpassword.value; // to get value in input tag
    let confirmPassword = this.changePasswordForm.controls.repeatpassword.value; // to get value in input tag

    if (password != confirmPassword) {
      if (confirmPassword == "") {
        this.display = false;
      } else {
        //console.log('false');
        this.buttonValidate = true;
        this.display = true;
      }
    } else {
      //console.log('true');
      this.display = false;
      this.buttonValidate = false;
    }
  }

  onSubmit() {
    this.UPP.changePassword(this.localuserNameForPWD, this.newPassword, this.token).subscribe(data => {
      console.log(data.json());
      let res = data.json();
      if (res.success == true) {
        console.log("create new password success");
        this.navCtrl.push(LoginPage).then(() => {
          //first we find the index of the current view controller:
            let index = this.viewCtrl.index;
            //then we remove it from the navigation stack
            for(let i=index;i>0;i--){
             this.navCtrl.remove(i);
           }
         });
      } else if (res.success != true) {
        this.util.showAlert(ErrorMessages.ALERT, "", ErrorMessages.ACCOUNT_NICKNAME_NO_CHANGE, ErrorMessages.BUTTON_OK)
      }
    }, error => {
      this.util.showAlert(ErrorMessages.ALERT, "", ErrorMessages.ACCOUNT_NICKNAME_NO_CHANGE, ErrorMessages.BUTTON_OK)
      console.log(error);
    });
  }
}
