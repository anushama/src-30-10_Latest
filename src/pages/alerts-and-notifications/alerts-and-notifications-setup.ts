import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { SessionManager } from '../core/session-manager';
import { AlertsNotificationsServiceProvider } from '../../providers/alerts-notifications-service/alerts-notifications-service';
import { StorageProvider } from '../../providers/storage/storage';
import { Utility } from '../core/utility';
import { ErrorMessages } from '../../config/global-config';
@Component({
    selector: 'page-alerts-and-notifications-setup',
    templateUrl: 'alerts-and-notifications-setup.html',
})
export class AlertsAndNotificationsSetupPage {

    public doNotDisturb: boolean = false;
    public accountBalanceAlert: string = 'daily';
    private startTimeText: any;
    private endTimeText: any;
    private prevClicked: number = 0;
    public alertConfigAccountsList: any = [];

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private platform: Platform,
        private sessionManager: SessionManager,
        private alertsNotificationsService: AlertsNotificationsServiceProvider,
        private utility: Utility) {
        this.startTimeText = "23:00";
        this.endTimeText = "08:00";

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingsNotificationsPage');
        this.setupAlertNotifications();
    }

    private setupAlertNotifications() {

        let actList = this.sessionManager.accountsList;
        for (let act in actList) {
            if (actList[act] != null && actList[act].length > 0 && actList[act].constructor === Array) {
                var actObj = actList[act];
                for (var index = 0; index < actObj.length; index++) {
                    var alertObj = {
                        numLast4: actObj[index].numLast4,
                        accountMask: actObj[index].accountMask,
                        actName: actObj[index].nickname || actObj[index].fullName,
                        showDetails: false,
                        isExpanded: false,
                        isSelected: false,
                        acctType: actObj[index].acctType,
                        accountAlertList: null
                    };

                    switch (actObj[index].parentAcctType) {
                        case "CREDITCARD":
                            alertObj.accountAlertList = [
                                { label: "Credit Card Payment due in 10 days", type: "basic", options: null, typeCode: "75", iToggle: false, fldValue: "", id: alertObj.numLast4 },
                                { label: "Credit Card Payment overdue", type: "basic", options: null, typeCode: "77", iToggle: false, fldValue: "", id: alertObj.numLast4 },
                                { label: "Credit Card Payment posted", type: "basic", options: null, typeCode: "76", iToggle: false, fldValue: "", id: alertObj.numLast4 }
                            ];
                            break;
                        case "LOAN":
                            alertObj.accountAlertList = [
                                { label: "Loan Payment due in 10 days", type: "basic", options: null, typeCode: "72", iToggle: false, fldValue: "", id: alertObj.numLast4 },
                                { label: "Loan Payment overdue", type: "basic", options: null, typeCode: "71", iToggle: false, fldValue: "", id: alertObj.numLast4 },
                                { label: "Loan Payment posted", type: "basic", options: null, typeCode: "70", iToggle: false, fldValue: "", id: alertObj.numLast4 }
                            ];
                            break;
                        case "CHECKING_SAVING":
                            if (actObj[index].acctType == "RSV") {
                                alertObj.accountAlertList = [
                                    { label: "Insufficient Funds", type: "basic", options: null, typeCode: "65", iToggle: false, fldValue: "", id: alertObj.numLast4 },
                                    { label: "Account Balance falls below", type: "amount", options: null, typeCode: "63", iToggle: false, fldValue: "", id: alertObj.numLast4 },
                                    { label: "Deposit Posted exceeds", type: "amount", options: null, typeCode: "60", iToggle: false, fldValue: "", id: alertObj.numLast4 },
                                    { label: "Withdrawal Posted exceeds", type: "amount", options: null, typeCode: "61", iToggle: false, fldValue: "", id: alertObj.numLast4 },
                                ];

                            } else if (actObj[index].acctType == "DD3") {
                                alertObj.accountAlertList = [
                                    { label: "Insufficient Funds", type: "basic", options: null, typeCode: "65", iToggle: false, fldValue: null, id: alertObj.numLast4 },
                                    { label: "Account Balance alert", type: "radio", options: null, typeCode: "67", iToggle: false, fldValue: 'Weekly', id: alertObj.numLast4 },
                                    { label: "Account Balance falls below", type: "amount", options: null, typeCode: "63", iToggle: false, fldValue: null, id: alertObj.numLast4 },
                                    { label: "Deposit Posted exceeds", type: "amount", options: null, typeCode: "60", iToggle: false, fldValue: "", id: alertObj.numLast4 },
                                    { label: "Withdrawal Posted exceeds", type: "amount", options: null, typeCode: "61", iToggle: false, fldValue: "", id: alertObj.numLast4 },
                                    { label: "Cleared Check exceeds", type: "amount", options: null, typeCode: "62", iToggle: false, fldValue: "150.40", id: alertObj.numLast4 }
                                ];

                            } else {
                                alertObj.accountAlertList = [
                                    { label: "Insufficient Funds", type: "basic", options: null, typeCode: "65", iToggle: false, fldValue: "", id: alertObj.numLast4 },
                                    { label: "TCS/Overdraft Advance has posted", type: "basic", options: null, typeCode: "64", iToggle: false, fldValue: "", id: alertObj.numLast4 },
                                    { label: "Account Balance alert", type: "radio", options: null, typeCode: "67", iToggle: false, fldValue: "Weekly", id: alertObj.numLast4 },
                                    { label: "Account Balance falls below", type: "amount", options: null, typeCode: "63", iToggle: false, fldValue: "", id: alertObj.numLast4 },
                                    { label: "Deposit Posted exceeds", type: "amount", options: null, typeCode: "60", iToggle: false, fldValue: "", id: alertObj.numLast4 },
                                    { label: "Withdrawal Posted exceeds", type: "amount", options: null, typeCode: "61", iToggle: false, fldValue: "", id: alertObj.numLast4 },
                                    { label: "Cleared Check exceeds", type: "amount", options: null, typeCode: "62", iToggle: false, fldValue: "", id: alertObj.numLast4 }
                                ];

                            }
                            break;
                        default:
                            console.log('Couldn\'t detect account type');
                            break;
                    }
                    //push to array
                    if (alertObj.accountAlertList != null) {
                        this.alertConfigAccountsList.push(alertObj);
                    }

                }

            }
        }
        this.prepopulateNotificationsList();
        console.log(this.alertConfigAccountsList);
    }
    toggleDetails(index, selectedAccount) {

        if (this.prevClicked != index) {
            this.alertConfigAccountsList[this.prevClicked].showDetails = false;
            this.alertConfigAccountsList[this.prevClicked].isExpanded = false;
        }

        this.prevClicked = index;
        if (selectedAccount.showDetails) {
            selectedAccount.showDetails = false;
            selectedAccount.isExpanded = false;
            selectedAccount.icon = 'ios-add-circle-outline';
        } else {
            selectedAccount.showDetails = true;
            selectedAccount.isExpanded = true;
            selectedAccount.icon = 'ios-remove-circle-outline';
        }
    }
    toggleSettings(e, idx, selectedAccount, selectedItem) {
        var anyListItemIsEnabled = selectedAccount.accountAlertList;
        selectedItem.iToggle = !selectedItem.iToggle;
        if (e._value == true) {
            selectedAccount.isSelected = e._value;
        } else {
            selectedAccount.isSelected = e._value;
            for (let list of anyListItemIsEnabled) {
                if (list.iToggle != e._value) {
                    selectedAccount.isSelected = true;
                }
            }
        }

    }
    toggleDonotDisturb(e) {
        this.doNotDisturb = e.value;
    }

    frequencyToggle(e, item) {
        item.fldValue = e.value;
        console.log("Frequency changed..end:" + e.value);
    }
    saveAlertSettings() {
        let requestObject = {
            preferences: {
                configuredAlerts: [],
                deviceTokens: this.sessionManager.deviceToken,
                dndStartHour: null,
                dndEndHour: null,
                memberNumber: this.sessionManager.memberId

            }
        };
        if (this.doNotDisturb) {
            requestObject.preferences.dndStartHour = this.startTimeText;
            requestObject.preferences.dndEndHour = this.endTimeText;
        }
        for (var idx = 0; idx < this.alertConfigAccountsList.length; idx++) {
            let account = this.alertConfigAccountsList[idx];
            for (var i = 0; i < account.accountAlertList.length; i++) {
                let item = account.accountAlertList[i];
                if (item.iToggle) {
                    let configObj = {
                        alertType: item.typeCode,
                        accountUUID: account.accountMask,
                        numLast4: account.numLast4,
                        alertOptionsJSON: null,
                        amount: null,
                        frequency: null
                    };
                    if (item.type === 'amount') {
                        configObj.alertOptionsJSON = {
                            amount: item.fldValue
                        };
                        configObj.amount = item.fldValue;
                    } else if (item.type === 'radio') {
                        configObj.alertOptionsJSON = {
                            frequency: item.fldValue
                        };
                        configObj.frequency = item.fldValue;
                    }
                    requestObject.preferences.configuredAlerts.push(configObj);
                }
            }
        }
        console.log(requestObject);
        this.alertsNotificationsService.saveAlertPrefernces(requestObject).subscribe(
            (response: any) => {
                let res = JSON.parse(response._body);
                if (res.success) {
                    this.navCtrl.popToRoot();
                } else {
                    this.utility.showAlert(ErrorMessages.SORRY, '', ErrorMessages.ALERT_SETTING_ERROR_MSG, ErrorMessages.BUTTON_OK);
                }

            }, err => {
                this.utility.showAlert(ErrorMessages.SORRY, '', ErrorMessages.ALERT_SETTING_ERROR_MSG, ErrorMessages.BUTTON_OK);
            }, () => {
            });

    }
    private addDeviceUID() {
        var deliveryChannel: string = 'GCM';

        if (this.platform.is("cordova")) {
            if (this.platform.is('ios')) {
                deliveryChannel = 'APNS';
            }
            else if (this.platform.is('android')) {
                deliveryChannel = 'GCM';
            }
        }
        //TODO - replace 353 with const and actual value
        let requestObject = {
            preferencesId: '353',
            token: this.sessionManager.DeviceUUID,
            deliveryService: deliveryChannel
        };
        this.alertsNotificationsService.addDeviceUID(requestObject).subscribe(
            (response: any) => {
                let res = JSON.parse(response._body);
                if (res.success) {
                    this.navCtrl.popToRoot();
                } else {
                    this.utility.showAlert(ErrorMessages.SORRY, '', ErrorMessages.ALERT_SETTING_ADDUID_ERROR_MSG, ErrorMessages.BUTTON_OK);
                }

            }, err => {
                this.utility.showAlert(ErrorMessages.SORRY, '', ErrorMessages.ALERT_SETTING_ADDUID_ERROR_MSG, ErrorMessages.BUTTON_OK);
            }, () => {
            });

    }

    private prepopulateNotificationsList() {
        this.alertsNotificationsService.getAlertPrefernces().subscribe(
            result => {
                let accountsObj = result;
                let preferencesObj = accountsObj.preferences.preferences.configuredAlerts;
                if (preferencesObj.length != 0) {
                    this.configuredResponseObj(preferencesObj);
                }
            },
            err => {
                let preferencesObj = this.preferenceObj();
                this.configuredResponseObj(preferencesObj);
            }
        );
        
    }

    private preferenceObj() {
        let preferencesObj = {  
               "configuredAlerts":[  
                  {  
                     "alertType":"65",
                     "accountUUID":"e09e9c87-fd4e-40b0-ac22-dba45b92b213",
                     "alertOptionsJSON":"{}",
                     "amount":null,
                     "frequency":null,
                     "numLast4":"9384"
                  },
                  {  
                     "alertType":"67",
                     "accountUUID":"e09e9c87-fd4e-40b0-ac22-dba45b92b213",
                     "alertOptionsJSON":"{\"frequency\":\"Daily\"}",
                     "amount":null,
                     "frequency":"Daily",
                     "numLast4":"9384"
                  },
                  {  
                     "alertType":"63",
                     "accountUUID":"e09e9c87-fd4e-40b0-ac22-dba45b92b213",
                     "alertOptionsJSON":"{\"amount\":45000}",
                     "amount":45000,
                     "frequency":null,
                     "numLast4":"4444"
                  },
                  {  
                     "alertType":"60",
                     "accountUUID":"e09e9c87-fd4e-40b0-ac22-dba45b92b213",
                     "alertOptionsJSON":"{\"amount\":150000}",
                     "amount":150000,
                     "frequency":null,
                     "numLast4":"9384"
                  },
                  {  
                     "alertType":"61",
                     "accountUUID":"e09e9c87-fd4e-40b0-ac22-dba45b92b213",
                     "alertOptionsJSON":"{\"amount\":34000}",
                     "amount":34000,
                     "frequency":null,
                     "numLast4":"9384"
                  },
                  {  
                     "alertType":"75",
                     "accountUUID":"3ec692cc-b660-4ca5-855b-10ddf46c4318",
                     "alertOptionsJSON":"{}",
                     "amount":null,
                     "frequency":null,
                     "numLast4":"8312"
                  },
                  {  
                     "alertType":"77",
                     "accountUUID":"3ec692cc-b660-4ca5-855b-10ddf46c4318",
                     "alertOptionsJSON":"{}",
                     "amount":null,
                     "frequency":null,
                     "numLast4":"8312"
                  },
                  {  
                     "alertType":"77",
                     "accountUUID":"82f214b4-023d-4365-9bc9-bda3917e052b",
                     "alertOptionsJSON":"{}",
                     "amount":null,
                     "frequency":null,
                     "numLast4":"8312"
                  }
               ],
               "deviceTokens":  "12345555",
               "dndStartHour":"23:00:00",
               "dndEndHour":"08:00:00"
         };
            return preferencesObj;
    }

    private configuredResponseObj(preferenceData:any) {
      
        if (preferenceData !=null && preferenceData.dndStartHour !=null){
            this.doNotDisturb = true;
            this.startTimeText = preferenceData.dndStartHour;
            this.endTimeText = preferenceData.dndEndHour;
        }

     if (preferenceData !=null && preferenceData.configuredAlerts.length >0){
         let configuredAlertsData = preferenceData.configuredAlerts;
        for (var idx = 0; idx < this.alertConfigAccountsList.length; idx++) {
            let account = this.alertConfigAccountsList[idx];
            for (var jdx=0; jdx< configuredAlertsData.length; jdx++){
                if (account.numLast4 == configuredAlertsData[jdx].numLast4 || account.accountMask == configuredAlertsData[jdx].accountUUID) {
                   if (account.accountAlertList.length){
                    let alertItems = account.accountAlertList;
                    for (var kdx = 0; kdx < alertItems.length; kdx++){
                        if(alertItems[kdx].typeCode === configuredAlertsData[jdx].alertType){
                            alertItems[kdx].iToggle = true;
                            account.isSelected = true;
                            if (alertItems[kdx].type === 'amount'){
                                alertItems[kdx].fldValue = configuredAlertsData[jdx].amount;
                            }
                            else  if (alertItems[kdx].type === 'radio'){
                                alertItems[kdx].fldValue = configuredAlertsData[jdx].frequency;
                            }
                            break;
                        }
                    }
                }
                }
            }
        }
     } 
   
    }
    popView(){
        this.navCtrl.popToRoot();
    }
  
}