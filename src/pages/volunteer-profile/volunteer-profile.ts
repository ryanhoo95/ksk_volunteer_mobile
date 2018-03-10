import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Item } from 'ionic-angular';
import { VolunteerProfileEditPage } from '../volunteer-profile-edit/volunteer-profile-edit';
import { KskProvider } from '../../providers/ksk/ksk';
import { LoginPage } from '../login/login';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App, private kskProvider: KskProvider, private callNumber: CallNumber) {
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
        this.app.getRootNav().setRoot(LoginPage);
      }
      else {
        this.kskProvider.showAlertDialog("Fail", response.message);
      }

    }, (err) => {
      this.kskProvider.showServerErrorDialog();
    })
  }

  toEditProfile(user) {
    this.navCtrl.push(VolunteerProfileEditPage, {
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
