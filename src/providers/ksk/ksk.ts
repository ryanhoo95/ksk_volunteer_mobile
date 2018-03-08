import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the KskProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class KskProvider {
  url;

  constructor(public http: HttpClient) {
    console.log('Hello KskProvider Provider');
    this.url = 'http://kskvolunteer.com/api/';
  }

  getUser() {
    return this.http.get(this.url + 'users');
  }

}
