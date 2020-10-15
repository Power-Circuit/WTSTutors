import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudyguidePageRoutingModule } from './studyguide-routing.module';

import { StudyguidePage } from './studyguide.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudyguidePageRoutingModule
  ],
  declarations: [StudyguidePage]
})
export class StudyguidePageModule {}
