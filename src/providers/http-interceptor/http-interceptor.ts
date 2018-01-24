import { Injectable } from "@angular/core";
import { ConnectionBackend, RequestOptions, RequestOptionsArgs, Response, Http } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Utility } from "../../pages/core/utility";
import { ErrorMessages } from "../../config/global-config";
import { LoadingController } from "ionic-angular";

@Injectable()
export class InterceptedHttp extends Http {
    private nospinner: string[] = ['greetingInfo', 'certificates', 'ibm_security_logout', 'webapp', 'j_security_check'];
    private noerror: string[] = ['greetingInfo', 'certificates', 'ibm_security_logout', 'webapp'];
    private loadContent = "<div class='loading-crescent'><img src='assets/load-crescent.svg'></div> "
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private util: Utility, private loader: LoadingController) {
        super(backend, defaultOptions);

    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        let splitStrig = url.split('/')
        let urlString = splitStrig[splitStrig.length - 1];
        let customMsg = ErrorMessages[urlString];
        let load = null;

        if (url.indexOf('https') !== -1 && this.nospinner.indexOf(urlString) == -1) {
            load = this.loader.create({ spinner: 'hide',content: this.loadContent});
                if (load) load.dismiss();
                load.present();
        }
        return super.get(url, options)
            .map(res => {
                if (load) { load.dismiss(); load = null; }
                //Successful Response;
                return res;
            })
            .timeout(25000)
            .catch((err) => {
                if (load) { load.dismiss(); load = null; }
                if(this.noerror.indexOf(urlString) == -1) this.handleError(err, customMsg);
                return Observable.throw(err);
            })
            .finally(() => {
                if (load) { load.dismiss(); load = null; }
                //After the request;
            });
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        let splitStrig = url.split('/');
        let urlString = splitStrig[splitStrig.length - 1];
        let customMsg = ErrorMessages[splitStrig[urlString]];
        let load = null;

        if (url.indexOf('https') !== -1 && this.nospinner.indexOf(urlString) == -1) {
            load = this.loader.create({ spinner: 'hide',content: this.loadContent});
                if (load) load.dismiss();
                load.present();
        }
        return super.post(url, body, options)
            .map(res => {
                //Successful Response;
                if (load) { load.dismiss(); load = null; }
                return res;
            })
            .timeout(45000)
            .catch(err => {
                if (load) { load.dismiss(); load = null; }
                if(this.noerror.indexOf(urlString) == -1) this.handleError(err, customMsg)
                return Observable.throw(err);

            })
            .finally(() => {
                if (load) { load.dismiss(); load = null; }
                //After the request;
            });
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        let splitStrig = url.split('/')
        let urlString = splitStrig[splitStrig.length - 1];
        let customMsg = ErrorMessages[urlString];
        let load = null;

        if (url.indexOf('https') !== -1 && this.nospinner.indexOf(urlString) == -1) {
            if (load) load.dismiss();
            load = this.loader.create({ spinner: 'hide',content: this.loadContent});
            load.present();
        }
        return super.put(url, body, options)
            .map(res => {
                if (load) { load.dismiss(); load = null; }
                //Successful Response;
                return res;
            })
            .timeout(25000)
            .catch((err) => {
                if (load) { load.dismiss(); load = null; }
                if(this.noerror.indexOf(urlString) == -1) this.handleError(err, customMsg);
                return Observable.throw(err);
            })
            .finally(() => {
                if (load) { load.dismiss(); load = null; }
                //After the request;
            });
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        let splitStrig = url.split('/')
        let urlString = splitStrig[splitStrig.length - 1];
        let customMsg = ErrorMessages[urlString];
        let load = null;

        if (url.indexOf('https') !== -1 && this.nospinner.indexOf(urlString) == -1) {
            if (load) load.dismiss();
            load = this.loader.create({ spinner: 'hide',content: this.loadContent});
            load.present();
        }
        return super.delete(url, options)
            .map(res => {
                if (load) { load.dismiss(); load = null; }
                //Successful Response;
                return res;
            })
            .timeout(25000)
            .catch((err) => {
                if (load) { load.dismiss(); load = null; }
                if(this.noerror.indexOf(urlString) == -1) this.handleError(err, customMsg);
                return Observable.throw(err);
            })
            .finally(() => {
                if (load) { load.dismiss(); load = null; }
                //After the request;
            });
    }

    handleError(err, customMsg) {
        //Error Response.
        if (err.status === 404 || err.status === 503) this.util.showAlert(ErrorMessages.POPUP_TTILE, '', ErrorMessages.SYSTEM_DOWN, ErrorMessages.BUTTON_OK);
        else if (err.status === 401) this.util.showAlert(ErrorMessages.POPUP_TTILE, '', ErrorMessages.ERROR_UNAUTH, ErrorMessages.BUTTON_OK);
        else if (err.name === "TimeoutError") this.util.showAlert(ErrorMessages.POPUP_TTILE, '', ErrorMessages.CONN_TIMEOUT, ErrorMessages.BUTTON_OK);
        else {
            if (customMsg != undefined && customMsg != "") this.util.showAlert(ErrorMessages.POPUP_TTILE, '', customMsg, ErrorMessages.BUTTON_OK);
            else this.util.showAlert(ErrorMessages.POPUP_TTILE, '', ErrorMessages.ENV_DOWN_MESSAGE, ErrorMessages.BUTTON_OK);
            return Observable.empty();
        }
    }
}
