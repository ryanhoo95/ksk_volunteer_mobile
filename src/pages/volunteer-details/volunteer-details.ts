import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { KskProvider } from '../../providers/ksk/ksk';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the VolunteerDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-volunteer-details',
  templateUrl: 'volunteer-details.html',
})
export class VolunteerDetailsPage {
  token: any;
  volunteer: any;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private kskProvider: KskProvider, private app: App, 
  private callNumber: CallNumber) {
    this.kskProvider.getSessionData("token").then((val) => {
      this.token = val;
    });

    this.volunteer = navParams.get('volunteer');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VolunteerDetailsPage');
  }

  ionViewDidEnter(){
    //get the volunteer details
    this.kskProvider.showProgress();

    let params = {
      "api_token" : this.token,
      "user_id" : this.volunteer.user_id
    };

    this.kskProvider.postData(params, "getVolunteerDetails").then((result) => {
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
    });
  }

  call(number: any) {
    console.log(number);

    this.callNumber.callNumber(number, false)
      .then(() => console.log("dialing"))
      .catch(() => this.kskProvider.showAlertDialog("Fail", "Your device does not support calling or SIM card is not present in your device."))
  }

}
