import { inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
// Make sure to include the Response object from '@angular/http'
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { ApiService } from "./api-service";
import { ApiEndpointProvider } from "./api-endpoint/api-endpoint";
import { PlatformServiceProvider } from "./platform-service/platform-service";
import { Platform } from "ionic-angular";

describe("APIService", () => {

    let apiSerive: ApiService;
    let backend: MockBackend;

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                MockBackend, ApiEndpointProvider, PlatformServiceProvider, Platform, 
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backendInstance, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                ApiService
            ]
        }).compileComponents();
    });

    beforeEach(inject([ApiService, MockBackend], (apiService: ApiService, mockBackend: MockBackend) => {
        apiSerive = apiService;
        backend = mockBackend;
    }));


    it("#login should call endpoint and return it's result", (done) => {
        backend.connections.subscribe((connection: MockConnection) => {
            let options = new ResponseOptions({
                body: JSON.stringify({ success: true })
            });
            connection.mockRespond(new Response(options));
        });

        apiSerive
            .login("174158", "password1") //{"serviceUrls": {"login":{"loginUrl": "https://mobile-qa.penfed.org/webapp/j_security_check"}}}
            .subscribe((response) => {
                // Check the response
                expect(response.json()).toEqual({ success: true });
                done();
            })
    });
});