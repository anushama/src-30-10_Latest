import { async, TestBed } from '@angular/core/testing';
import { Platform } from 'ionic-angular';
import { IonicModule } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../providers/api-service';
import { PlatformMock } from '../../../test-config/mocks-ionic.ts';
import { HttpModule } from '@angular/http';
import { LoginPage } from '../login/login';

describe('LoginPage', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
          declarations: [LoginPage],
          imports: [
            IonicModule.forRoot(LoginPage), HttpModule
          ],
          providers: [
            NavController,
            ApiService,
            {
              provide: NavParams,
              useClass: class {
                NavParams = jasmine.createSpy("NavParams");
              },
            },
            {
              provide: Platform,
              useClass: PlatformMock
            }
          ],
      })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
  });

  it('showLoginForm should be false', () => {
    fixture.detectChanges();
    let app = fixture.debugElement.componentInstance;
    expect(app.showLoginForm).toBeFalsy;
  });
  it('should create a valid instance of LoginPage', () => {
    fixture.detectChanges();
    expect(component instanceof LoginPage).toBeTruthy;
  });
  // it ("should run 'stay logged in' in ion-list-header", () => {
  //       fixture.detectChanges();
  //       let compiled = fixture.debugElement.nativeElement;
  //       console.log(compiled.getElementsByClassName('settings-item-detail'));
  //       expect(compiled.getElementsByClassName('settings-item-detail')[0].innerHTML).toContain('Stay Logged In');
  //   });

});
