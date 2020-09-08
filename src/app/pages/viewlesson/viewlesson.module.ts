import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewlessonPageRoutingModule } from './viewlesson-routing.module';

import { ViewlessonPage } from './viewlesson.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewlessonPageRoutingModule
  ],
  declarations: [ViewlessonPage]
})
export class ViewlessonPageModule {}
