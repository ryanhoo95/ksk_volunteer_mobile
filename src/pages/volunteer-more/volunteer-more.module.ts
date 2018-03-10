import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VolunteerMorePage } from './volunteer-more';

@NgModule({
  declarations: [
    VolunteerMorePage,
  ],
  imports: [
    IonicPageModule.forChild(VolunteerMorePage),
  ],
  exports: [
    VolunteerMorePage
  ]
})
export class VolunteerMorePageModule {}
