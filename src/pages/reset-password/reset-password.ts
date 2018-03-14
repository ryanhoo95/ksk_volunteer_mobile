import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { KskProvider } from '../../providers/ksk/ksk';

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  user: any;
  resetPasswordForm: FormGroup;

  typeCurrentPass = "password";
  showCurrentPass = false;
  type = "password";
  showPass = false;
  token: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private kskProvider: KskProvider, private app: App) {
    this.user = navParams.get('user');

    this.kskProvider.getSessionData("token").then((val) => {
      this.token = val;
    })

    this.resetPasswordForm = this.formBuilder.group({
      current_password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^[A-Za-z0-9_@.\/#&+-]*$/)
      ])],

      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^[A-Za-z0-9_@.\/#&+-]*$/)
      ])],

      password_confirmation: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])]

    }, {
      validator: ResetPasswordPage.MatchPassword
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  showCurrentPassword() {
    this.showCurrentPass = !this.showCurrentPass;
 
    if(this.showCurrentPass){
      this.typeCurrentPass = "text";
    } else {
      this.typeCurrentPass = "password";
    }
  }

  showPassword() {
    this.showPass = !this.showPass;
 
    if(this.showPass){
      this.type = "text";
    } else {
      this.type = "password";
    }
  }

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let password_confirmation = AC.get('password_confirmation').value; // to get value in input tag
     if(password != password_confirmation) {
        //  console.log('false');
         AC.get('password_confirmation').setErrors( {MatchPassword: true} )
     } else {
        //  console.log('true');
         return null
     }
 }

  onResetPassword() {
    this.kskProvider.showProgress();
    
    let params = {
      "api_token" : this.token,
      "current_password" : this.resetPasswordForm.get('current_password').value,
      "new_password" : this.resetPasswordForm.get('password').value 
    };

    this.kskProvider.postData(params, "resetPassword").then((result) => {
      let response: any = result;

      this.kskProvider.dismissProgress();

      if(response.status == "success") {
        this.kskProvider.showAlertDialog("Success", response.message);
        this.navCtrl.pop();
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
