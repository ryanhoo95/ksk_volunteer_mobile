import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { KskProvider } from '../../providers/ksk/ksk';

/**
 * Generated class for the SearchActivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-activity',
  templateUrl: 'search-activity.html',
})
export class SearchActivityPage {
  today: any;
  minDate: any;
  searchForm: FormGroup;
  token: any;
  activities: any = null;
  searchedDate: any;
  pushed: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private kskProvider: KskProvider, private app: App) {
    console.log('constructor SearchActivityPage');
    this.kskProvider.getSessionData("token").then((val) => {
      this.token = val;
    });

    this.searchForm = this.formBuilder.group({
      date: ['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchActivityPage');
  }

  ionViewDidLeave(){
    console.log('ionViewDidLeave SearchActivityPage');
    console.log("pushed: " + this.pushed);
    if(!this.pushed) {
      this.kskProvider.setSessionData("searchedDate", null);
    }
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter SearchActivityPage');
    
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter SearchActivityPage');
    this.pushed = false;
    this.kskProvider.getSessionData("searchedDate").then((val) => {
      this.searchedDate = val;

      this.today = new Date().toISOString();
      this.minDate = this.today;

      if(this.searchedDate) {
        this.today = this.searchedDate;
        this.refreshActivity();
      }
      else {
      this.activities = null;
      }
    });
    
  }

  searchActivity() {
    console.log("click");
    console.log(this.searchForm.get('date').value);
    this.kskProvider.setSessionData("searchedDate", this.searchForm.get('date').value);

    this.kskProvider.showProgress();

    let params = {
      "api_token" : this.token,
      "date" : this.searchForm.get("date").value
    };

    this.kskProvider.postData(params, "getActivitiesByDate").then((result) => {
      let response: any = result;
      console.log(response);

      this.kskProvider.dismissProgress();

      if(response.status == "success") {
        this.activities = response.data;
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

  refreshActivity() {

    this.kskProvider.showProgress();

    let params = {
      "api_token" : this.token,
      "date" : this.today
    };

    this.kskProvider.postData(params, "getActivitiesByDate").then((result) => {
      let response: any = result;
      console.log(response);

      this.kskProvider.dismissProgress();

      if(response.status == "success") {
        this.activities = response.data;
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

  viewActivity(activity) {
    this.pushed = true;
    this.navCtrl.push('ActivityDetailsPage', {
      activity: activity
    });
  }

}
