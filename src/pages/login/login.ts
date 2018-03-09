import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import { KskProvider } from '../../providers/ksk/ksk';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private kskProvider: KskProvider, private alertCtrl: AlertController) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onRegister() {
    this.navCtrl.push(RegisterPage);
  }

  onLogin() {
    let params = {
      "email" : this.loginForm.get("email").value,
      "password" : this.loginForm.get("password").value
    };

    this.kskProvider.postData(params, "login").then((result) => {
      let response: any = result;
      console.log(response);

      if(response.status == "success") {
        this.kskProvider.setSessionData('token', response.data.api_token);
        this.navCtrl.push(TabsPage);
        this.navCtrl.setRoot(TabsPage);
      }
      else {
        this.kskProvider.showAlertDialog("Login Fail", response.message);
      }

    }, (err) => {
      this.kskProvider.showServerErrorDialog();
    });
  }

}
