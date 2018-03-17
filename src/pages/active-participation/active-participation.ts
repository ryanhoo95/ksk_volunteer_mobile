import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { KskProvider } from '../../providers/ksk/ksk';

/**
 * Generated class for the ActiveParticipationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-active-participation',
  templateUrl: 'active-participation.html',
})
export class ActiveParticipationPage {
  token: any;
  participations: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private kskProvider: KskProvider, private app: App) {
    this.kskProvider.getSessionData("token").then((val) => {
      this.token = val;
      console.log(this.token);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActiveParticipationPage');
  }

  ionViewDidEnter() {
    //get activie participation
    this.getActiveParticipations();
  }

  getActiveParticipations() {
    this.kskProvider.showProgress();

    let params = {
      "api_token" : this.token 
    };

    this.kskProvider.postData(params, "getActiveParticipations").then((result) => {
      let response: any = result;
      console.log(response);
      this.kskProvider.dismissProgress();

      if(response.status == "success") {
        this.participations = response.data;
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
    console.log(activity.activity_id);

    this.navCtrl.push('ActivityDetailsPage', {
      activity: activity
    });
  }

}
