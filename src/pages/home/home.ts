import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { KskProvider } from '../../providers/ksk/ksk';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  users: any;
  token: any;

  constructor(public navCtrl: NavController, private kskProvider: KskProvider) {

  }

  ionViewWillEnter() {
    this.kskProvider.getUser().subscribe(user => {
      console.log(user)
    });

    this.token = this.kskProvider.getSessionData("token").then((val) => {
      console.log(val);
    });
    
  }

}
