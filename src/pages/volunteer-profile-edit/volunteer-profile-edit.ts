import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KskProvider } from '../../providers/ksk/ksk';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the VolunteerProfileEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-volunteer-profile-edit',
  templateUrl: 'volunteer-profile-edit.html',
})
export class VolunteerProfileEditPage {
  user: any
  editForm: FormGroup;
  genderVal: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private kskProvider: KskProvider, private formBuilder: FormBuilder) {
    this.user = navParams.get('user');

    if(this.user.gender == "Male") {
      this.genderVal = "M";
    }
    else {
      this.genderVal = "F";
    }

    this.editForm = this.formBuilder.group({
      full_name: [this.user.full_name, Validators.required],
      profile_name: [this.user.profile_name, Validators.required],
      gender: [this.genderVal, Validators.required],
      date_of_birth: ['', Validators.required],
      phone_no: [this.user.phone_no, Validators.required],
      address: [this.user.address, Validators.required],
      emergency_contact: [this.user.emergency_contact, Validators.required],
      emergency_name: [this.user.emergency_name, Validators.required],
      emergency_relation: [this.user.emergency_relation, Validators.required]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VolunteerProfileEditPage');
  }

  onSave() {
    
  }

}
