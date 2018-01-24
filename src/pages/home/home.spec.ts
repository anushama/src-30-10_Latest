// import { async, TestBed } from '@angular/core/testing';
// import { Platform } from 'ionic-angular';
// import { IonicModule } from 'ionic-angular';
// import { PlatformMock } from '../../../test-config/mocks-ionic.ts';
// import { HttpModule } from '@angular/http';
// import { Component } from '@angular/core';
// import { NavController } from 'ionic-angular';
// import {ApiService} from '../../providers/api-service';
// import 'rxjs/add/operator/map';

// import { HomePage } from '../home/home';

// describe('HomePage', () => {
//     let fixture;
//     let component;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [ HomePage ],
//             imports: [
//                 IonicModule.forRoot(HomePage),HttpModule
//             ],
//             providers: [
//               NavController, ApiService, { provide: Platform, useClass:PlatformMock }  
//             ]
//         })
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(HomePage);
//         component = fixture.componentInstance;
//     });

//     it ('should create a valid instance of HomePage', () => {
//         fixture.detectChanges();
//         expect(component instanceof HomePage ).toBe(true);
//     });
//     it ('1234', () => {
//         component.user = {
//             id:"1234",
//             pass:"2345"
//         }
//         fixture.detectChanges();
//         expect(component.user.id).toEqual("1234");
//     });
//     it ('2345', () => {
//         component.user = {
//             id:"1234",
//             pass:"2345"
//         }
//         fixture.detectChanges();
//         expect(component.user.pass).toEqual("2345");
//     });
// });