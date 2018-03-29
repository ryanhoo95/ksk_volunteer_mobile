import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffHomePage } from './staff-home';

@NgModule({
  declarations: [
    StaffHomePage,
  ],
  imports: [
    IonicPageModule.forChild(StaffHomePage),
  ],
  exports: [
    StaffHomePage
  ]
})
export class StaffHomePageModule {}
