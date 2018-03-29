import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffProfileEditPage } from './staff-profile-edit';

@NgModule({
  declarations: [
    StaffProfileEditPage,
  ],
  imports: [
    IonicPageModule.forChild(StaffProfileEditPage),
  ],
  exports: [
    StaffProfileEditPage
  ]
})
export class StaffProfileEditPageModule {}
