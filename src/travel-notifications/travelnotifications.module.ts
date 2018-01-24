import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from "ionic-angular";

import { TravelNotificationsProvider } from './providers/travel-notifications/travel-notifications';
// import { TravelNotificationsPage } from './pages/travel-notifications/travel-notifications';

@NgModule({
    declarations: [
        // TravelNotificationsPage
    ],
    entryComponents: [
        // TravelNotificationsPage
    ],
    providers: [
        TravelNotificationsProvider
    ],
    imports: [IonicModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TravelNotificationsModule {

}
