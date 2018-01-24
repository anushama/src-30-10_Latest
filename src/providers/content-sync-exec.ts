/*
    DATE        INI     DESCRIPTION
 2017-10-02     LFR     Reverse AEM url
 2017-10-02     LFR     Replaced AEM url
 2017-09-14     LFR     Implemented cache of the data as is requested.
 2017-09-13     LFR     Set timestamp=0 to get all data until the timestamp issue is resolved.
 2017-09-12     LFR     Calc timestamp to be EST no DAYLIGHT SAVING.
 2017-09-11     LFR     Calc timestamp to be EST.
 2017-09-06     LFR     Added default directory from ContentSync and code.
                        Update url to get the changes from AEM.
 2017-08-31     LFR     Initial implementation
*/

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Device } from '@ionic-native/device';


@Injectable()
export class ContentSyncExec {
    public aemContentName       = 'aemContent';
    public cache                = {};

    public syncInfo             = null;
    public storageName          = 'syncInfo';
    public defaultBundlePath    = 'assets/' + this.aemContentName;
    // public contentServer        = {
    //                                 protocol:   'https://',
    //                                 server:     'mobile-qa.penfed.org',
    //                                 path:       '/var/contentsync/content/penfed-mobile/en/public/services/mobile-sync-zips/',
    //                                 file:       'mobile-sync.zip'
    //                               };

    public contentServer        = {
                                    protocol:   'https://',
                                    server:     'mobile-dev.penfed.org',
                                    path:       '/aem/content/penfed-mobile/en/public/services/',
                                    file:       'mobile-sync.zip'
                                  };
    public contentServerUrl     = this.contentServer.protocol + this.contentServer.server + this.contentServer.path + this.contentServer.file;
    // public contentServerUrl-1     = 'https://mobile-dev.penfed.org/aem/content/penfed-mobile/en/public/services/mobile-sync.zip';
    // public contentServerUrl-2    = 'https://mobile-qa.penfed.org/var/contentsync/content/penfed-mobile/en/public/services/mobile-sync-zips/mobile-sync.1506962002548.zip';
    public contentRelativePath  = '/www-aem/content/penfed-mobile/en/asset/data/';


    // https://github.com/phonegap/phonegap-plugin-contentsync
    // /Users/localuseradmin/Library/Developer/CoreSimulator/Devices/A0BE14CE-D794-4F2C-9DD7-3CB19D490B72/data/Containers/Data/Application/29C54D9E-F05D-43D6-BBE2-D05EA05AD1AA/Library/NoCloud/aemContentZip/www/content/penfed/premium/mobile/services/
    // file:///Users/localuseradmin/Library/Developer/CoreSimulator/Devices/A0BE14CE-D794-4F2C-9DD7-3CB19D490B72/data/Containers/Data/Application/43F33B19-2C7A-43D5-8EE2-42A389A7BAD3/Library/NoCloud/aemContentZip/www/content/dam/penfed/testimages/blogs/news-release-200px.jpg


    constructor(public device: Device, public http: Http) {
        setTimeout(()=>{ this.init() }, 1000);
        // this.init();
    }

    public init() {
        console.log('== ContentSyncExec: launched');
        this.getSyncInfo();

        if (this.device.cordova) {
            // gets latest content from AEM
            var options =   {
                                src:    this.contentServerUrl +
                                            '?ifModifiedSince=0',
                                id:     this.aemContentName,
                                type:   'merge'
                            };

            var syncHelper  = (<any>window).ContentSync.sync(options);
            console.log('== ContentSyncExec requested: ', options.src);

            syncHelper.on('complete', (data)=> {
                console.log('== ContentSyncExec: received aem content');
                this.syncInfo.lastTs = new Date().getTime() - 18000000;  // Make EST
                this.syncInfo.path = data.localPath;
                localStorage.setItem(this.storageName, JSON.stringify(this.syncInfo));
            });

            syncHelper.on('progress', function(data) {
                if (data.progress >= 0) {
                    console.log('== ContentSyncExec progress: ', data.progress + '%');
                }
            });

            syncHelper.on('error', function(e) {
                console.log('== ContentSyncExec Error: ', e.message);
            });

            syncHelper.on('cancel', function() {
                console.log('== ContentSyncExec: CANCELLED');
            });
        } else {
            console.log('== ContentSyncExec: on BROWSER');
            localStorage.removeItem(this.storageName);
            this.syncInfo.path  = this.defaultBundlePath;
        }
    }

    public getDataPath() {
        return this.syncInfo.path;
    }


    public getContent(contentName: string):Observable<any> {
        var content = this.getCacheItem(contentName);

        if ((content === null) || content.defaultPath) {
            let jsonPayloadUrl = this.syncInfo.path + this.contentRelativePath +  contentName + '.json';
            console.log('== ContentSyncExec: getContent from ', jsonPayloadUrl);
            return this.http.get(jsonPayloadUrl).map(res => {
                var retVal      = res.json(),
                    components  = res.url.split('/'),
                    contentName = components[components.length-1].split('.')[0];

                console.log('== ContentSync: Received Data to be cached');
                this.cache[contentName] =   {
                                                defaultPath: this.syncInfo.path === this.defaultBundlePath,
                                                payload: JSON.stringify(retVal) // Force to make a copy
                                            };
                return retVal;
            })
            .catch(this.handleError);
        } else {
            return Observable.create(observer => {
                observer.next(JSON.parse(content.payload));
                observer.complete();
            });
        }
    }

    private getSyncInfo() : void {
        this.syncInfo = JSON.parse(localStorage.getItem(this.storageName));

        if (this.syncInfo === null) {
            this.syncInfo = {
                                lastTs: 0,
                                path:   this.defaultBundlePath
                            };
            localStorage.setItem(this.storageName, JSON.stringify(this.syncInfo));

            console.log('== ContentSyncExec: New syncInfo');
        }

        console.log('== ContentSyncExec: getSyncInfo', this.syncInfo);
    }

    private getCacheItem(contentName) {
        if (this.cache.hasOwnProperty(contentName)) {
            console.log('== ContentSync: Sending CACHE Data ', contentName);
            return this.cache[contentName];
        } else {
            return null;
        }
    }

    private handleError(error:any) {
        let errMsg = (error.message) ? error.message :
                        error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
