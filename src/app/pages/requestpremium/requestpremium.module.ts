import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestpremiumPageRoutingModule } from './requestpremium-routing.module';

import { RequestpremiumPage } from './requestpremium.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestpremiumPageRoutingModule
  ],
  declarations: [RequestpremiumPage]
})
export class RequestpremiumPageModule {}
