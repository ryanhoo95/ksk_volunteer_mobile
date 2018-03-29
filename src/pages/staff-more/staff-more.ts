import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { KskProvider } from '../../providers/ksk/ksk';

/**
 * Generated class for the StaffMorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-staff-more',
  templateUrl: 'staff-more.html',
})
export class StaffMorePage {

  params: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private kskProvider: KskProvider, private alertCtrl: AlertController, private app: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaffMorePage');
  }

  toProfile() {
    this.navCtrl.push('StaffProfilePage');
  }

  toAbout() {
    this.navCtrl.push('AboutPage');
  }

  logout() {
    // this.storage.set('login', false);
    // this.navCtrl.push(LoginPage);
    // this.navCtrl.setRoot(LoginPage);

    //this.storage.clear();
    
    let dialog = this.alertCtrl.create({
      title: "Logout",
      message: "Are you sure to logout?",
      buttons: [
        {
          text: "NO"
        },

        {
          text: "YES",
          handler: () => {
            this.kskProvider.getSessionData("token").then((val) => {
              this.params = {
                "api_token" : val
              };

              this.kskProvider.showProgress();

              this.kskProvider.postData(this.params, "logout").then((result) => {
                let response: any = result;
                console.log(response);
                this.kskProvider.dismissProgress();
  
                if(response.status == "success") {
                  this.kskProvider.clearSessionData();
                  this.app.getRootNav().setRoot('LoginPage');
                }
                else if(response.status == "invalid") {
                  this.kskProvider.showAlertDialog("Logout Fail", response.message);
                  this.kskProvider.clearSessionData();
                  this.app.getRootNav().setRoot('LoginPage');
                }
                else {
                  this.kskProvider.showAlertDialog("Logout Fail", response.message);
                }
                
              }, (err) => {
                this.kskProvider.dismissProgress();
                this.kskProvider.showServerErrorDialog();
              });
            })
          }
        }
      ]
    });
    dialog.present();
  }

}
