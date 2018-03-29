import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VolunteerDetailsPage } from './volunteer-details';

@NgModule({
  declarations: [
    VolunteerDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(VolunteerDetailsPage),
  ],
  exports: [
    VolunteerDetailsPage
  ]
})
export class VolunteerDetailsPageModule {}
