import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayvidPageRoutingModule } from './playvid-routing.module';

import { PlayvidPage } from './playvid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayvidPageRoutingModule
  ],
  declarations: [PlayvidPage]
})
export class PlayvidPageModule {}
