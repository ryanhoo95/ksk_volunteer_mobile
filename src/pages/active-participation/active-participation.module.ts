import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActiveParticipationPage } from './active-participation';

@NgModule({
  declarations: [
    ActiveParticipationPage,
  ],
  imports: [
    IonicPageModule.forChild(ActiveParticipationPage),
  ],
  exports: [
    ActiveParticipationPage
  ]
})
export class ActiveParticipationPageModule {}
