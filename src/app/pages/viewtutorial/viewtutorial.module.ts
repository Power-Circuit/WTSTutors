import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewtutorialPageRoutingModule } from './viewtutorial-routing.module';

import { ViewtutorialPage } from './viewtutorial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewtutorialPageRoutingModule
  ],
  declarations: [ViewtutorialPage]
})
export class ViewtutorialPageModule {}
