import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Directive } from '@angular/core';
import { PlatformMock } from '../../../test-config/mocks-ionic.ts';
import { IonicModule, Platform, NavController, NavParams, LoadingController } from 'ionic-angular/index';
import { AccountsFooterComponent } from "../accounts/accounts-footer/accounts-footer";
import { ApiService } from "../../providers/api-service";
import { HttpModule, Http, ConnectionBackend } from "@angular/http";
import { AccountPage } from "./account";



fdescribe('AccountPage', ()=>{
  let component:AccountPage;
  let fixture:ComponentFixture<AccountPage>;

  class MockLoadingController {
    public create(){
      return {
        present: ()=>{
          return {}
        }
      }
    }
    public present(){
      return {}
    }
    public dismiss(){
      return {}
    }
  }

  class MockApiService {
    firstRequest(){
      return {
        subscribe: ()=>{
          return true
        }
      };
    }
    login(){
      return true;
    }
    secondRequest(){
      return true;
    }
  }
  @Directive({
    selector:"account-header"
  })
  class MockAccountHeaderComponent{

  }

  beforeAll(()=>{
  })
  beforeEach( async(()=>{
    TestBed.configureTestingModule({
      declarations:[AccountPage, MockAccountHeaderComponent, AccountsFooterComponent],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
      imports:[
        IonicModule.forRoot(AccountPage),
        HttpModule
      ],
      providers:[
        NavController,
        // ApiService,
        { provide: ApiService, useClass: MockApiService},
        Http,
        ConnectionBackend,
        LoadingController,
        { provide: NavParams, useClass: class { NavParams = jasmine.createSpy("NavParams"); }},
        { provide: LoadingController, useClass: MockLoadingController},
        { provide: Platform, useClass: PlatformMock},
      ]
    });
  }));

  beforeEach(()=>{
    fixture = TestBed.createComponent(AccountPage);
    component = fixture.componentInstance;
  })

  it('should create a valid instance of AccountsPage', () =>{
    fixture.detectChanges();
    expect(component instanceof AccountPage).toBe(true);
  })
});
