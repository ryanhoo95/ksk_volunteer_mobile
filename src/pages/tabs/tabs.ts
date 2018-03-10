import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { HomePage } from '../home/home';
import { VolunteerMorePage } from '../volunteer-more/volunteer-more';
import { SearchActivityPage } from '../search-activity/search-activity';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'HomePage';
  tab2Root = 'SearchActivityPage';
  tab3Root = 'VolunteerMorePage';

  constructor() {

  }
}
