import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { KskProvider } from '../../providers/ksk/ksk';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the InvitationDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invitation-details',
  templateUrl: 'invitation-details.html',
})
export class InvitationDetailsPage {
  token: any;
  invitation: any;
  enquiryPersons: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private kskProvider: KskProvider, private app: App, private alertCtrl: AlertController, private callNumber: CallNumber) {
    this.kskProvider.getSessionData("token").then((val) => {
      this.token = val;
    });

    this.invitation = navParams.get('invitation');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitationDetailsPage');
  }

  ionViewDidEnter(){
    this.getEnquiryPersons();

  }

  getEnquiryPersons() {
    this.kskProvider.showProgress();

    let params = {
      "api_token" : this.token,
      "activity_id" : this.invitation.activity_id
    };

    this.kskProvider.postData(params, "getEnquiryPersons").then((result) => {
      let response: any = result;
      console.log(response);

      this.kskProvider.dismissProgress();

      if(response.status == "success") {
        this.enquiryPersons = response.data;
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

  confirmReject() {
    let dialog = this.alertCtrl.create({
      title: this.invitation.activity_title,
      message: "Are you confirm to reject this invitation?",
      buttons: [
        {
          text: "NO"
        },

        {
          text: "YES",
          handler: () => {
            this.rejectInvitation();
          }
        }
      ]
    });
    dialog.present();
  }

  confirmAccept() {
    let dialog = this.alertCtrl.create({
      title: this.invitation.activity_title,
      message: "Are you confirm to accept this invitation?",
      buttons: [
        {
          text: "NO"
        },

        {
          text: "YES",
          handler: () => {
            this.acceptInvitation();
          }
        }
      ]
    });
    dialog.present();
  }

  rejectInvitation() {
    this.kskProvider.showProgress();

    let params = {
      "api_token" : this.token,
      "invitation_id" : this.invitation.invitation_id
    };

    this.kskProvider.postData(params, "rejectInvitation").then((result) => {
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

  acceptInvitation() {
    this.kskProvider.showProgress();

    let params = {
      "api_token" : this.token,
      "invitation_id" : this.invitation.invitation_id,
      "activity_id" : this.invitation.activity_id,
      "access" : this.invitation.access,
      "invitation_code" : this.invitation.invitation_code,
      "date" : this.invitation.activity_date,
      "start_time" : this.invitation.start_time,
      "end_time" : this.invitation.end_time
    };

    this.kskProvider.postData(params, "acceptInvitation").then((result) => {
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

  call(number: any) {
    console.log(number);

    this.callNumber.callNumber(number, false)
      .then(() => console.log("dialing"))
      .catch(() => this.kskProvider.showAlertDialog("Fail", "Your device does not support calling or SIM card is not present in your device."))
  }

}
