import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpiritualGuidePage } from './spiritual-guide';

@NgModule({
  declarations: [
    SpiritualGuidePage,
  ],
  imports: [
    IonicPageModule.forChild(SpiritualGuidePage),
  ],
  exports: [
    SpiritualGuidePage
  ]
})
export class SpiritualGuidePageModule {}
