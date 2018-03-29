import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchParticipationPage } from './search-participation';

@NgModule({
  declarations: [
    SearchParticipationPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchParticipationPage),
  ],
  exports: [
    SearchParticipationPage
  ]
})
export class SearchParticipationPageModule {}
