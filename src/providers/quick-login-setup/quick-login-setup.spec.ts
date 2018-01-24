import { Injectable } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, ResponseOptions, Response, Headers, BaseRequestOptions } from '@angular/http'; 
import 'rxjs/add/operator/map';

@Injectable()
class QuickLoginProvider {
    private baseURL: string = 'https://mobile-dev.penfed.org/webapp/rest/'
    constructor(private _http: Http) { }
    enableQuickLogin() {
      let serviceURL = this.baseURL + 'private/settings/quickLoginEnable';
      let body = {
          deviceInfo :'version%3D3%2E0%2E0%2E0%5F5%26pm%5Ffpua%3Dmozilla%2F5%2E0%20%28iphone%3B%20cpu%20iphone%20os%209%5F1%20like%20mac%20os%20x%29%20applewebkit%2F601%2E1%2E46%20%28khtml%2C%20like%20gecko%29%20version%2F9%2E0%20mobile%2F13b143%20safari%2F601%2E1%7C5%2E0%20%28iPhone%3B%20CPU%20iPhone%20OS%209%5F1%20like%20Mac%20OS%20X%29%20AppleWebKit%2F601%2E1%2E46%20%28KHTML%2C%20like%20Gecko%29%20Version%2F9%2E0%20Mobile%2F13B143%20Safari%2F601%2E1%7CMacIntel%26pm%5Ffpsc%3D24%7C375%7C667%7C667%26pm%5Ffpsw%3D%26pm%5Ffptz%3D%2D4%26pm%5Ffpln%3Dlang%3Den%2DUS%7Csyslang%3D%7Cuserlang%3D%26pm%5Ffpjv%3D0%26pm%5Ffpco%3D1%26pm%5Ffpasw%3D%26pm%5Ffpan%3DNetscape%26pm%5Ffpacn%3DMozilla%26pm%5Ffpol%3Dtrue%26pm%5Ffposp%3D%26pm%5Ffpup%3D%26pm%5Ffpsaw%3D375%26pm%5Ffpspd%3D24%26pm%5Ffpsbd%3D%26pm%5Ffpsdx%3D%26pm%5Ffpsdy%3D%26pm%5Ffpslx%3D%26pm%5Ffpsly%3D%26pm%5Ffpsfse%3D%26pm%5Ffpsui%3D%26pm%5Fos%3DMac%26pm%5Fbrmjv%3DNaN%26pm%5Fbr%3DChrome%26pm%5Finpt%3D%26pm%5Fexpt%3D',
          publicKeyPem :'-----BEGIN PUBLIC KEY-----↵MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJGsOT9+9WXVzTes2B5HzfjmG9JA/VON↵Tc5e/vUPogAnqIJ/0iZf8MhuEQKm2goop31+A429PrMx2JhPA2w6TxcCAwEAAQ==↵-----END PUBLIC KEY-----',
          username:'3015'
      };
      let header = new Headers({ 'Content-Type': 'application/json' });
      return this._http.post(serviceURL, JSON.stringify(body), { headers: header });
    }
    disableQuickLogin() {
      let serviceURL = this.baseURL + 'private/settings/quickLoginDisable';
      let header = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let data = 'quickLoginId=96db3ddf-6b77-42ad-b9d0-3d6b0517be9f';
      return this._http.delete(serviceURL, { headers: header, body: data });
    }
}

describe('Service: QuickLogin', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: Http,
                    useFactory: (backend, options) => {
                        return new Http(backend, options);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                MockBackend, QuickLoginProvider, BaseRequestOptions 
            ]
        });
    });

    it('Enable quick login',
        async(inject([QuickLoginProvider, MockBackend],
            (quickLoginService: QuickLoginProvider, backend: MockBackend) => {

                backend.connections.subscribe((conn: MockConnection) => {
                    const options: ResponseOptions = new ResponseOptions({ body: JSON.stringify({ success: true }) });
                    conn.mockRespond(new Response(options));
                });

                quickLoginService.enableQuickLogin()
                    .subscribe(res => {
                        console.log('QuickLogin enable called');
                        expect(res.json()).toEqual({ success: true });
                    });
            })));

    it('Disable quick login',
    async(inject([QuickLoginProvider, MockBackend],
        (quickLoginService: QuickLoginProvider, backend: MockBackend) => {

            backend.connections.subscribe((conn: MockConnection) => {
                const options: ResponseOptions = new ResponseOptions({ body: JSON.stringify({ success: true }) });
                conn.mockRespond(new Response(options));
            });

            quickLoginService.disableQuickLogin()
                .subscribe(res => {
                    console.log('QuickLogin disable called');
                    expect(res.json()).toEqual({ success: true });
                });
        })));
});