import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParticipationDetailsPage } from './participation-details';

@NgModule({
  declarations: [
    ParticipationDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ParticipationDetailsPage),
  ],
  exports: [
    ParticipationDetailsPage
  ]
})
export class ParticipationDetailsPageModule {}
