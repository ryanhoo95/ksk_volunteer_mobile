import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendingInvitationPage } from './pending-invitation';

@NgModule({
  declarations: [
    PendingInvitationPage,
  ],
  imports: [
    IonicPageModule.forChild(PendingInvitationPage),
  ],
})
export class PendingInvitationPageModule {}
