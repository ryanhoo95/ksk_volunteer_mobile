import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { VolunteerMorePage } from '../pages/volunteer-more/volunteer-more';
import { SearchActivityPage } from '../pages/search-activity/search-activity';
import { VolunteerProfilePage } from '../pages/volunteer-profile/volunteer-profile';
import { ActiveParticipationPage } from '../pages/active-participation/active-participation';
import { PendingInvitationPage } from '../pages/pending-invitation/pending-invitation';
import { HistoryPage } from '../pages/history/history';
import { AboutPage } from '../pages/about/about';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { KskProvider } from '../providers/ksk/ksk';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    LoginPage,
    RegisterPage,
    HomePage,
    TabsPage,
    VolunteerMorePage,
    SearchActivityPage,
    VolunteerProfilePage,
    ActiveParticipationPage,
    PendingInvitationPage,
    HistoryPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    LoginPage,
    RegisterPage,
    HomePage,
    TabsPage,
    VolunteerMorePage,
    SearchActivityPage,
    VolunteerProfilePage,
    ActiveParticipationPage,
    PendingInvitationPage,
    HistoryPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    KskProvider
  ]
})
export class AppModule {}
