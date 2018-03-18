import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { KskProvider } from '../../providers/ksk/ksk';

/**
 * Generated class for the PendingInvitationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pending-invitation',
  templateUrl: 'pending-invitation.html',
})
export class PendingInvitationPage {
  token: any;
  invitations: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private kskProvider: KskProvider, private app: App) {
    this.kskProvider.getSessionData("token").then((val) => {
      this.token = val;
      console.log(this.token);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PendingInvitationPage');
  }

  ionViewDidEnter() {
    //get activie participation
    this.getPendingInvitations();
  }

  getPendingInvitations() {
    this.kskProvider.showProgress();

    let params = {
      "api_token" : this.token 
    };

    this.kskProvider.postData(params, "getPendingInvitations").then((result) => {
      let response: any = result;
      console.log(response);
      this.kskProvider.dismissProgress();

      if(response.status == "success") {
        this.invitations = response.data;
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

  viewInvitation(invitation) {
    console.log(invitation.activity_id);

    this.navCtrl.push('InvitationDetailsPage', {
      invitation: invitation
    });
  }

}
