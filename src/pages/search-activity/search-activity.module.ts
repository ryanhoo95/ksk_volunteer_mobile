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
})
export class SearchActivityPageModule {}
