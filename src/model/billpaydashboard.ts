
export class Transaction{
  payeeName: string;
  dueDateTime: string;
  payeeAccountNumber: string;
  nextCycleDate: string;
  dueAmount: string;
  payeeNickName: string;
  billStatus: string;
  consumerPayeeId: string;
  consumerPayeeName: string;
  consumerPayeeAccountNumber: string;
  dueDateForScheduled: string;
  deliverByDate: string;
  paymentAmount: string;
  eBillPayeeListFlag: boolean;
  paymentTypeIndicator: string;
  eBillPayeeList:string[] = [];
  paymentStatus: string;
  imageDispFlag: boolean = false;
  nameTruncateFlag: boolean = false;
  copy() : Transaction {
    let t = new Transaction();
    t.payeeName = this.payeeName;
    t.dueDateTime = this.dueDateTime;
    t.payeeAccountNumber = this.payeeAccountNumber;
    t.dueAmount = this.dueAmount;
    t.billStatus = this.billStatus;
    t.payeeNickName = this.payeeNickName;
    return t;
  }

}
