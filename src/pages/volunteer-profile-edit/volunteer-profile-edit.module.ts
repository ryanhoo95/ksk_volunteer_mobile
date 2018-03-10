import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VolunteerProfileEditPage } from './volunteer-profile-edit';

@NgModule({
  declarations: [
    VolunteerProfileEditPage,
  ],
  imports: [
    IonicPageModule.forChild(VolunteerProfileEditPage),
  ],
})
export class VolunteerProfileEditPageModule {}
