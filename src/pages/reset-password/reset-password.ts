import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private kskProvider: KskProvider) {
    this.user = navParams.get('user');

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
   
 }

}
