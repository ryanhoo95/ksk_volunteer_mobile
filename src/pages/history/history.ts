import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { KskProvider } from '../../providers/ksk/ksk';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  token: any;
  totalHours: any = 0;
  histories: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private kskProvider: KskProvider, private app: App) {
    this.kskProvider.getSessionData("token").then((val) => {
      this.token = val;
      console.log(this.token);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  ionViewDidEnter() {
    //get activie participation
    this.getHistory();
  }

  getHistory() {
    this.kskProvider.showProgress();

    let params = {
      "api_token" : this.token 
    };

    this.kskProvider.postData(params, "getHistory").then((result) => {
      let response: any = result;
      console.log(response);
      this.kskProvider.dismissProgress();

      if(response.status == "success") {
        this.totalHours = response.data.totalHours;
        this.histories = response.data.histories;
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

  viewHistory(activity) {
    console.log(activity.activity_id);

    this.navCtrl.push('ActivityDetailsPage', {
      activity: activity
    });
  }

}
