import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KskHistoryPage } from './ksk-history';

@NgModule({
  declarations: [
    KskHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(KskHistoryPage),
  ],
  exports: [
    KskHistoryPage
  ]
})
export class KskHistoryPageModule {}
