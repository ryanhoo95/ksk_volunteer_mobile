import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { KskProvider } from '../../providers/ksk/ksk';

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
  token: any;
  activity: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private kskProvider: KskProvider, private app: App) {
    this.kskProvider.getSessionData("token").then((val) => {
      this.token = val;
    });

    this.activity = navParams.get('activity');
    // console.log(this.activity);
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
    // console.log("join");

    this.kskProvider.showProgress();

    let params = {
      "api_token" : this.token,
      "activity_id" : this.activity.activity_id,
      "participation_id" : this.activity.participation_id,
      "date" : this.activity.activity_date,
      "start_time" : this.activity.start_time,
      "end_time" : this.activity.end_time
    };

    this.kskProvider.postData(params, "joinActivity").then((result) => {
      let response: any = result;
      console.log(response);

      this.kskProvider.dismissProgress();

      if(response.status == "success") {
        this.kskProvider.showAlertDialog("Success", response.message);
        this.navCtrl.pop();
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

  withdrawActivity() {
    // console.log("withdraw");
    this.kskProvider.showProgress();

    let params = {
      "api_token" : this.token,
      "participation_id" : this.activity.participation_id
    };

    this.kskProvider.postData(params, "withdrawActivity").then((result) => {
      let response: any = result;
      console.log(response);

      this.kskProvider.dismissProgress();

      if(response.status == "success") {
        this.kskProvider.showAlertDialog("Success", response.message);
        this.navCtrl.pop();
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

}
