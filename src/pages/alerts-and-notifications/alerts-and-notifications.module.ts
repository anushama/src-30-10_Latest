import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AlertsAndNotificationsSetupPage} from '../alerts-and-notifications/alerts-and-notifications-setup';
import { PipesModule } from '../../pipes/pipes.module';
import { AlertsNotificationsServiceProvider } from '../../providers/alerts-notifications-service/alerts-notifications-service';
import { DirectivesModule } from "../../directives/directives.module";

@NgModule({
  declarations: [
    AlertsAndNotificationsSetupPage,
  ],
  entryComponents: [
      AlertsAndNotificationsSetupPage
    ],
  providers: [
   AlertsNotificationsServiceProvider
    ],
    imports: [IonicModule,PipesModule, DirectivesModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AlertsAndNotificationsPageModule {}
