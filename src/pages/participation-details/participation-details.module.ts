import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParticipationDetailsPage } from './participation-details';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ParticipationDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ParticipationDetailsPage),
    PipesModule
  ],
  exports: [
    ParticipationDetailsPage
  ]
})
export class ParticipationDetailsPageModule {}
