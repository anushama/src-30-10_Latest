import {Pipe} from '@angular/core';
import {ContentSyncDataProvider} from "../providers/content-sync/conten-sync-data-provider";
import {GlobalConstants} from "../config/global-config"
import {ContentSyncExec} from "../providers/content-sync-exec";
import { Http } from '@angular/http';


/**
 * Pipe to replace aem key with value coming from AEM Content Sync Plugin
 */
@Pipe({
  name: 'aemsync'
})
export class AEMContentSyncKeyValuePipe {

  constructor(private contentSyncDataProvider: ContentSyncDataProvider,
               private contentSyncExec : ContentSyncExec, public http: Http) {
  }

  //move this base path to global config
  //private prePackagePath : string = GlobalConstants.aemPrePackageBasePath;//"assets/aemContent/www-aem/content/penfed-mobile/en/asset/data/";

  transform(key: any, args?: any): any {

    let prePackageBaseDir = GlobalConstants.aemPrePackageBasePath;
    let contentSyncBaseDir = GlobalConstants.aemContentSyncBasePath;
    let fileName;

    if(!!(fileName = args[0])) {
      fileName = args[0]+".json";
    }

    let contentSyncDir = this.contentSyncExec.getDataPath()+contentSyncBaseDir;//this.contentSyncDataProvider.getBasePlatformPath()+ contentSyncBaseDir;
    let prePackageDir = this.contentSyncDataProvider.getBasePlatformPath()+ prePackageBaseDir;

    //return if data found in cache
    let res = this.contentSyncDataProvider.getFromCache(contentSyncDir+fileName);
    if(res != null) {
      console.log("found data in cache for contentsyncdir["+contentSyncDir+"], filename["+fileName+"]");
      return new Promise((resolve, reject) => resolve(res[key]));
    }

    return this.http.get(contentSyncDir+fileName).map(
      data => {
          console.log("found data in contentsyncdir["+contentSyncDir+"], filename["+fileName+"]");
          let response = data.json();
          this.contentSyncDataProvider.addToCache(contentSyncDir+fileName,response);
          return response[key];
      } ).catch(
      err =>  {
        console.log("Failed to load data from contentSyncDir["+contentSyncDir+","+fileName+"], now loading from ["+prePackageDir+","+fileName+"]");
        return this.getData(prePackageDir, fileName, key);
      }).toPromise();
  }

  private getData(path: string, fileName, key: any) {
    return this.contentSyncDataProvider.getLocalStorageData(
      this.contentSyncDataProvider.getBasePlatformPath()+this.getFilePath(path, fileName)).then(data => {
      if (data != "undefined")
        return data[key];
    })
  }


  private getFilePath(parentDir: string, fileName: string) {
    return parentDir + fileName;
  }
}
