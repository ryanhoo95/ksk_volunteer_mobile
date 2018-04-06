import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController, ToastController } from 'ionic-angular';
import { KskProvider } from '../../providers/ksk/ksk';
import { Clipboard } from '@ionic-native/clipboard';

/**
 * Generated class for the ParticipationDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-participation-details',
  templateUrl: 'participation-details.html',
})
export class ParticipationDetailsPage {
  token: any;
  activity: any;
  vips: any;
  individuals: any;
  groups: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private kskProvider: KskProvider, private app: App, 
  private alertCtrl: AlertController, private clipBoard: Clipboard, private toastCtrl: ToastController) {
    this.kskProvider.getSessionData("token").then((val) => {
      this.token = val;
    });

    this.activity = navParams.get('activity');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParticipationDetailsPage');
  }

  ionViewDidEnter(){
    this.getParticipants();
  }

  getParticipants() {
    this.kskProvider.showProgress();

    let params = {
      "api_token" : this.token,
      "activity_id" : this.activity.activity_id
    };

    this.kskProvider.postData(params, "getParticipants").then((result) => {
      let response: any = result;
      console.log(response);

      this.kskProvider.dismissProgress();

      if(response.status == "success") {
        this.vips = response.data.vips;
        this.individuals = response.data.individuals;
        this.groups = response.data.groups;
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

  viewVolunteer(volunteer) {
    console.log("view" + volunteer.user_id);

    this.navCtrl.push('VolunteerDetailsPage', {
      volunteer: volunteer
    });
  }

  absentConfirm(participant) {
    let dialog = this.alertCtrl.create({
      title: this.activity.activity_title,
        message: "Are you sure to record the attendance of " + participant.full_name + " as ABSENT?",
        buttons: [
          {
            text: "NO"
          },

          {
            text: "YES",
            handler: () => {
              this.absent(participant.participation_id);
            }
          }
        ]
    });
    dialog.present();
  }

  presentConfirm(participant) {
    let dialog = this.alertCtrl.create({
      title: this.activity.activity_title,
        message: "Are you sure to record the attendance of " + participant.full_name + " as PRESENT?",
        buttons: [
          {
            text: "NO"
          },

          {
            text: "YES",
            handler: () => {
              this.present(participant.participation_id);
            }
          }
        ]
    });
    dialog.present();
  }

  absent(participation_id) {
    this.kskProvider.showProgress();

    let params = {
      "api_token" : this.token,
      "participation_id" : participation_id
    };

    this.kskProvider.postData(params, "absent").then((result) => {
      let response: any = result;
      console.log(response);

      this.kskProvider.dismissProgress();

      if(response.status == "success") {
        this.kskProvider.showAlertDialog("Success", response.message);
        this.getParticipants();
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

  present(participation_id) {
    this.kskProvider.showProgress();

    let params = {
      "api_token" : this.token,
      "participation_id" : participation_id
    };

    this.kskProvider.postData(params, "present").then((result) => {
      let response: any = result;
      console.log(response);

      this.kskProvider.dismissProgress();

      if(response.status == "success") {
        this.kskProvider.showAlertDialog("Success", response.message);
        this.getParticipants();
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

  copyText(name: string) {
    console.log(name);
    this.clipBoard.copy(name).then(
      (resolve) => {
        this.presentToast("Name is copied to clipboard.")
      },
      (reject) => {
        this.presentToast("Error while copying name.")
      }
    );
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

}
