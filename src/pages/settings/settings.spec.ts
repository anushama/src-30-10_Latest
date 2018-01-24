import { async, TestBed } from '@angular/core/testing';
import { Platform } from 'ionic-angular';
import { IonicModule } from 'ionic-angular';
import { PlatformMock } from '../../../test-config/mocks-ionic.ts';
import { SettingsPage } from '../settings/settings';


describe('SettingsPage', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SettingsPage ],
            imports: [
                IonicModule.forRoot(SettingsPage)
            ],
            providers: [
                { provide: Platform, useClass:PlatformMock }
            ]
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsPage);
        component = fixture.componentInstance;
    });

    it ('should create a valid instance of SettingsPage', () => {
        fixture.detectChanges();
        expect(component instanceof SettingsPage).toBeTruthy;
    });
    it ("should run 'stay logged in' in ion-list-header", () => {
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        console.log(compiled.getElementsByClassName('settings-item-detail'));
        expect(compiled.getElementsByClassName('settings-item-detail')[0].innerHTML).toContain('Stay Logged In');
    });
});
