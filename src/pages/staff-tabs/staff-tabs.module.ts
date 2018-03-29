import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StaffTabsPage } from './staff-tabs';

@NgModule({
  declarations: [
    StaffTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(StaffTabsPage),
  ],
  exports: [
    StaffTabsPage
  ]
})
export class StaffTabsPageModule {}
