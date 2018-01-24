import { TestBed, async } from '@angular/core/testing';
import { SelectAccountComponent } from "./select-account";
import { IonicModule } from "ionic-angular";
import { PipesModule } from "../../../pipes/pipes.module";


describe("SelectAccountComponent", () => {

    let selectAccount: SelectAccountComponent;


    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SelectAccountComponent],
            imports: [
                IonicModule.forRoot(SelectAccountComponent),PipesModule
            ],
            providers: [
                
            ],
        })
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectAccountComponent);
        component = fixture.componentInstance;
    });

    it('Select Account Component should be false', () => {
        fixture.detectChanges();
        let app = fixture.debugElement.componentInstance;
        expect(app.SelectAccountComponent).toBeFalsy;
    });
    it('should create a valid instance of Select Account Page', () => {
        fixture.detectChanges();
        expect(component instanceof SelectAccountComponent).toBeTruthy;
    });
});