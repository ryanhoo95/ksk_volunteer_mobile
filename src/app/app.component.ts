import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { KskProvider } from '../providers/ksk/ksk';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private kskProvider: KskProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // this.storage.set('login', false );

      // this.storage.get('token').then((val) => {
      //   if(val != null && val) {
      //     console.log(val);
      //     this.rootPage = TabsPage;
      //   }
      //   else {
      //     this.rootPage = LoginPage;
      //   }
      // });
      
      this.kskProvider.getSessionData("token").then((val) => {
        if(val && val != null) {
          this.kskProvider.getSessionData("usertype").then((val) => {
            if(val == "Volunteer") {
              this.rootPage = 'TabsPage';
            }
            else {
              this.rootPage = 'StaffTabsPage';
            }
          });
          
        }
        else {
          this.rootPage = 'LoginPage';
        }
      });
    });
  }
}
