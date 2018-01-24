import { async, TestBed } from '@angular/core/testing';
import { Platform } from 'ionic-angular';
import { IonicModule } from 'ionic-angular';
import { PlatformMock } from '../../../test-config/mocks-ionic.ts';
import { ContactPage } from '../contact/contact';


describe('ContactPage', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ContactPage ],
            imports: [
                IonicModule.forRoot(ContactPage)
            ],
            providers: [
                { provide: Platform, useClass:PlatformMock }
            ]
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ContactPage);
        component = fixture.componentInstance;
    });

    it ('should create a valid instance of ContactPage', () => {
        fixture.detectChanges();
        expect(component instanceof ContactPage).toBe(true);
    });
});
