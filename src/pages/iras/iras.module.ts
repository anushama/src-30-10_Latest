import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IrasPage } from './iras';

@NgModule({
  declarations: [
    IrasPage,
  ],
  imports: [
    IonicPageModule.forChild(IrasPage),
  ],
  exports: [
    IrasPage
  ]
})
export class IrasPageModule {}
