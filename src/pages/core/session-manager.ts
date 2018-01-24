import { Injectable } from '@angular/core';

@Injectable()
export class SessionManager {
    public isLoggedIn: boolean = false;
    public accountsList: any = null;
    public IRAAccounts: any = null;
    public contactInfo: any = null;
    public sessionID: string = null;
    public deviceToken: string = null;
    public deviceInfo: string = null;
    public memberId: string = null;
    public userName: string = null;
    public travelNotifications: any = null;
    public DeviceUUID: string = null;
    public scheduledTransfers: any = null;
    public exploreList: any = null;
    public checkRootPage: any = null;
    public checkRootiInFingerprint: any = null;


    resetManager() {
        this.isLoggedIn = false;
        this.accountsList = null;
        this.IRAAccounts = null;
        this.contactInfo = null;
        this.sessionID = null;
        this.deviceInfo = null;
        this.memberId = null;
        this.travelNotifications = null;
        this.DeviceUUID = null;
        this.scheduledTransfers = null;
        this.exploreList = null;
        this.checkRootPage = null;
        this.checkRootiInFingerprint = null;
        this.userName = null;
    }

}
