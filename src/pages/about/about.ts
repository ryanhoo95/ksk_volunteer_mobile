import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KskProvider } from '../../providers/ksk/ksk';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private kskProvider: KskProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  toMission() {
    this.navCtrl.push('MissionPage');
  }

  toKskHistory() {
    this.navCtrl.push('KskHistoryPage');
  }

  toSpiritualGuide() {
    this.navCtrl.push('SpiritualGuidePage');
  }

  toTeam() {
    this.navCtrl.push('TeamPage');
  }

  toFacilities() {
    this.navCtrl.push('FacilitiesPage');
  }

}
