import { async, TestBed } from '@angular/core/testing';
import { Platform } from 'ionic-angular';
import { IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PlatformMock } from '../../test-config/mocks-ionic.ts'
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent ],
            imports: [
                IonicModule.forRoot(AppComponent)
            ],
            providers: [
                 StatusBar, SplashScreen,
                { provide: Platform, useClass:PlatformMock }
            ]
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it ('should create a valid instance of MyApp', () => {
        fixture.detectChanges();
        expect(component instanceof AppComponent).toBe(true);
    });
});
