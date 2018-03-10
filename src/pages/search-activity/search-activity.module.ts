import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchActivityPage } from './search-activity';

@NgModule({
  declarations: [
    SearchActivityPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchActivityPage),
  ],
  exports: [
    SearchActivityPage
  ]
})
export class SearchActivityPageModule {}
