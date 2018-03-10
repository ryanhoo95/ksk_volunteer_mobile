import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VolunteerProfilePage } from './volunteer-profile';

@NgModule({
  declarations: [
    VolunteerProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(VolunteerProfilePage),
  ],
  exports: [
    VolunteerProfilePage
  ]
})
export class VolunteerProfilePageModule {}
