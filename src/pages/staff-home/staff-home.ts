import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { KskProvider } from '../../providers/ksk/ksk';

/**
 * Generated class for the StaffHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-staff-home',
  templateUrl: 'staff-home.html',
})
export class StaffHomePage {
  token: any;
  todayActivities: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private kskProvider: KskProvider, private app: App) {
    this.kskProvider.getSessionData("token").then((val) => {
      this.token = val;
      console.log(this.token);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffHomePage');
  }

  ionViewDidEnter() {
    //get today activities
    this.getTodayActivities();
  }

  getTodayActivities() {
    this.kskProvider.showProgress();

    let params = {
      "api_token" : this.token 
    };

    this.kskProvider.postData(params, "getTodayParticipations").then((result) => {
      let response: any = result;
      console.log(response);
      this.kskProvider.dismissProgress();

      if(response.status == "success") {
        this.todayActivities = response.data;
      }
      else if(response.status == "invalid") {
        this.kskProvider.showAlertDialog("Fail", response.message);
        this.kskProvider.clearSessionData();
        this.app.getRootNav().setRoot('LoginPage');
      }
      else {
        this.kskProvider.showAlertDialog("Fail", response.message);
      }
    }, (err) => {
      this.kskProvider.dismissProgress();
      this.kskProvider.showServerErrorDialog();
    });
  }

  viewActivity(activity) {
    console.log("activity" + activity.activity_id);

    this.navCtrl.push('ActivityDetailsPage', {
      activity: activity
    });
  }

  viewParticipant(activity) {
    console.log("participant" + activity.activity_id);

    this.navCtrl.push('ParticipationDetailsPage', {
      activity: activity
    });
  }

}
