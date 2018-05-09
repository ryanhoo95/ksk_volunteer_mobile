import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private kskProvider: KskProvider, private app: App, private formBuilder: FormBuilder, private alertCtrl: AlertController) {
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
    if(this.searchForm.get("name").value != null && this.searchForm.get("name").value != "") {
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
    
  }

  confirmInvite(volunteer) {
    console.log("confirm? " + volunteer.profile_name);

    let dialog = this.alertCtrl.create({
      title: this.activity.activity_title,
      message: "Are you confirm to invite " + volunteer.full_name + " to join this activity?",
      buttons: [
        {
          text: "NO"
        },

        {
          text: "YES",
          handler: () => {
            this.sendInvitation(volunteer);
          }
        }
      ]
    });
    dialog.present();
  }

  sendInvitation(volunteer) {
    this.kskProvider.showProgress();

    let params = {
      "api_token" : this.token,
      "activity_id" : this.activity.activity_id,
      "target_to" : volunteer.user_id,
      "invitation_code" : this.activity.invitation_code,
      "full_name" : volunteer.full_name
    };

    this.kskProvider.postData(params, "sendInvitation").then((result) => {
      let response: any = result;
      console.log(response);

      this.kskProvider.dismissProgress();

      if(response.status == "success") {
        this.kskProvider.showAlertDialog("Success", response.message);
        this.searchVolunteers();
      }
      else if(response.status == "invalid") {
        this.kskProvider.showAlertDialog("Fail", response.message);
        this.kskProvider.clearSessionData();
        this.app.getRootNav().setRoot('LoginPage');
      }
      else {
        this.kskProvider.showAlertDialog("Fail", response.message);
        this.searchVolunteers();
      }

    }, (err) => {
      this.kskProvider.dismissProgress();
      this.kskProvider.showServerErrorDialog();
    });
  }

}
