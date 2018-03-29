import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { KskProvider } from '../../providers/ksk/ksk';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private kskProvider: KskProvider, private callNumber: CallNumber, private launchnavigator: LaunchNavigator) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  navigate() {
    let options: LaunchNavigatorOptions = {
      destinationName: "Kechara Soup Kitchen"
    };

    this.launchnavigator.navigate([3.1451213, 101.7131014,], options)
      .catch(() => this.kskProvider.showAlertDialog("Fail", "Error while selecting navigator."));
  }

  callUs() {
    this.callNumber.callNumber("03-2141 6046", false)
      .then(() => console.log("dialing"))
      .catch(() => this.kskProvider.showAlertDialog("Fail", "Your device does not support calling or SIM card is not present in your device."));
  }

}
