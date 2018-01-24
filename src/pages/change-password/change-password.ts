import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UpdatePasswordProvider } from '../../providers/update-password/update-password';
import { SettingsPage } from '../settings/settings';
import { Utility } from '../core/utility';
import { StorageProvider } from "../../providers/storage/storage";
import { CustomValidators } from "../../validators/white-space";
import { ErrorMessages } from "../../config/global-config";


@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  changePasswordForm: FormGroup;
  public shown: boolean;
  public display: boolean;
  public buttonValidate: boolean = true;
  public localuserNameForPWD: any;
  public confirmPassword:any;
  public currentPassword:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder, private storageService: StorageProvider,public UPP:UpdatePasswordProvider,private utility: Utility) {
    this.changePasswordForm = fb.group({
      currentpassword: ['', [Validators.required, Validators.minLength(6)]],
      newpassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16), CustomValidators.validateWhiteSpace, Validators.pattern(/^(?=.*\d){1,16}/)]],
      repeatpassword: ['', [Validators.required, Validators.minLength(6)]]
    })

    this.storageService.readFromStorage('userNameForPWD').then((data) => {
      if (data != null) {
        this.localuserNameForPWD = data;
      }
      console.log(this.localuserNameForPWD);
    });
    console.log(this.localuserNameForPWD);
  }

  onBlurMethod() {
    let password = this.changePasswordForm.controls.newpassword.value; // to get value in input tag
    let confirmPassword = this.changePasswordForm.controls.repeatpassword.value; // to get value in input tag

    if (password != confirmPassword) {
      if (confirmPassword == "") {
        this.display = false;
      } else {
        console.log('false');
        this.buttonValidate = true;
        this.display = true;
      }
    } else {
      console.log('true');
      this.display = false;
      this.buttonValidate = false;
    }
  }

  submit(){
    this.UPP.updatePassword(this.localuserNameForPWD, this.currentPassword, this.confirmPassword).subscribe(data => {
      console.log(data.json());
      let res = data.json();
      if(res.success == true){
        console.log("change password success");
        this.navCtrl.push(SettingsPage);
      }else{
       this.utility.showAlert(ErrorMessages.POPUP_TTILE, "", ErrorMessages.COMMON_ERROR_MESSAGE, ErrorMessages.BUTTON_OK);
      }
    }, error => {
      console.log(error);
    });
  }
}
