import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { KskProvider } from '../providers/ksk/ksk';
import { IonicStorageModule } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Clipboard } from '@ionic-native/clipboard';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    File,
    FileTransfer,
    Camera,
    FilePath,
    LaunchNavigator,
    Clipboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    KskProvider
  ]
})
export class AppModule {}
