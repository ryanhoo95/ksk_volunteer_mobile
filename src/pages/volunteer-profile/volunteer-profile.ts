import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ActionSheetController, Platform } from 'ionic-angular';
import { KskProvider } from '../../providers/ksk/ksk';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the VolunteerProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-volunteer-profile',
  templateUrl: 'volunteer-profile.html',
})
export class VolunteerProfilePage {
  token: any;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App, private kskProvider: KskProvider, private callNumber: CallNumber, private asCtrl: ActionSheetController, private platform: Platform) {
    this.kskProvider.getSessionData("token").then((val) => {
      this.token = val;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VolunteerProfilePage');
  }

  ionViewDidEnter() {
    console.log(this.token);

    this.kskProvider.showProgress();

    let params = {
      "api_token" : this.token 
    };

    this.kskProvider.postData(params, "getVolunteerProfile").then((result) => {
      let response: any = result;
      console.log(response);
      this.kskProvider.dismissProgress();

      if(response.status == "success") {
        this.user = response.data;
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
    })
  }

  displayProfileOption(user) {
    let actionSheet = this.asCtrl.create({
      title: "More",
      buttons: [
        {
          text: "Edit Profile",
          icon: !this.platform.is('ios') ? 'create' : null,
          handler: () => {
            this.toEditProfile(user);
          }
        },
        {
          text: "Reset Password",
          icon: !this.platform.is('ios') ? 'lock' : null,
          handler: () => {
            this.toResetPassword(user);
          }
        },
        {
          text: "Cancel",
          icon: !this.platform.is('ios') ? 'close' : null,
          role: "cancel"
        }
      ]
    });

    actionSheet.present();
  }

  toEditProfile(user) {
    this.navCtrl.push('VolunteerProfileEditPage', {
      user: user
    });
  }

  toResetPassword(user) {
    this.navCtrl.push('ResetPasswordPage', {
      user: user
    });
  }

  callEmergencyContact(number: any) {
    console.log(number);

    this.callNumber.callNumber(number, false)
      .then(() => console.log("dialing"))
      .catch(() => this.kskProvider.showAlertDialog("Fail", "Your device does not support calling or SIM card is not present in your device."))
  }

}
