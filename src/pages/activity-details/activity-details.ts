import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ActivityDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activity-details',
  templateUrl: 'activity-details.html',
})
export class ActivityDetailsPage {
  activity: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.activity = navParams.get('activity');
    console.log(this.activity);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityDetailsPage');
  }

  doResponse(action) {
    if(action == "Join") {
      this.joinActivity();
    }
    else if(action == "Withdraw") {
      this.withdrawActivity();
    }
  }

  joinActivity() {
    console.log("join");
  }

  withdrawActivity() {
    console.log("withdraw");
  }

}
