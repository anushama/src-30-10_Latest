import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppSettings } from '../../../pages/core/app-settings';
import { Transaction } from '../../../model/billpaydashboard';

/*
  Generated class for the BillpayProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class BillpayProvider {

  headers = new Headers({
    'Content-Type': 'application/json',
    'API_KEY': 'MOBILE',
    'X-HTTP-Method-Override': 'GET'
  });

  options = new RequestOptions({ headers: this.headers, withCredentials: true });

  constructor(public http: Http, private appSettings: AppSettings) {
    console.log('Hello BillpayProvider Provider');
  }

  getActivePayeesInfo(memberNumber : string , allUnPaidTransactions : Map<string, Transaction> ) {
    //let serviceUrl = "http://localhost:8080/webapp/rest/private/billpay/billpayees/v001";
    let serviceUrl = "https://mobile-qa.penfed.org/rest/private/billpay/billpayees/v001";
    let data = "{\"fisUserId\":\"" + memberNumber + "\"}";
    return this.http.post(serviceUrl, data, this.options).map((response) => {
      let data = response.json();
      let payeeIds:string[] = [];
      let eBills:string[] = [];
      let eBillsList = new Transaction();

      data.billPayees.forEach(function(billPayee) {
          if (billPayee.payeeStatus == "ACTIVE") {
            payeeIds.push(billPayee.consumerPayeeId);
            let t = new Transaction();
            t.payeeName = billPayee.payeeName;
            t.payeeAccountNumber = billPayee.payeeAccountNumber;
            t.paymentTypeIndicator = billPayee.paymentRuleType;
            t.payeeNickName = billPayee.payeeNickname
            t.eBillPayeeListFlag = false;

            if(billPayee.billInfo.status == "ACTIVE"){
              t.eBillPayeeListFlag = true;
              eBillsList.eBillPayeeList.push(billPayee.consumerPayeeId);
            }
            allUnPaidTransactions.set(billPayee.consumerPayeeId, t);
        }


      });
      allUnPaidTransactions.set("eBillsList", eBillsList);
      return payeeIds;
    }).toPromise();
  }
  getUnPaidBillsInfo(memberNumber, statusParams, allUnPaidTransactions : Map<string, Transaction>) {
    let billStatusList = allUnPaidTransactions.get("eBillsList");
    console.log("billStatusList--->");
    console.log("memberNumber--->"+memberNumber);
    console.log(billStatusList.eBillPayeeList);
    //let serviceUrl = "http://localhost:8080/webapp/rest/private/billpay/bills/v001";
    let serviceUrl = "https://mobile-qa.penfed.org/rest/private/billpay/bills/v001";
    let data = '{"fisUserId":\"' + memberNumber + '\","billPayeeList":[' + billStatusList.eBillPayeeList + '], "billStatusList":[\"' + statusParams + '\"]}';

    let unPaidTransactions : Transaction[] = [];

    return this.http.post(serviceUrl, data, this.options).map((response) => {
      let data = response.json();
      console.log(data.bills);
      let t ;
      if(data.messages){
        if(data.messages.length === 0){
          unPaidTransactions = [];
        } else if(data.messages[0].code === "BIL006"){
          unPaidTransactions = [];
        }
      }
       else {
        data.bills.forEach(function(bill) {
          t = allUnPaidTransactions.get(bill.consumerPayeeId).copy();
          t.dueDateTime = bill.dueDateTime;
          t.dueAmount = bill.dueAmount.value;
          t.billStatus = bill.billStatus;
          if(t.eBillPayeeListFlag) {
            console.log("EBILLLIST="+JSON.stringify(t));
          }
          unPaidTransactions.push(t);
        });
      }
      return unPaidTransactions;
    }).toPromise();
  }

  getAllEBills(memberNumber, allUnPaidTransactions : Map<string, Transaction>) {

    let payeeIdList = allUnPaidTransactions.get("eBillsList");
    console.log("payeeIdList--->")
    console.log(payeeIdList);
    console.log(payeeIdList.eBillPayeeList);
    //let serviceUrl = "http://localhost:8080/webapp/rest/private/billpay/bills/v001";
    let serviceUrl = "https://mobile-qa.penfed.org/rest/private/billpay/bills/v001";
    let data = '{"fisUserId":\"' + memberNumber + '\","billPayeeList":[' + payeeIdList.eBillPayeeList +']}';


    return this.http.post(serviceUrl, data, this.options).map((response) => {
      let data = response.json();
      let t ;

      let eBillsTransactions : Transaction[] = [];

      data.bills.forEach(function(bill) {
        //  let t = new Transaction();
        t = allUnPaidTransactions.get(bill.consumerPayeeId).copy();
        t.dueDateTime = bill.dueDateTime;
        t.dueAmount = bill.dueAmount.value;
        t.billStatus = bill.billStatus;

        eBillsTransactions.push(t);

      });
      console.log("eBillsTransactions="+JSON.stringify(eBillsTransactions))
      return eBillsTransactions;
    }).toPromise();
  }

  getScheduledBills(memberNumber, activeMembers, paymentStatusForSchedule,allUnPaidTransactions : Map<string, Transaction>) {
    //let serviceUrl = "http://localhost:8080/webapp/rest/private/billpay/payments/v001";
    let serviceUrl = "https://mobile-qa.penfed.org/rest/private/billpay/payments/v001";
    let data = '{"fisUserId":\"' + memberNumber + '\","paymentStatus":' + paymentStatusForSchedule + ', "consumerPayeeIds":[' + activeMembers + ']}';

    return this.http.post(serviceUrl, data, this.options).map((response) => {
      let data = response.json();
      let t ;
      let scheduledTransactions : Transaction[] = [];
      let eBillsList = allUnPaidTransactions.get("eBillsList");

      console.log("eBillsList.....!!!");
      console.log(eBillsList);
       if(data.payments && data.messages.length === 0) {

          data.payments.forEach(function(paymentsInfo) {
            t = new Transaction();
            t.consumerPayeeId = paymentsInfo.consumerPayeeInformation.consumerPayeeId;
            t.consumerPayeeName = paymentsInfo.consumerPayeeInformation.consumerPayeeName;
            t.consumerPayeeAccountNumber = paymentsInfo.consumerPayeeInformation.consumerPayeeAccountNumber;
            t.dueDateForScheduled = paymentsInfo.dueDate;
            t.deliverByDate = paymentsInfo.deliverByDate;
            t.paymentAmount = paymentsInfo.paymentAmount;
            if(paymentsInfo.paymentRuleType == "AUTOMATIC_REGULAR_INTERVALS"){
              t.paymentTypeIndicator = "assets/RecurringPayment_Icon.svg";
              t.imageDispFlag = true;
            }
            if(paymentsInfo.paymentRuleType == "AUTOMATIC_IN_RESPONSE_TO_EBILL"){
              t.paymentTypeIndicator = "assets/E-Bill_Icon.svg";
              t.imageDispFlag = true;
            }

            scheduledTransactions.push(t);

          });
      } else if(data.messages){
        
          if(data.messages.length === 0){
            scheduledTransactions = [];
          } else if(data.messages[0].code === "PMT087"){
            scheduledTransactions = [];
          }
        
      }
      return scheduledTransactions;
    }).toPromise();
  }

  getPayeesInfo(memberNumber : string , allUnPaidTransactions : Map<string, Transaction> ){
    //let serviceUrl = "http://localhost:8080/webapp/rest/private/billpay/billpayees/v001";
   let serviceUrl = "https://mobile-qa.penfed.org/rest/private/billpay/billpayees/v001";
    let data = "{\"fisUserId\":\"" + memberNumber + "\"}";
    return this.http.post(serviceUrl, data, this.options).map((response) => {
      let data = response.json();
      let payeeTransactions : Transaction[] = [];
      data.billPayees.forEach(function(billPayee) {
          if (billPayee.payeeStatus == "ACTIVE") {
            let t = new Transaction();
            if(billPayee.payeeName != null && billPayee.payeeName.length >=20){
              t.nameTruncateFlag = true;
            }
            t.payeeName = billPayee.payeeName;
            t.payeeNickName = billPayee.payeeNickname;
            t.payeeAccountNumber = billPayee.payeeAccountNumber;
            t.paymentTypeIndicator = billPayee.paymentRuleType;
            t.consumerPayeeId = billPayee.consumerPayeeId;
            t.nextCycleDate = billPayee.nextCycleDate;
            payeeTransactions.push(t);
          }
        });
      return payeeTransactions;
    }).toPromise();
  }

  getHistoryBillsInfo(data) {
    //return this.appSettings.getBillpayUrls("mockBillPay");
   let serviceUrl = "https://mobile-qa.penfed.org/rest/private/billpay/payments/v001";
    return this.http.post(serviceUrl, data, this.options).map((response) => {
      let data = response.json();
      let historyTransactions : Transaction[] = [];
      if(data.payments && data.messages.length === 0) {
        data.payments.forEach(function(paymentObj) {
          if (paymentObj.status != ("SCHEDULED" || "IN_PROCESS" || "PENDING" || "SENT")) {
            let t = new Transaction();
            t.payeeName = paymentObj.consumerPayeeInformation.consumerPayeeName;
            t.dueDateTime = paymentObj.dueDate;
            t.paymentStatus = paymentObj.status;
            t.payeeNickName = paymentObj.consumerPayeeInformation.consumerPayeeNickname;
            t.payeeAccountNumber = paymentObj.consumerPayeeInformation.consumerPayeeAccountNumber;
            t.paymentAmount = paymentObj.paymentAmount.value;
            historyTransactions.push(t);
          }
        });
      } else if(data.messages){
          if(data.messages.length === 0){
            historyTransactions = [];
          } else if(data.messages[0].code === "CON001" || data.messages[0].code === "PMT087"){
            historyTransactions = [];
          }
        
      }
     
      return historyTransactions;
    }).toPromise();
  }
  // getHistoryBillsInfoForScheduled(data) {
  //  let serviceUrl = "https://mobile-qa.penfed.org/rest/private/billpay/payments/v001";
  //  return this.http.post(serviceUrl, data, this.options).map((response) => {
  //     let data = response.json();
  //     let historyTransactions : Transaction[] = [];
  //     if(data.payments && data.messages.length === 0) {
  //       data.payments.forEach(function(paymentObj) {
  //         if (paymentObj.status != ("SCHEDULED" || "IN_PROCESS" || "PENDING" || "SENT")) {
  //           let t = new Transaction();
  //           t.payeeName = paymentObj.consumerPayeeInformation.consumerPayeeName;
  //           t.dueDateTime = paymentObj.dueDate;
  //           t.paymentStatus = paymentObj.status;
  //           t.payeeNickName = paymentObj.consumerPayeeInformation.consumerPayeeNickname;
  //           t.payeeAccountNumber = paymentObj.consumerPayeeInformation.consumerPayeeAccountNumber;
  //           t.paymentAmount = paymentObj.paymentAmount.value;
  //           historyTransactions.push(t);
  //         }
  //       });
  //     } else if(data.messages){
  //         if(data.messages.length === 0){
  //           historyTransactions = [];
  //         } 
  //     }
     
  //     return historyTransactions;
  //   }).toPromise();
  // }

  getBillPayEnableOption(member){
    let codeResponse: any;
    let headers = new Headers({
      'API_KEY': 'MOBILE',
      'USER_ID': 'MSR_RACF_ID'
    });

    let options = new RequestOptions({ headers: this.headers, withCredentials: true });
    //let serviceUrl = "http://localhost:8080/webapp/rest/private/billpay/credentials/v001/"+member;
   let serviceUrl = "https://mobile-qa.penfed.org/rest/private/billpay/credentials/v001/"+member;
    console.log(serviceUrl);
    return this.http.get(serviceUrl, options).map((response) => {
      let data = response.json();
      return data;
    }).toPromise();
  }

}
