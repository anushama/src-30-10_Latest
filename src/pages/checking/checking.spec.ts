import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PlatformMock } from '../../../test-config/mocks-ionic';
import { IonicModule, Platform, NavController, NavParams, LoadingController } from 'ionic-angular/index';
import { ProductServiceProvider } from "../../providers/product-service/product-service";
import { HttpModule, Http, ConnectionBackend } from "@angular/http";
import { CheckingPage } from "./checking";



describe('AccountPage', ()=>{
  let component:CheckingPage;
  let fixture:ComponentFixture<CheckingPage>;

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

  }
/*  @Directive({
    selector:"account-header"
  })

*/
  beforeAll(()=>{
  })
  beforeEach( async(()=>{
    TestBed.configureTestingModule({
      declarations:[CheckingPage],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
      imports:[
        IonicModule.forRoot(CheckingPage),
        HttpModule
      ],
      providers:[
        NavController,
        // ApiService,
        { provide: ProductServiceProvider, useClass: MockApiService},
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
    fixture = TestBed.createComponent(CheckingPage);
    component = fixture.componentInstance;
  })

  it('should create a valid instance of AccountsPage', () =>{
    fixture.detectChanges();
    expect(component instanceof CheckingPage).toBe(true);
  })
});
