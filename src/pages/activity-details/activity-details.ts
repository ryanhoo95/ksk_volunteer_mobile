import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { KskProvider } from '../../providers/ksk/ksk';
import { CallNumber } from '@ionic-native/call-number';

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
  participants: any;
  enquiryPersons: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private kskProvider: KskProvider, private app: App, private alertCtrl: AlertController, private callNumber: CallNumber) {
    this.kskProvider.getSessionData("token").then((val) => {
      this.token = val;
    });

    this.activity = navParams.get('activity');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityDetailsPage');
  }

  ionViewDidEnter(){
    this.getEnquiryPersons();

    // if(this.activity.response == "Join" || this.activity.response == "Absent" || this.activity.response == "Present") {
    //   this.getInvitedParticipants();
    // }
  }

  getEnquiryPersons() {
    this.kskProvider.showProgress();

    let params = {
      "api_token" : this.token,
      "activity_id" : this.activity.activity_id
    };

    this.kskProvider.postData(params, "getEnquiryPersons").then((result) => {
      let response: any = result;
      console.log(response);

      //this.kskProvider.dismissProgress();

      if(response.status == "success") {
        this.enquiryPersons = response.data;

        if(this.activity.response == "Join" || this.activity.response == "Absent" || this.activity.response == "Present") {
          this.getInvitedParticipants();
        }
        else {
          this.kskProvider.dismissProgress();
        }
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

  getInvitedParticipants() {
    //this.kskProvider.showProgress();

    let params = {
      "api_token" : this.token,
      "activity_id" : this.activity.activity_id,
      "invitation_code" : this.activity.invitation_code
    };

    this.kskProvider.postData(params, "getInvitedParticipants").then((result) => {
      let response: any = result;
      console.log(response);

      this.kskProvider.dismissProgress();

      if(response.status == "success") {
        this.participants = response.data;
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

  doResponse(action) {
    if(action == "Join") {
      let dialog = this.alertCtrl.create({
        title: this.activity.activity_title,
        message: "Are you confirm to join this activity?",
        buttons: [
          {
            text: "NO"
          },

          {
            text: "YES",
            handler: () => {
              this.joinActivity();
            }
          }
        ]
      });
      dialog.present();
    }
    else if(action == "Withdraw") {
      let dialog = this.alertCtrl.create({
        title: this.activity.activity_title,
        message: "Are you confirm to withdraw from this activity?",
        buttons: [
          {
            text: "NO"
          },

          {
            text: "YES",
            handler: () => {
              this.withdrawActivity();
            }
          }
        ]
      });
      dialog.present();
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
      "participation_id" : this.activity.participation_id,
      "date" : this.activity.activity_date,
      "start_time" : this.activity.start_time,
      "end_time" : this.activity.end_time
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

  invite(activity) {
    console.log("invite" + activity.activity_id);

    this.navCtrl.push('InvitePage', {
      activity: activity
    });
  }

  call(number: any) {
    console.log(number);

    this.callNumber.callNumber(number, false)
      .then(() => console.log("dialing"))
      .catch(() => this.kskProvider.showAlertDialog("Fail", "Your device does not support calling or SIM card is not present in your device."))
  }

}
