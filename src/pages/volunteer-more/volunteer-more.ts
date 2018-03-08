import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { VolunteerProfilePage } from '../volunteer-profile/volunteer-profile';
import { ActiveParticipationPage } from '../active-participation/active-participation';
import { PendingInvitationPage } from '../pending-invitation/pending-invitation';
import { HistoryPage } from '../history/history';
import { AboutPage } from '../about/about';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

/**
 * Generated class for the VolunteerMorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-volunteer-more',
  templateUrl: 'volunteer-more.html',
})
export class VolunteerMorePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VolunteerMorePage');
  }

  toProfile() {
    this.navCtrl.push(VolunteerProfilePage);
  }

  toActiveParticipation() {
    this.navCtrl.push(ActiveParticipationPage);
  }

  toPendingInvitation() {
    this.navCtrl.push(PendingInvitationPage);
  }

  toHistory() {
    this.navCtrl.push(HistoryPage);
  }

  toAbout() {
    this.navCtrl.push(AboutPage);
  }

  logout() {
    // this.storage.set('login', false);
    // this.navCtrl.push(LoginPage);
    // this.navCtrl.setRoot(LoginPage);

    this.storage.clear();

    this.app.getRootNav().setRoot(LoginPage);
  }

}
