import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffMorePage } from './staff-more';

@NgModule({
  declarations: [
    StaffMorePage,
  ],
  imports: [
    IonicPageModule.forChild(StaffMorePage),
  ],
  exports: [
    StaffMorePage
  ]
})
export class StaffMorePageModule {}
