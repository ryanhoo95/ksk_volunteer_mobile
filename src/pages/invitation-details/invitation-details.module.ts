import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvitationDetailsPage } from './invitation-details';

@NgModule({
  declarations: [
    InvitationDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(InvitationDetailsPage),
  ],
  exports: [
    InvitationDetailsPage
  ]
})
export class InvitationDetailsPageModule {}
