import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'select-account',
  templateUrl: 'select-account.html'
})
export class SelectAccountComponent {

  @Input() public accounts: any;
  @Input() public externalAccounts: any;
  @Input() public numLast4: string;
  @Input() public transferType: string;
  @Output() selectedAccount: EventEmitter<any> = new EventEmitter();

  constructor() {
    console.log('Hello SelectAccountComponent');
  }

  selectaccount(account) {
    this.selectedAccount.emit(account);
  }

}
