import { Http } from "@angular/http";
import { InterceptedHttp } from "../http-interceptor/http-interceptor";

export function httpFactory(xhrBackend, requestOptions, util, loader) {
    return new InterceptedHttp(xhrBackend, requestOptions, util, loader);
}