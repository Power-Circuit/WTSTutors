import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadlessonPageRoutingModule } from './uploadlesson-routing.module';

import { UploadlessonPage } from './uploadlesson.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadlessonPageRoutingModule
  ],
  declarations: [UploadlessonPage]
})
export class UploadlessonPageModule {}
