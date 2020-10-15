import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminrequestsPageRoutingModule } from './adminrequests-routing.module';

import { AdminrequestsPage } from './adminrequests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminrequestsPageRoutingModule
  ],
  declarations: [AdminrequestsPage]
})
export class AdminrequestsPageModule {}
