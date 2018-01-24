import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { CurrencymaskDirective } from "./currencymask/currencymask";
import { InputFieldMaxLengthDirective } from "./input-field-max-length/input-field-max-length";
import { NicknameFormatDirective } from "./nickname-format/nickname-format";
import { PhonemaskDirective } from "./phonemask/phonemask";
import { ZipcodeDirective } from "./zipcode/zipcode";
import { ShowhideDirective } from "./showhide/showhide";

@NgModule({
    declarations: [
        CurrencymaskDirective,
        InputFieldMaxLengthDirective,
        NicknameFormatDirective,
        PhonemaskDirective,
        ZipcodeDirective,
        ShowhideDirective
    ],
    entryComponents: [
    ],
    providers: [
    ],
    imports: [IonicModule],
    exports: [
        CurrencymaskDirective,
        InputFieldMaxLengthDirective,
        NicknameFormatDirective,
        PhonemaskDirective,
        ZipcodeDirective,
        ShowhideDirective
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DirectivesModule {

}