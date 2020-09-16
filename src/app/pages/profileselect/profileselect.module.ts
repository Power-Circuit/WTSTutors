import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileselectPageRoutingModule } from './profileselect-routing.module';

import { ProfileselectPage } from './profileselect.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileselectPageRoutingModule
  ],
  declarations: [ProfileselectPage]
})
export class ProfileselectPageModule {}
