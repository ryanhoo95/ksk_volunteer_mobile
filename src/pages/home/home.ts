import { Component } from '@angular/core';
import { IonicPage, App } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { KskProvider } from '../../providers/ksk/ksk';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  token: any;
  todayActivities: any = null;

  constructor(public navCtrl: NavController, private kskProvider: KskProvider, private app: App) {
    this.kskProvider.getSessionData("token").then((val) => {
      this.token = val;
      console.log(this.token);
    });
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

    this.kskProvider.postData(params, "getTodayActivities").then((result) => {
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

  viewActivity(todayActivity) {
    console.log(todayActivity.activity_id);
  }

}
