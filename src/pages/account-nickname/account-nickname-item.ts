import { Component, Input } from '@angular/core';
import { NavController } from "ionic-angular";
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'account-nickname-item',
  templateUrl: 'account-nickname-item.html'
})
export class AccountNicknameItemComponent {

  nicknameForm: FormGroup;
  @Input()
  public accountType: any;
  @Input()
  public accountTypeLabel: string;
  public regex:any;

  constructor(private navCtrl: NavController) {
    this.regex = new RegExp(/^[a-z0-9]+$/i);
    // let group: any = {}
    // this.nicknameForm = this.fb.group({
    //   nickname: [this.accountType.nickname, [Validators.maxLength(20), Validators.pattern(/^[a-z0-9]+$/i)]]
    //   //'this.accountType.numLast4':['',[Validators.maxLength(20), Validators.pattern(/^[a-z0-9]+$/i)]]
    // })
  }
}
