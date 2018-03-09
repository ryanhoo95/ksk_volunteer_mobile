import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
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
          this.rootPage = TabsPage;
        }
        else {
          this.rootPage = LoginPage;
        }
      });
    });
  }
}
