import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffProfilePage } from './staff-profile';

@NgModule({
  declarations: [
    StaffProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(StaffProfilePage),
  ],
  exports: [
    StaffProfilePage
  ]
})
export class StaffProfilePageModule {}
