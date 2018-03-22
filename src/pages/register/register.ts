import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KskProvider } from '../../providers/ksk/ksk';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

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

  type = "password";
  showPass = false;
  showOccupationRemark = false;
  showMediumRemark = false;


  registerForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private kskProvider: KskProvider, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ]),  this.checkUniqueEmail.bind(this)],
      
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^[A-Za-z0-9_@.\/#&+-]*$/)
      ])],

      password_confirmation: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],

      full_name: ['', Validators.required],
      profile_name: ['', Validators.required],
      gender: ['M', Validators.required],
      ic_passport: ['', Validators.required, this.checkUniqueICPassport.bind(this)],
      date_of_birth: ['', Validators.required],
      phone_no: ['', Validators.required],
      address: ['', Validators.required],
      emergency_contact: ['', Validators.required],
      emergency_name: ['', Validators.required],
      emergency_relation: ['', Validators.required],
      occupation: ['10', Validators.required],
      occupation_remark: [''],
      medium: ['1', Validators.required],
      medium_remark: [''],
      terms: [false, RegisterPage.validateTerms]

    }, {
      validator: RegisterPage.MatchPassword
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  //show the password
  showPassword() {
    this.showPass = !this.showPass;
 
    if(this.showPass){
      this.type = "text";
    } else {
      this.type = "password";
    }
  }

  //go to terms and conditions page
  terms() {
    this.navCtrl.push('TermsPage')
  }

  //check whether the checkbox for t & d is checked
  static validateTerms(AC: AbstractControl): { [key: string]: boolean } {
    let rv: { [key: string]: boolean } = {};
    if (!AC.value) {
      rv['notChecked'] = true;
    }
    return rv;
  }

  //check if the password are matching
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

  //check for unique email
  checkUniqueEmail(AC: AbstractControl): Promise<any> {
    const promise = new Promise<any>((resolve, reject)=>{
        setTimeout(()=>{
            let params = {
              "email": AC.value 
            };
            this.kskProvider.postData(params, "checkUniqueEmail").then((result) => {
                let response: any = result;
                console.log(response);

                if(response.status == "fail")
                    resolve({ 'unique' : true });
                else
                    resolve(null);
            },
            (err) => {
                console.log("API error: " + err);
                resolve(null);
            });
        }, 500);
    });
    return promise;
  }

  //check for unique ic passport
  checkUniqueICPassport(AC: AbstractControl): Promise<any> {
    const promise = new Promise<any>((resolve, reject)=>{
        setTimeout(()=>{
            let params = {
              "ic_passport": AC.value 
            };
            this.kskProvider.postData(params, "checkUniqueICPassport").then((result) => {
                let response: any = result;
                console.log(response);

                if(response.status == "fail")
                    resolve({ 'unique' : true });
                else
                    resolve(null);
            },
            (err) => {
                console.log("API error: " + err);
                resolve(null);
            });
        }, 500);
    });
    return promise;
  }

  //show input when other is selected
  occupationChanged() {
    if(this.registerForm.get("occupation").value == "12") {
      this.showOccupationRemark = true;
      this.registerForm.get("occupation_remark").setValidators(Validators.required);
    }
    else {
      this.showOccupationRemark = false;
      this.registerForm.get("occupation_remark").clearValidators();
      this.registerForm.get("occupation_remark").clearAsyncValidators();
      this.registerForm.get("occupation_remark").updateValueAndValidity();
    }
  }

  //show input when other is selected
  mediumChanged() {
    if(this.registerForm.get("medium").value == "7") {
      this.showMediumRemark = true;
      this.registerForm.get("medium_remark").setValidators(Validators.required);
    }
    else {
      this.showMediumRemark = false;
      this.registerForm.get("medium_remark").clearValidators();
      this.registerForm.get("medium_remark").clearAsyncValidators();
      this.registerForm.get("medium_remark").updateValueAndValidity();
    }
  }

  //register the user
  onRegister() {
    this.kskProvider.showProgress();

    let params = {
      "email" : this.registerForm.get("email").value,
      "password" : this.registerForm.get("password").value,
      "full_name" : this.registerForm.get("full_name").value,
      "profile_name" : this.registerForm.get("profile_name").value,
      "gender" : this.registerForm.get("gender").value,
      "ic_passport" : this.registerForm.get("ic_passport").value,
      "date_of_birth" : this.registerForm.get("date_of_birth").value,
      "phone_no" : this.registerForm.get("phone_no").value,
      "address" : this.registerForm.get("address").value,
      "emergency_contact" : this.registerForm.get("emergency_contact").value,
      "emergency_name" : this.registerForm.get("emergency_name").value,
      "emergency_relation" : this.registerForm.get("emergency_relation").value,
      "occupation" : this.registerForm.get("occupation").value,
      "occupation_remark" : this.registerForm.get("occupation_remark").value,
      "medium" : this.registerForm.get("medium").value,
      "medium_remark" : this.registerForm.get("medium_remark").value,
    };

    this.kskProvider.postData(params, "register").then((result) => {
      let response: any = result;
      console.log(response);

      this.kskProvider.dismissProgress();

      if(response.status == "success") {
        this.kskProvider.setSessionData('token', response.data.api_token);
        // this.navCtrl.push('TabsPage');
        this.navCtrl.setRoot('TabsPage');
      }
      else {
        this.kskProvider.showAlertDialog("Registration Fail", response.message);
      }

    }, (err) => {
      this.kskProvider.dismissProgress();
      this.kskProvider.showServerErrorDialog();
    });
  }

}
