import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacilitiesPage } from './facilities';

@NgModule({
  declarations: [
    FacilitiesPage,
  ],
  imports: [
    IonicPageModule.forChild(FacilitiesPage),
  ],
  exports: [
    FacilitiesPage
  ]
})
export class FacilitiesPageModule {}
