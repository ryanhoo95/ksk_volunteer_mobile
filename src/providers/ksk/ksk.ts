import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, App, LoadingController } from 'ionic-angular';

/*
  Generated class for the KskProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class KskProvider {
  url: string;
  loader: any;

  constructor(public http: HttpClient, private storage: Storage, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    //this.url = 'http://kskvolunteer.com/api/';
    //this.url = 'http://192.168.43.139/api/'
    //this.url = 'http://192.168.0.102/api/'
    this.url = 'http://ksk-volunteer.com/api/';
  }

  getUser() {
    return this.http.get(this.url + 'users');
  }

  //for api
  getData(action){

    return new Promise((resolve, reject) =>{
      let headers = new HttpHeaders();
      let url = this.url + action;

      this.http
        .get(url, {headers: headers})
        .subscribe(
          res   =>{ resolve(res); }, 
          (err) =>{ reject(err); } 
        );
    });
  }

  postData(params, action){

    return new Promise((resolve, reject) =>{
      
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let url = this.url + action;
      let body = JSON.stringify(params);

      this.http
        .post(url, body, {headers: headers})
        .subscribe(
          res   =>{ resolve(res); }, 
          (err) =>{ reject(err); } 
        );
    })
  }

  putData(params, action){

    return new Promise((resolve, reject) =>{
      
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      let url = this.url + action;
      let body = JSON.stringify(params);

      this.http
        .put(url, body, {headers: headers})
        .subscribe(
          res   =>{ resolve(res); }, 
          (err) =>{ reject(err); } 
        );
    })
  }

  //for user session
  getSessionData(key) {
    return this.storage.get(key).then((val) => {
      return val;
    });
  }

  setSessionData(key, value) {
    this.storage.set(key, value);
  }

  clearSessionData() {
    this.storage.clear();
  }

  //for dialog
  showAlertDialog(title, message) {
    let dialog = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['OK']
    });
    dialog.present();
  }

  showServerErrorDialog() {
    let dialog = this.alertCtrl.create({
      title: "Connection Error",
      message: "Please check your Internet connection and try again later.",
      buttons: ['OK']
    });
    dialog.present();
  }

  showProgress() {
    this.loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Please wait..."
    });

    this.loader.present();
  }

  dismissProgress() {
    this.loader.dismiss();
  }
}
