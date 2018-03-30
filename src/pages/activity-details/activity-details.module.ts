import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityDetailsPage } from './activity-details';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    ActivityDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityDetailsPage),
    PipesModule
  ],
  exports: [
    ActivityDetailsPage
  ]
})
export class ActivityDetailsPageModule {}
