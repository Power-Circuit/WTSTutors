import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CloudlessonsPageRoutingModule } from './cloudlessons-routing.module';

import { CloudlessonsPage } from './cloudlessons.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CloudlessonsPageRoutingModule
  ],
  declarations: [CloudlessonsPage]
})
export class CloudlessonsPageModule {}
