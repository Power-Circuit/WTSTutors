import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChalkboardPageRoutingModule } from './chalkboard-routing.module';

import { ChalkboardPage } from './chalkboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChalkboardPageRoutingModule
  ],
  declarations: [ChalkboardPage]
})
export class ChalkboardPageModule {}
