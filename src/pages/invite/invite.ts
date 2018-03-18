import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { KskProvider } from '../../providers/ksk/ksk';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the InvitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invite',
  templateUrl: 'invite.html',
})
export class InvitePage {
  token: any;
  searchForm: FormGroup;
  volunteers: any;
  activity: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private kskProvider: KskProvider, private app: App, private formBuilder: FormBuilder) {
    this.kskProvider.getSessionData("token").then((val) => {
      this.token = val;
    });

    this.activity = navParams.get("activity");

    this.searchForm = this.formBuilder.group({
      name: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitePage');
  }

  searchVolunteers() {
    this.kskProvider.showProgress();

    let params = {
      "api_token" : this.token,
      "name" : this.searchForm.get("name").value,
      "activity_id" : this.activity.activity_id,
      "invitation_code" : this.activity.invitation_code
    };

    this.kskProvider.postData(params, "getVolunteersForInvite").then((result) => {
      let response: any = result;
      console.log(response);

      this.kskProvider.dismissProgress();

      if(response.status == "success") {
        this.volunteers = response.data;
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

  confirmInvite(volunteer) {
    console.log("confirm? " + volunteer.profile_name);
  }

}
