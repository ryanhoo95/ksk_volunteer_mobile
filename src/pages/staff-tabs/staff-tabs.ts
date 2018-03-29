import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

/**
 * Generated class for the StaffTabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  templateUrl: 'staff-tabs.html',
})
export class StaffTabsPage {

  tab1Root = 'StaffHomePage';
  tab2Root = 'SearchParticipationPage';
  tab3Root = 'StaffMorePage';

  constructor() {
  }

}
