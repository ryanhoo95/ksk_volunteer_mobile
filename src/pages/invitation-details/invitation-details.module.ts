import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvitationDetailsPage } from './invitation-details';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    InvitationDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(InvitationDetailsPage),
    PipesModule
  ],
  exports: [
    InvitationDetailsPage
  ]
})
export class InvitationDetailsPageModule {}
