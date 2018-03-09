import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KskProvider } from '../../providers/ksk/ksk';
import { TermsPage } from '../terms/terms';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public type = "password";
  public showPass = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private kskProvider: KskProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  showPassword() {
    this.showPass = !this.showPass;
 
    if(this.showPass){
      this.type = "text";
    } else {
      this.type = "password";
    }
  }

  terms() {
    this.navCtrl.push(TermsPage)
  }

}
