import { Injectable } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, ResponseOptions, Response, BaseRequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
class TransfersProvider {
    private baseURL: string = 'https://mobile-dev.penfed.org/webapp/rest/'
    constructor(private _http: Http) { }
    getScheduledTransfers() {
        return this._http.get(this.baseURL + 'private/transfer/getScheduledTransfers');
    }
}

describe('Service: Transfers', () => {
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
                MockBackend, BaseRequestOptions, TransfersProvider
            ]
        });
    });

    it('get scheduled transfers',
        async(inject([TransfersProvider, MockBackend],
            (transfersService: TransfersProvider, backend: MockBackend) => {

                backend.connections.subscribe((conn: MockConnection) => {
                    const options: ResponseOptions = new ResponseOptions({ body: JSON.stringify({ success: true }) });
                    conn.mockRespond(new Response(options));
                });

                transfersService.getScheduledTransfers()
                    .subscribe(res => {
                        console.log('Transfers getScheduledTransfers called');
                        expect(res.json()).toEqual({ success: true });
                    });
            })));
});